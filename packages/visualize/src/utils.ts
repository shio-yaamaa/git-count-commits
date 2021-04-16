import { CommitCountDataPerAuthor, DirectoryItem, FolderItem } from './types';

export const escapePath = (path: string): string => {
  return path.replace(/\//g, '_');
};

export const sortAuthorNames = (names: string[]): string[] => {
  return [...names].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );
};

const typeToSortOrder: Map<DirectoryItem['type'], number> = new Map([
  ['folder', 0],
  ['file', 1],
]);

export const sortDirectoryItems = (items: DirectoryItem[]): DirectoryItem[] => {
  return [...items].sort((a, b) => {
    return (
      (typeToSortOrder.get(a.type) ?? 0) - (typeToSortOrder.get(b.type) ?? 0) ||
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  });
};

export const countCommits = (
  item: DirectoryItem,
  commitCountData: CommitCountDataPerAuthor
): number => {
  return commitCountData[item.path] ?? 0;
};

export const countMaxCommits = (
  directoryTree: FolderItem,
  commitCountData: CommitCountDataPerAuthor
): number => {
  const commitCounts = Object.values(directoryTree.children).map((item) =>
    countCommits(item, commitCountData)
  );
  return Math.max(...commitCounts);
};
