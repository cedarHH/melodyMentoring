package common

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/MicahParks/keyfunc/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/zeromicro/go-zero/core/logx"
	"github.com/zeromicro/go-zero/rest/httpx"
)

type JwtMiddleware struct {
	RequiredTokenUse   string
	AwsDefaultRegion   string
	CognitoUserPoolId  string
	CognitoAppClientId string
	Jwks               *keyfunc.JWKS
}

func NewJwtMiddleware(requiredTokenUse, awsDefaultRegion, cognitoUserPoolId, cognitoAppClientId string, jwks *keyfunc.JWKS) *JwtMiddleware {
	return &JwtMiddleware{
		RequiredTokenUse:   requiredTokenUse,
		AwsDefaultRegion:   awsDefaultRegion,
		CognitoUserPoolId:  cognitoUserPoolId,
		CognitoAppClientId: cognitoAppClientId,
		Jwks:               jwks,
	}
}

func (m *JwtMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		unauthorized := func() {
			httpx.Error(w, errors.New("unauthorized"), func(w http.ResponseWriter, err error) {
				w.WriteHeader(http.StatusUnauthorized)
				_, err = w.Write([]byte("Unauthorized"))
				if err != nil {
					return
				}
			})
		}
		authHeader := r.Header.Get("Authorization")
		splitToken := strings.Split(authHeader, "Bearer ")

		var tokenString string
		if len(splitToken) == 2 && splitToken[1] != "" {
			tokenString = splitToken[1]
		} else {
			cookie, err := r.Cookie("id_token")
			if err != nil || cookie.Value == "" {
				unauthorized()
				return
			}
			tokenString = cookie.Value
		}

		token, err := jwt.Parse(tokenString,
			m.Jwks.Keyfunc,
			jwt.WithValidMethods([]string{"RS256"}),
			jwt.WithExpirationRequired(),
			jwt.WithIssuer(fmt.Sprintf("https://cognito-idp.%s.amazonaws.com/%s", m.AwsDefaultRegion, m.CognitoUserPoolId)),
		)
		if err != nil || !token.Valid {
			logx.Errorf("JWT parse error: %v", err)
			unauthorized()
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			unauthorized()
			return
		}

		expClaim, err := claims.GetExpirationTime()
		if err != nil || expClaim.Unix() < time.Now().Unix() {
			unauthorized()
			return
		}

		tokenUseClaim, ok := claims["token_use"].(string)
		if !ok || tokenUseClaim != m.RequiredTokenUse {
			unauthorized()
			return
		}

		subClaim, err := claims.GetSubject()
		if err != nil {
			unauthorized()
			return
		}

		r = r.WithContext(context.WithValue(r.Context(), "uuid", subClaim))

		var appClientIdClaim string
		if tokenUseClaim == "id" {
			audienceClaims, err := claims.GetAudience()
			if err != nil || len(audienceClaims) == 0 {
				unauthorized()
				return
			}
			appClientIdClaim = audienceClaims[0]
		} else if tokenUseClaim == "access" {
			clientIdClaim, ok := claims["client_id"].(string)
			if !ok {
				unauthorized()
				return
			}
			appClientIdClaim = clientIdClaim
		} else {
			unauthorized()
			return
		}

		if appClientIdClaim != m.CognitoAppClientId {
			unauthorized()
			return
		}

		userGroupsAttribute, ok := claims["cognito:groups"]
		userGroupsClaims := make([]string, 0)
		if ok {
			switch x := userGroupsAttribute.(type) {
			case []interface{}:
				for _, e := range x {
					userGroupsClaims = append(userGroupsClaims, e.(string))
				}
			default:
				unauthorized()
				return
			}
		}

		r = r.WithContext(context.WithValue(r.Context(), "groups", userGroupsClaims))

		next(w, r)
	}
}
