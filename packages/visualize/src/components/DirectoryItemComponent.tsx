import React from 'react';
import './DirectoryItem.css';
import { DirectoryItem, CommitCountDataPerAuthor } from '../types';
import { countCommits } from '../utils';
import { FolderItemComponent } from './FolderItemComponent';
import { FileItemComponent } from './FileItemComponent';

interface Props {
  item: DirectoryItem;
  commitCountData: CommitCountDataPerAuthor;
}

export const DirectoryItemComponent: React.VFC<Props> = (props) => {
  switch (props.item.type) {
    case 'folder':
      return (
        <FolderItemComponent
          item={props.item}
          commitCount={countCommits(props.item, props.commitCountData)}
          commitCountData={props.commitCountData}
        />
      );
    case 'file':
      return (
        <FileItemComponent
          item={props.item}
          commitCount={countCommits(props.item, props.commitCountData)}
        />
      );
  }
};
