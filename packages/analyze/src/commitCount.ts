import * as cliProgress from 'cli-progress';

import { CommitCountData, CommitCountDataPerAuthor, FileItem } from './types';
import { getCommitCountDataOfFile } from './gitCommands';

export const createCommitCountData = async (
  workingDirectory: string,
  files: FileItem[]
): Promise<CommitCountData> => {
  const progressBar = new cliProgress.SingleBar(
    {
      format: '[{bar}] {percentage}% | {value}/{total} | {filename}',
    },
    cliProgress.Presets.shades_classic
  );
  progressBar.start(files.length, 0);
  const data: CommitCountData = new Map();
  for (const file of files) {
    progressBar.update({ filename: file.path });
    const fileCommitCountData = await getCommitCountDataOfFile(
      workingDirectory,
      file
    );
    for (const [author, commitCountDataPerAuthor] of Array.from(
      fileCommitCountData.entries()
    )) {
      if (!data.has(author)) {
        data.set(author, new Map());
      }
      const map = data.get(author);
      const count = commitCountDataPerAuthor.get(file.path);
      if (map && count) {
        map.set(file.path, count);
      }
    }
    progressBar.increment();
  }
  progressBar.stop();
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
