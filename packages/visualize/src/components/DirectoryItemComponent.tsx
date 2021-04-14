import React from 'react';
import { DirectoryItem } from '../types';
import './DirectoryItem.css';
import { FolderItemComponent } from './FolderItemComponent';
import { FileItemComponent } from './FileItemComponent';

interface Props {
  item: DirectoryItem;
}

export const DirectoryItemComponent: React.VFC<Props> = (props) => {
  switch (props.item.type) {
    case 'folder':
      return <FolderItemComponent item={props.item} />;
    case 'file':
      return <FileItemComponent item={props.item} />;
  }
};
