import { exec } from 'child_process';

export const listFiles = async (workingDirectory: string): Promise<String> => {
  return new Promise((resolve, reject) => {
    exec('git ls-files', { cwd: workingDirectory }, (error, stdout, stderr) => {
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
