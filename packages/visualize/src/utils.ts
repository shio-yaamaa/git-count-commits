import { DirectoryItem } from './types';

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
