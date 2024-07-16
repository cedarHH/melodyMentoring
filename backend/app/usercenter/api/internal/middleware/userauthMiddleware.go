package middleware

import (
	"fmt"
	"github.com/MicahParks/keyfunc/v2"
	common "github.com/cedarHH/mygo/common/middleware"
	"net/http"
	"os"
)

type UserAuthMiddleware struct {
	jwtMiddleware *common.JwtMiddleware
}

func NewUserAuthMiddleware() *UserAuthMiddleware {
	awsDefaultRegion := os.Getenv("AWS_DEFAULT_REGION")
	cognitoUserPoolId := os.Getenv("COGNITO_USER_POOL_ID")
	cognitoAppClientId := os.Getenv("COGNITO_APP_CLIENT_ID")
	jwks, _ := GetJWKS(awsDefaultRegion, cognitoUserPoolId)

	return &UserAuthMiddleware{
		jwtMiddleware: common.NewJwtMiddleware(
			"id",
			awsDefaultRegion,
			cognitoUserPoolId,
			cognitoAppClientId,
			jwks),
	}
}

func (m *UserAuthMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return m.jwtMiddleware.Handle(func(w http.ResponseWriter, r *http.Request) {

		// Passthrough to next handler if need
		next(w, r)
	})
}

func GetJWKS(awsRegion string, cognitoUserPoolId string) (*keyfunc.JWKS, error) {

	jwksURL := fmt.Sprintf("https://cognito-idp.%s.amazonaws.com/%s/.well-known/jwks.json", awsRegion, cognitoUserPoolId)

	jwks, err := keyfunc.Get(jwksURL, keyfunc.Options{})

	if err != nil {
		return nil, err
	}

	return jwks, nil
}
