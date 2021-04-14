import React from 'react';
import './DirectoryTree.css';
import { FolderItem, CommitCountDataPerAuthor } from '../types';
import { DirectoryItemComponent } from './DirectoryItemComponent';
import { sortDirectoryItems } from '../utils';

interface Props {
  root: FolderItem;
  commitCountData: CommitCountDataPerAuthor;
}

export const DirectoryTree: React.VFC<Props> = (props) => {
  return (
    <div className="DirectoryTree">
      {sortDirectoryItems(Object.values(props.root.children)).map((item) => (
        <DirectoryItemComponent
          item={item}
          commitCountData={props.commitCountData}
        />
      ))}
    </div>
  );
};
