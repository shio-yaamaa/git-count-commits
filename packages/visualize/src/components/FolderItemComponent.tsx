import React from 'react';
import './FolderItemComponent.css';
import { DirectoryItemComponent } from './DirectoryItemComponent';
import { StyledDirectoryTreeItem } from './StyledDirectoryTreeItem';
import { CommitCountDataPerAuthor, FolderItem } from '../types';
import { sortDirectoryItems } from '../utils';

interface Props {
  item: FolderItem;
  commitCount: number;
  commitCountData: CommitCountDataPerAuthor;
  maxCommitCount: number;
  showUncommittedItems: boolean;
}

export const FolderItemComponent: React.VFC<Props> = (props) => {
  return (
    <StyledDirectoryTreeItem
      item={props.item}
      commitCount={props.commitCount}
      maxCommitCount={props.maxCommitCount}
    >
      {sortDirectoryItems(Object.values(props.item.children)).map((item) => (
        <DirectoryItemComponent
          key={item.name}
          item={item}
          commitCountData={props.commitCountData}
          maxCommitCount={props.maxCommitCount}
          showUncommittedItems={props.showUncommittedItems}
        />
      ))}
    </StyledDirectoryTreeItem>
  );
};
