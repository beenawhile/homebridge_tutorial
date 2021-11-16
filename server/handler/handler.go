package handler

import (
	"fmt"
	"net/http"

	"github.com/gorilla/pat"
)

type AppHandler struct {
	http.Handler
}

func MakeHandler() *AppHandler {
	r := pat.New()

	a := &AppHandler{
		Handler: r,
	}

	r.Get("/", indexHandler)

	return a
}

func indexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello world")
}
