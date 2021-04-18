package git

import "strings"

func nonemptyLines(text string) []string {
	lines := strings.Split(text, "\n")
	filteredLines := make([]string, 0)
	for _, line := range lines {
		trimmedLine := strings.TrimSpace(line)
		if len(trimmedLine) > 0 {
			filteredLines = append(filteredLines, trimmedLine)
		}
	}
	return filteredLines
}
