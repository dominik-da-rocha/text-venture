package api

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	v1 "rochatronic.net/text-venture-service/cmd/api/v1"
	"rochatronic.net/text-venture-service/cmd/model"
)

func Start(txt model.ServiceConfig) {
   log.Printf("Start listing on port %d", txt.Port )
   router := mux.NewRouter()
   v1.Version(router);
   v1.GuestBook(router);

   http.Handle("/", router)

   listen := ":" + strconv.Itoa(txt.Port)
   http.ListenAndServe(listen, nil)
}

