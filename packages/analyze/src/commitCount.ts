import * as cliProgress from 'cli-progress';

import {
  CommitCountData,
  CommitCountDataPerAuthor,
  DirectoryItem,
} from './types';
import { getCommitCountDataOfDirectoryItem } from './gitCommands';

export const createCommitCountData = async (
  workingDirectory: string,
  items: DirectoryItem[]
): Promise<CommitCountData> => {
  const progressBar = new cliProgress.SingleBar(
    {
      format: '[{bar}] {percentage}% | {value}/{total} | {filename}',
    },
    cliProgress.Presets.shades_classic
  );
  progressBar.start(items.length, 0);
  const data: CommitCountData = new Map();
  for (const item of items) {
    progressBar.update({ filename: item.path });
    const fileCommitCountData = await getCommitCountDataOfDirectoryItem(
      workingDirectory,
      item
    );
    for (const [author, commitCountDataPerAuthor] of Array.from(
      fileCommitCountData.entries()
    )) {
      if (!data.has(author)) {
        data.set(author, new Map());
      }
      const map = data.get(author);
      const count = commitCountDataPerAuthor.get(item.path);
      if (map && count) {
        map.set(item.path, count);
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
