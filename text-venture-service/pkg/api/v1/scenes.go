package v1

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"rochatronic.net/text-venture-service/pkg/model"
)

func Scenes(router *mux.Router) {
	router.HandleFunc("/api/v1/scenes", getScenes).Methods(http.MethodGet)
	router.HandleFunc("/api/v1/scenes/", getScenes).Methods(http.MethodGet)
	router.HandleFunc("/api/v1/scenes/{scene-id}", getScenes).Methods(http.MethodGet)
}


func getScenes(w http.ResponseWriter, r *http.Request) {
   log.Printf("%s %s", r.Method, r.URL)
   vars := mux.Vars(r)
   sceneID, exists := vars["scene-id"]
   var scene model.Scene;
   if !exists {      
      for _, value := range model.Venture.Scenes {
         scene = value
         break
      }
   } else {
      scene, exists = model.Venture.Scenes[sceneID]
      if !exists {
         http.Error(w, "scene not found", http.StatusNotFound)
         return
      }
   } 

   jsonData, err := json.Marshal(scene)
   if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
   }
   _, err = w.Write(jsonData)
   if err != nil {
      http.Error(w, err.Error(), http.StatusInternalServerError)
   }   
}