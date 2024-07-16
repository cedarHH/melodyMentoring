package svc

import (
	"github.com/cedarHH/mygo/app/usercenter/api/internal/config"
	"github.com/cedarHH/mygo/app/usercenter/api/internal/middleware"
	"github.com/zeromicro/go-zero/rest"
)

type ServiceContext struct {
	Config             config.Config
	UserAuthMiddleware rest.Middleware
	CookieMiddleware   rest.Middleware
}

func NewServiceContext(c config.Config) *ServiceContext {
	return &ServiceContext{
		Config:             c,
		UserAuthMiddleware: middleware.NewUserAuthMiddleware(c.CognitoConf).Handle,
		CookieMiddleware:   middleware.NewCookieMiddleware().Handle,
	}
}
