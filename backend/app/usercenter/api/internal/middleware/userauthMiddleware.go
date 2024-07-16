package middleware

import (
	"fmt"
	"github.com/MicahParks/keyfunc/v2"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/config"
	common "github.com/cedarHH/mygo/common/middleware"
	"net/http"
)

type UserAuthMiddleware struct {
	jwtMiddleware *common.JwtMiddleware
}

func NewUserAuthMiddleware(cognitoConf config.CognitoConf) *UserAuthMiddleware {
	awsDefaultRegion := cognitoConf.AwsRegion
	cognitoUserPoolId := cognitoConf.UserPoolId
	cognitoAppClientId := cognitoConf.AppClientId
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
