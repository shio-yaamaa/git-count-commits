import React from 'react';
import './DirectoryTree.css';
import { FolderItem } from '../types';
import { DirectoryItemComponent } from './DirectoryItemComponent';
import { sortDirectoryItems } from '../utils';

interface Props {
  root: FolderItem;
  // commitCountData: CommitCountData;
}

export const DirectoryTree: React.VFC<Props> = (props) => {
  return (
    <div className="DirectoryTree">
      {sortDirectoryItems(Object.values(props.root.children)).map((item) => (
        <DirectoryItemComponent item={item} />
      ))}
    </div>
  );
};
