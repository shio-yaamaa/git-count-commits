import { exec } from 'child_process';

export const listFiles = async (): Promise<String> => {
  return new Promise((resolve, reject) => {
    exec('git ls-files', (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};
