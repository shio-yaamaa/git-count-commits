import { exec } from 'child_process';
import * as path from 'path';

import { CommitCountData, FileItem, DirectoryItem } from './types';

export const listFiles = async (
  workingDirectory: string
): Promise<FileItem[]> => {
  return new Promise((resolve, reject) => {
    exec(
      'git -c "core.quotepath=off" ls-files',
      { cwd: workingDirectory },
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        const files: FileItem[] = splitLines(stdout).map((filePath) => ({
          type: 'file',
          name: path.basename(filePath),
          path: filePath,
        }));
        resolve(files);
      }
    );
  });
};

export const getCommitCountDataOfDirectoryItem = async (
  workingDirectory: string,
  item: DirectoryItem
): Promise<CommitCountData> => {
  return new Promise((resolve, reject) => {
    // Not sure how to turn off copy detection
    // https://stackoverflow.com/questions/44083806/how-to-prevent-git-log-follow-from-following-copies-but-only-follow-renames
    exec(
      `git log --follow --find-renames=100% "${item.path}" | git shortlog --summary`,
      { cwd: workingDirectory },
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        const commitCountData: CommitCountData = new Map();
        for (const line of splitLines(stdout)) {
          const [countString, author] = line.split('\t');
          commitCountData.set(
            author,
            new Map([[item.path, parseInt(countString)]])
          );
        }
        resolve(commitCountData);
      }
    );
  });
};

const splitLines = (raw: string): string[] => {
  return raw.split('\n').filter((line) => line.length > 0);
};
