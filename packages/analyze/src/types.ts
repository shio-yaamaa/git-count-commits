export type DirectoryItem = FileItem | FolderItem;

export interface FileItem {
  type: 'file';
  name: string; // With file extension
  path: string;
}

export interface FolderItem {
  type: 'folder';
  name: string;
  path: string;
  children: Map<string, DirectoryItem>; // Key is the name of the DirectoryItem
}

export type CommitCountData = Map<string, CommitCountDataPerAuthor>; // Key: author

export type CommitCountDataPerAuthor = Map<string, number>; // Key: filename
