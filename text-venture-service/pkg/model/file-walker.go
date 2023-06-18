package model

import (
	"io/ioutil"
	"os"
	"path/filepath"
)

type FileWalkerFunc func(string, []byte, error)

func FileWalker(folderPath string, callback FileWalkerFunc) {
	// Get a list of file names in the folder
	fileNames, err := getFilesInFolder(folderPath)
	if err != nil {
      callback(folderPath, nil, err)
	}

	// Read the contents of each file
	for _, fileName := range fileNames {
		fileContent, err := ioutil.ReadFile(fileName)
      callback(fileName, fileContent, err)
	}
}

// getFilesInFolder returns a list of file names in the specified folder.
func getFilesInFolder(folderPath string) ([]string, error) {
	var fileNames []string

	// Open the folder
	f, err := os.Open(folderPath)
	if err != nil {
		return nil, err
	}
	defer f.Close()

	// Read the file names
	names, err := f.Readdirnames(-1)
	if err != nil {
		return nil, err
	}

	// Filter out directories
	for _, name := range names {
		filePath := filepath.Join(folderPath, name)
		info, err := os.Stat(filePath)
		if err != nil {
			return nil, err
		}
		if !info.IsDir() {
			fileNames = append(fileNames, filePath)
		} else {
         children, err:= getFilesInFolder(filePath)
         if err != nil {
            return nil, err
         }  
         fileNames = append(fileNames, children...) 
      }
	}

	return fileNames, nil
}

