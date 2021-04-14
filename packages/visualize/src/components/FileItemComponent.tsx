import React from 'react';
import './FileItemComponent.css';
import { FileItem } from '../types';

interface Props {
  item: FileItem;
  commitCount: number;
}

export const FileItemComponent: React.VFC<Props> = (props) => {
  return (
    <div className="FileItemComponent">
      {props.item.name} {props.commitCount}
    </div>
  );
};
