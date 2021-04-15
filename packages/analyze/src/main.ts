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
  const rootName = path.basename(targetDirectory);
  let files = await listFiles(targetDirectory);
  const directoryTree = buildDirectoryTree(files, rootName);
  fs.outputJSONSync(
    path.join(__dirname, `../output/${rootName}-directoryTree.json`),
    directoryTreeToJSON(directoryTree)
  );
  const commitCountData = await createCommitCountData(targetDirectory, files);
  fs.outputJSONSync(
    path.join(__dirname, `../output/${rootName}-commitCount.json`),
    commitCountDataToJSON(commitCountData)
  );
};

main();
