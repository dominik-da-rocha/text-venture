package main

import (
	"os"

	"rochatronic.net/text-venture-service/pkg/api"
	"rochatronic.net/text-venture-service/pkg/model"
)

func main() {
   configFileName :=  "application.yaml"
	if len(os.Args) > 1 {
		configFileName = os.Args[1]
	} 
   
   txt := model.LoadTextVenture(configFileName)
   api.Start(txt)
}