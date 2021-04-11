import * as path from 'path';
import * as minimist from 'minimist';
import * as fsextra from 'fs-extra';

import { FileItem } from './types';
import { listFiles } from './gitCommands';
import { buildDirectoryTree, directoryTreeToJSON } from './directoryTree';

const main = async (): Promise<void> => {
  const args = minimist(process.argv.slice(2));
  const targetDirectory = args._[0];
  if (!targetDirectory || targetDirectory.length === 0) {
    console.error('Target directory is required');
    return;
  }
  let listFilesOutput = await listFiles(targetDirectory);
  let files: FileItem[] = listFilesOutput
    .split('\n')
    .filter((filePath) => filePath.length > 0)
    .map((filePath) => ({
      type: 'file',
      name: path.basename(filePath),
      path: filePath,
    }));
  const directoryTree = buildDirectoryTree(files);
  fsextra.outputJSONSync(
    path.join(__dirname, '../output/directoryTree.json'),
    directoryTreeToJSON(directoryTree)
  );
};

main();
