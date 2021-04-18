package git

import (
	"fmt"
	"os/exec"
	"strconv"
	"strings"

	pb "github.com/cheggaaa/pb/v3"

	"github.com/shio-yaamaa/git-count-commits/fs"
)

type CommitCountData = map[string]CommitCountDataPerAuthor // Key: author
type CommitCountDataPerAuthor = map[string]int             // Key: filename

func CreateCommitCountData(repositoryPath string, items []fs.DirectoryItem) (CommitCountData, error) {
	progressBar := pb.StartNew(len(items))
	data := make(map[string]CommitCountDataPerAuthor)
	for _, item := range items {
		fileCommitCountData, err := getCommitCountDataOfDirectoryItem(repositoryPath, item)
		if err != nil {
			return CommitCountData{}, err
		}
		for authorName, fileCommitCountDataPerAuthor := range fileCommitCountData {
			_, exists := data[authorName]
			if !exists {
				data[authorName] = make(map[string]int)
			}
			data[authorName][item.Path] = fileCommitCountDataPerAuthor[item.Path]
		}
		progressBar.Increment()
	}
	progressBar.Finish()
	return data, nil
}

func getCommitCountDataOfDirectoryItem(repositoryPath string, item fs.DirectoryItem) (CommitCountData, error) {
	// Not sure how to turn off copy detection
	// https://stackoverflow.com/questions/44083806/how-to-prevent-git-log-follow-from-following-copies-but-only-follow-renames
	command := fmt.Sprintf("git -C %s log --follow --find-renames=100%% %s | git shortlog --summary", repositoryPath, item.Path)
	output, err := exec.Command("bash", "-c", command).Output()
	if err != nil {
		return CommitCountData{}, err
	}

	data := make(map[string]CommitCountDataPerAuthor)
	lines := nonemptyLines(string(output))
	for _, line := range lines {
		lineComponents := strings.Split(line, "\t")
		count, _ := strconv.Atoi(lineComponents[0])
		authorName := lineComponents[1]

		data[authorName] = map[string]int{
			item.Path: count,
		}
	}
	return data, nil
}
