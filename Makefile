setup:
	(cd analyze; go mod tidy) && yarn

analyze:
	(cd analyze; go run main.go $(repository_path))

visualize:
	REACT_APP_REPOSITORY_PATH=$(repository_path) yarn visualize
