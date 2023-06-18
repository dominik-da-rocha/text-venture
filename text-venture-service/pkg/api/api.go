package api

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	v1 "rochatronic.net/text-venture-service/pkg/api/v1"
	"rochatronic.net/text-venture-service/pkg/model"
)

func Start(txt model.TextVenture) {
   log.Printf("Start listing on port %d", txt.Port )
   router := mux.NewRouter()
   v1.Version(router);
   v1.Scenes(router);

   http.Handle("/", router)

   listen := ":" + strconv.Itoa(txt.Port)
   http.ListenAndServe(listen, nil)
}

