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
  children: { [name: string]: DirectoryItem }; // Key is the name of the DirectoryItem
}

export type CommitCountData = {
  [authorName: string]: CommitCountDataPerAuthor;
};

export type CommitCountDataPerAuthor = { [filename: string]: number };
