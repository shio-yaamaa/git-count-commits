package fs

import (
	"path"
	"strings"
)

type DirectoryItem struct {
	ItemType string                   `json:"type"` // "file" | "folder"
	Path     string                   `json:"path"`
	BaseName string                   `json:"name"`
	Children map[string]DirectoryItem `json:"children"` // Ignored when ItemType == "file"
}

func BuildDirectoryTree(files []DirectoryItem, rootName string) DirectoryItem {
	root := DirectoryItem{
		ItemType: "folder",
		Path:     "",
		BaseName: rootName,
		Children: make(map[string]DirectoryItem),
	}
	for _, file := range files {
		addToDirectoryTree(&root, file)
	}
	return root
}

func addToDirectoryTree(root *DirectoryItem, file DirectoryItem) {
	currentLocation := root
	components := strings.Split(file.Path, "/")
	folderNames := components[0 : len(components)-1]

	for len(folderNames) > 0 {
		folderName := folderNames[0]
		folderNames = folderNames[1:]

		folder, exists := currentLocation.Children[folderName]
		if !exists {
			currentLocation.Children[folderName] = DirectoryItem{
				ItemType: "folder",
				Path:     path.Join(currentLocation.Path, folderName),
				BaseName: folderName,
				Children: make(map[string]DirectoryItem),
			}
			folder = currentLocation.Children[folderName]
		}
		currentLocation = &folder
	}
	currentLocation.Children[file.BaseName] = file
}

func ListDirectoryItemsInFolder(folder DirectoryItem) []DirectoryItem {
	items := make([]DirectoryItem, 0)
	for _, value := range folder.Children {
		items = append(items, value)
		if value.ItemType == "folder" {
			items = append(items, ListDirectoryItemsInFolder(value)...)
		}
	}
	return items
}
