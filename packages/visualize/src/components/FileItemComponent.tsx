import React from 'react';
import './FileItemComponent.css';
import { StyledDirectoryTreeItem } from './StyledDirectoryTreeItem';
import { FileItem } from '../types';

interface Props {
  item: FileItem;
  commitCount: number;
  maxCommitCount: number;
}

export const FileItemComponent: React.VFC<Props> = (props) => {
  return (
    <StyledDirectoryTreeItem
      item={props.item}
      commitCount={props.commitCount}
      maxCommitCount={props.maxCommitCount}
    />
  );
};
