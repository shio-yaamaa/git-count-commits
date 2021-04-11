import { CommitCountData, CommitCountDataPerAuthor, FileItem } from './types';
import { getCommitsOnFile } from './gitCommands';
import { Counter } from './counter';

export const createCommitCountData = async (
  workingDirectory: string,
  files: FileItem[]
): Promise<CommitCountData> => {
  const data: CommitCountData = new Map();
  for (const file of files) {
    const counter = new Counter();
    const commits = await getCommitsOnFile(workingDirectory, file);
    for (const commit of commits) {
      counter.increment(commit.author);
    }
    for (const [author, count] of Array.from(counter.map.entries())) {
      if (!data.has(author)) {
        data.set(author, new Map());
      }
      const map = data.get(author)!;
      map.set(file.path, count);
    }
  }
  return data;
};

export const commitCountDataToJSON = (
  data: CommitCountData
): { [author: string]: { [filename: string]: number } } => {
  const json: { [author: string]: { [filename: string]: number } } = {};
  for (const [author, CommitCountDataPerAuthor] of Array.from(data.entries())) {
    json[author] = commitCountDataPerAuthorToJSON(CommitCountDataPerAuthor);
  }
  return json;
};

const commitCountDataPerAuthorToJSON = (
  data: CommitCountDataPerAuthor
): { [filename: string]: number } => {
  const json: { [filename: string]: number } = {};
  for (const [filename, number] of Array.from(data.entries())) {
    json[filename] = number;
  }
  return json;
};
