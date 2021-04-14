import { CommitCountDataPerAuthor, DirectoryItem } from './types';

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
  switch (item.type) {
    case 'folder':
      return Object.values(item.children)
        .map((item) => countCommits(item, commitCountData))
        .reduce((a, b) => a + b, 0);
    case 'file':
      return commitCountData[item.path] ?? 0;
  }
};
