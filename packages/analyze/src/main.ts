import * as path from 'path';
import * as minimist from 'minimist';
import * as fs from 'fs-extra';

import { listFiles } from './gitCommands';
import { buildDirectoryTree, directoryTreeToJSON } from './directoryTree';
import { createCommitCountData, commitCountDataToJSON } from './commitCount';

const main = async (): Promise<void> => {
  const args = minimist(process.argv.slice(2));
  const targetDirectory = args._[0];
  if (!targetDirectory || targetDirectory.length === 0) {
    console.error('Target directory is required');
    return;
  }
  let files = await listFiles(targetDirectory);
  const directoryTree = buildDirectoryTree(files);
  fs.outputJSONSync(
    path.join(__dirname, '../output/directoryTree.json'),
    directoryTreeToJSON(directoryTree)
  );
  const commitCountData = await createCommitCountData(targetDirectory, files);
  fs.outputJSONSync(
    path.join(__dirname, '../output/commitCount.json'),
    commitCountDataToJSON(commitCountData)
  );
};

main();
