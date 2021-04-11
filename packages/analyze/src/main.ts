import * as path from 'path';

import { FileItem } from './types';
import { listFiles } from './gitCommands';
import { buildDirectoryTree, directoryTreeToJSON } from './directoryTree';

const main = async (): Promise<void> => {
  let listFilesOutput = await listFiles();
  let files: FileItem[] = listFilesOutput
    .split('\n')
    .filter((filePath) => filePath.length > 0)
    .map((filePath) => ({
      type: 'file',
      name: path.basename(filePath),
      path: filePath,
    }));
  const directoryTree = buildDirectoryTree(files);
  console.log(JSON.stringify(directoryTreeToJSON(directoryTree)));
};

main();
