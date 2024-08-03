package user

import (
	"context"
	"fmt"
	"net/http"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/cognitoidentityprovider"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/svc"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/types"
	"github.com/zeromicro/go-zero/core/logx"
)

type RefreshTokensLogic struct {
	logx.Logger
	ctx    context.Context
	svcCtx *svc.ServiceContext
}

// refreshTokens
func NewRefreshTokensLogic(ctx context.Context, svcCtx *svc.ServiceContext) *RefreshTokensLogic {
	return &RefreshTokensLogic{
		Logger: logx.WithContext(ctx),
		ctx:    ctx,
		svcCtx: svcCtx,
	}
}

func (l *RefreshTokensLogic) RefreshTokens() (resp *types.RefreshTokensResp, err error) {

	refreshToken, ok := l.ctx.Value("refresh_token").(string)
	if !ok {
		return nil, fmt.Errorf("refresh token not found in context")
	}

	clientID := l.svcCtx.Config.CognitoConf.AppClientId
	region := l.svcCtx.Config.CognitoConf.AwsRegion

	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(region),
	})
	if err != nil {
		return nil, fmt.Errorf("failed to create AWS session: %v", err)
	}

	cognitoClient := cognitoidentityprovider.New(sess)

	input := &cognitoidentityprovider.InitiateAuthInput{
		AuthFlow: aws.String("REFRESH_TOKEN_AUTH"),
		ClientId: aws.String(clientID),
		AuthParameters: map[string]*string{
			"REFRESH_TOKEN": aws.String(refreshToken),
		},
	}

	result, err := cognitoClient.InitiateAuth(input)
	if err != nil {
		return nil, fmt.Errorf("failed to initiate auth: %v", err)
	}

	idToken := *result.AuthenticationResult.IdToken
	accessToken := *result.AuthenticationResult.AccessToken

	setCookie := func(name, value string, duration time.Duration) {
		http.SetCookie(nil, &http.Cookie{
			Name:     name,
			Value:    value,
			Path:     "/",
			Domain:   "localhost",
			Expires:  time.Now().Add(duration),
			HttpOnly: true,
			Secure:   true,
		})
	}

	setCookie("id_token", idToken, 50*time.Minute)
	setCookie("access_token", accessToken, 50*time.Minute)

	return &types.RefreshTokensResp{
		Code: 0,
		Msg:  "Tokens refreshed successfully",
	}, nil
}
