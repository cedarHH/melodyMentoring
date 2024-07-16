package middleware

import (
	"context"
	"github.com/zeromicro/go-zero/rest/httpx"
	"net/http"
)

type CookieMiddleware struct {
}

func NewCookieMiddleware() *CookieMiddleware {
	return &CookieMiddleware{}
}

func (m *CookieMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie("refresh_token")
		if err != nil {
			httpx.Error(w, err)
			return
		}

		ctx := context.WithValue(r.Context(), "refresh_token", cookie.Value)
		r = r.WithContext(ctx)
		next(w, r)
	}
}
