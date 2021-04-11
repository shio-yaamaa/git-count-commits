export type DirectoryItem = FileItem | FolderItem;

export interface FileItem {
  type: 'file';
  name: string; // With file extension
  path: string;
}

export interface FolderItem {
  type: 'folder';
  name: string;
  children: Map<string, DirectoryItem>; // Key is the name of the DirectoryItem
}
