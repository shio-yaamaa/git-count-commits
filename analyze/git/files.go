package git

import (
	"os/exec"
	"path"

	"github.com/shio-yaamaa/git-count-commits/fs"
)

func ListFiles(repositoryPath string) ([]fs.DirectoryItem, error) {
	output, err := exec.Command("git", "-C", repositoryPath, "-c", "core.quotepath=off", "ls-files").Output()
	if err != nil {
		return make([]fs.DirectoryItem, 0), err
	}
	paths := nonemptyLines(string(output))
	files := make([]fs.DirectoryItem, 0)
	for _, filePath := range paths {
		file := fs.DirectoryItem{
			ItemType: "file",
			Path:     filePath,
			BaseName: path.Base(filePath),
		}
		files = append(files, file)
	}
	return files, nil
}
