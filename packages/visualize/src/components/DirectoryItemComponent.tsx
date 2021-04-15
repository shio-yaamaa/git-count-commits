import React from 'react';
import './DirectoryItem.css';
import { DirectoryItem, CommitCountDataPerAuthor } from '../types';
import { countCommits } from '../utils';
import { FolderItemComponent } from './FolderItemComponent';
import { FileItemComponent } from './FileItemComponent';

interface Props {
  item: DirectoryItem;
  commitCountData: CommitCountDataPerAuthor;
  showUncommittedItems: boolean;
  maxCommitCount: number;
}

export const DirectoryItemComponent: React.VFC<Props> = (props) => {
  const commitCount = countCommits(props.item, props.commitCountData);
  if (!props.showUncommittedItems && commitCount === 0) {
    return null;
  }
  switch (props.item.type) {
    case 'folder':
      return (
        <FolderItemComponent
          item={props.item}
          commitCount={commitCount}
          commitCountData={props.commitCountData}
          maxCommitCount={props.maxCommitCount}
          showUncommittedItems={props.showUncommittedItems}
        />
      );
    case 'file':
      return (
        <FileItemComponent
          item={props.item}
          commitCount={commitCount}
          maxCommitCount={props.maxCommitCount}
        />
      );
  }
};
