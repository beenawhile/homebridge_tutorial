package main

import (
	"homebridge/handler"
	"net/http"
)

func main() {
	webHandler := handler.MakeHandler()

	err := http.ListenAndServe(":8000", webHandler)
	if err != nil {
		panic(err)
	}
}
