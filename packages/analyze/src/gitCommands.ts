import { exec } from 'child_process';
import * as path from 'path';

import { Commit, FileItem } from './types';

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

export const getCommitsOnFile = async (
  workingDirectory: string,
  file: FileItem
): Promise<Commit[]> => {
  return new Promise((resolve, reject) => {
    exec(
      `git log --follow --date=iso --pretty=format:"%H,%ad,%an" ${file.path}`,
      { cwd: workingDirectory },
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        if (stderr) {
          reject(stderr);
        }
        const commits: Commit[] = splitLines(stdout).map((commit) => {
          const [hash, time, author] = commit.split(',');
          return {
            hash,
            time,
            author,
          };
        });
        resolve(commits);
      }
    );
  });
};

const splitLines = (raw: string): string[] => {
  return raw.split('\n').filter((line) => line.length > 0);
};
