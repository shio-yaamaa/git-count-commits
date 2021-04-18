package utils

import (
	"strings"
)

func EscapePath(path string) string {
	return strings.ReplaceAll(path, "/", "_")
}
