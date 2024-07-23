package middleware

import "net/http"

type UserAuthMiddleware struct {
}

func NewUserAuthMiddleware() *UserAuthMiddleware {
	return &UserAuthMiddleware{}
}

func (m *UserAuthMiddleware) Handle(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// TODO generate middleware implement function, delete after code implementation

		// Passthrough to next handler if need
		next(w, r)
	}
}
