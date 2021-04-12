import * as path from 'path';

import { FolderItem, FileItem, DirectoryItem } from './types';

export const buildDirectoryTree = (
  files: FileItem[],
  rootName: string
): FolderItem => {
  const directoryTree: FolderItem = {
    type: 'folder',
    name: rootName,
    children: new Map(),
  };
  for (const file of files) {
    addToDirectoryTree(directoryTree, file);
  }
  return directoryTree;
};

const addToDirectoryTree = (directoryTree: FolderItem, file: FileItem) => {
  let currentLocation = directoryTree;
  const components = file.path.split(path.sep);
  const folderNames = components.slice(0, -1);
  const fileName = components[components.length - 1];
  while (folderNames.length > 0) {
    const folderName = folderNames.shift();
    if (!folderName) break;
    if (!currentLocation.children.has(folderName)) {
      currentLocation.children.set(folderName, {
        type: 'folder',
        name: folderName,
        children: new Map(),
      });
    }
    currentLocation = currentLocation.children.get(folderName) as FolderItem;
  }
  currentLocation.children.set(fileName, file);
};

export const directoryTreeToJSON = (
  directoryTree: FolderItem
): { [key: string]: any } => {
  return {
    ...directoryTree,
    children: folderChildrenToJSON(directoryTree.children),
  };
};

const folderChildrenToJSON = (
  children: Map<string, DirectoryItem>
): { [key: string]: any } => {
  const json: { [key: string]: any } = {};
  for (const [key, value] of Array.from(children.entries())) {
    switch (value.type) {
      case 'folder':
        json[key] = {
          ...value,
          children: folderChildrenToJSON(value.children),
        };
        break;
      case 'file':
        json[key] = value;
        break;
    }
  }
  return json;
};
