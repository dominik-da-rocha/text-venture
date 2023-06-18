package model

import (
	"io/ioutil"
	"log"
	"path"
	"path/filepath"

	"gopkg.in/yaml.v2"
)

type TextVenture struct {
	Version string           `json:"version"`
	Name    string           `json:"name"`
	Port    int              `json:"port"`
	Data    string           `json:"data"`
	Scenes  map[string]Scene `json:"scenes"`
}

type Scene struct {
	Version     string   `json:"version"`
	Id          string   `json:"id"`
	Name        string   `json:"name"`
	Description []string `json:"description"`
	Options     []Option `json:"options"`
}

type Option struct {
	Name string `json:"name"`
	Href string `json:"href"`
}

var Venture TextVenture

func LoadTextVenture(configFileName string) TextVenture {

	log.Printf("reading %s...", configFileName)

	// Read and parse the json configuration file
	configPath, _ := filepath.Abs(configFileName)
	configData, err := ioutil.ReadFile(configPath)
	if err != nil {
		log.Fatal("Error reading configuration file:", err)
	}
	var textventure TextVenture
	err = yaml.Unmarshal(configData, &textventure)
	if err != nil {
		log.Fatal("Error parsing configuration file:", err)
	}

	// Use the configuration
	log.Println("Name from config file:", textventure.Name)

	// Read data files
	textventure.Scenes = make(map[string]Scene)
   scenesPath := path.Join(textventure.Data, "scenes")
   log.Println(scenesPath)
	FileWalker(scenesPath, func(file string, data []byte, err error) {
		if err != nil {
			log.Fatal("Error reading data folder '" + file + "' ", err)
		}

		var scene Scene
		err = yaml.Unmarshal(data, &scene)
		if err != nil {
			log.Fatal("Error parsing file '"+file + "' ", err)
		}
		log.Printf("read scene: %s", scene.Id)
		textventure.Scenes[scene.Id] = scene
	})


   Venture = textventure

	return textventure
}
