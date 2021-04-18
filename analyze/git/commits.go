package git

import (
	"fmt"
	"log"
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
	channel := make(chan CommitCountData, 1)
	concurrentLimitter := make(chan struct{}, 10)
	for _, item := range items {
		go getCommitCountDataOfDirectoryItem(repositoryPath, item, channel, concurrentLimitter, progressBar)
	}

	for i := 0; i < len(items); i++ {
		fileCommitCountData := <-channel
		for authorName, fileCommitCountDataPerAuthor := range fileCommitCountData {
			_, exists := data[authorName]
			if !exists {
				data[authorName] = make(map[string]int)
			}
			for path, count := range fileCommitCountDataPerAuthor {
				data[authorName][path] = count
			}
		}
	}
	progressBar.Finish()
	return data, nil
}

func getCommitCountDataOfDirectoryItem(repositoryPath string, item fs.DirectoryItem, channel chan CommitCountData, concurrentLimitter chan struct{}, progressBar *pb.ProgressBar) {
	concurrentLimitter <- struct{}{}
	defer func() { <-concurrentLimitter }()
	// Not sure how to turn off copy detection
	// https://stackoverflow.com/questions/44083806/how-to-prevent-git-log-follow-from-following-copies-but-only-follow-renames
	command := fmt.Sprintf("git -C %s log --follow --find-renames=100%% %s | git shortlog --summary", repositoryPath, item.Path)
	output, err := exec.Command("bash", "-c", command).Output()
	if err != nil {
		log.Fatal(err)
		channel <- CommitCountData{}
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
	progressBar.Increment()
	channel <- data
}
