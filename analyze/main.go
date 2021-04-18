package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path"

	"github.com/shio-yaamaa/git-count-commits/fs"
	"github.com/shio-yaamaa/git-count-commits/git"
	"github.com/shio-yaamaa/git-count-commits/utils"
)

func main() {
	if len(os.Args) < 2 {
		log.Fatal("Target directory required")
	}
	targetDirectory := os.Args[1]
	escapedPath := utils.EscapePath(targetDirectory)
	rootName := path.Base(targetDirectory)

	files, err := git.ListFiles(targetDirectory)
	if err != nil {
		log.Fatal(err)
	}
	directoryTree := fs.BuildDirectoryTree(files, rootName)
	directoryItems := fs.ListDirectoryItemsInFolder(directoryTree)
	commitCountData, err := git.CreateCommitCountData(targetDirectory, directoryItems)
	if err != nil {
		log.Fatal(err)
	}

	os.MkdirAll("output", 0777)
	directoryTreeJSON, _ := json.Marshal(directoryTree)
	ioutil.WriteFile(fmt.Sprintf("output/directoryTree-%s.json", escapedPath), directoryTreeJSON, 0777)
	commitCountDataJSON, _ := json.Marshal(commitCountData)
	ioutil.WriteFile(fmt.Sprintf("output/commitCount-%s.json", escapedPath), commitCountDataJSON, 0777)
}
