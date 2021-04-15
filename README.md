How to show commit stats of a repository `/Users/me/my-project`:

## 1. Clone and Setup

Clone this repository and run `yarn` to install dependencies.

## 2. (optional) Create .mailmap File

Run `git shortlog -se` in `/Users/me/my-project`.
If the commit authors are fragmented, create a [`.mailmap` file](https://git-scm.com/docs/gitmailmap) in `/Users/me/my-project` to merge same authors.

## 3. Analyze

Run `yarn analyze /Users/me/my-project` in this repository root.
This outputs the directory tree and commit stats of `/Users/me/my-project` and puts them in `packages/analyze/output`.
This may take several hours when the target repository is large.

## 4. Visualize

Run `REACT_APP_REPOSITORY_PATH=/Users/me/my-project yarn visualize`.
A React application launches and visualizes the commit stats.
Select the commit author in the dropdown menu on the top of the page.