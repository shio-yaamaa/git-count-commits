import React from 'react';
import './FolderItemComponent.css';
import { DirectoryItemComponent } from './DirectoryItemComponent';
import { CommitCountDataPerAuthor, FolderItem } from '../types';
import { sortDirectoryItems } from '../utils';

interface Props {
  item: FolderItem;
  commitCount: number;
  commitCountData: CommitCountDataPerAuthor;
}

export const FolderItemComponent: React.VFC<Props> = (props) => {
  return (
    <div className="FolderItemComponent">
      <details>
        <summary className="FolderItemComponent-summary">
          {props.item.name} {props.commitCount}
        </summary>
        <div className="FolderItemComponent-content">
          {sortDirectoryItems(Object.values(props.item.children)).map(
            (item) => (
              <DirectoryItemComponent
                item={item}
                commitCountData={props.commitCountData}
              />
            )
          )}
        </div>
      </details>
    </div>
  );
};
