import React from 'react';
import './FolderItemComponent.css';
import { DirectoryItemComponent } from './DirectoryItemComponent';
import { FolderItem } from '../types';
import { sortDirectoryItems } from '../utils';

interface Props {
  item: FolderItem;
}

export const FolderItemComponent: React.VFC<Props> = (props) => {
  return (
    <div className="FolderItemComponent">
      <div>{props.item.name}</div>
      {sortDirectoryItems(Object.values(props.item.children)).map((item) => (
        <DirectoryItemComponent item={item} />
      ))}
    </div>
  );
};
