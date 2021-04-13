import { exec } from 'child_process';
import * as path from 'path';

import { CommitCountData, FileItem } from './types';

export const listFiles = async (
  workingDirectory: string
): Promise<FileItem[]> => {
  return new Promise((resolve, reject) => {
    exec('git ls-files', { cwd: workingDirectory }, (error, stdout, stderr) => {
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
    });
  });
};

export const getCommitCountDataOfFile = async (
  workingDirectory: string,
  file: FileItem
): Promise<CommitCountData> => {
  return new Promise((resolve, reject) => {
    exec(
      `git log --follow "${file.path}" | git shortlog --summary`,
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
            new Map([[file.path, parseInt(countString)]])
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
