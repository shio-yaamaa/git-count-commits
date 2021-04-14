import React from 'react';
import Typography from '@material-ui/core/Typography';
import TreeItem from '@material-ui/lab/TreeItem';
import './StyledDirectoryTreeItem.css';
import { DirectoryItem } from '../types';

interface Props {
  item: DirectoryItem;
  commitCount: number;
}

export const StyledDirectoryTreeItem: React.FC<Props> = (props) => {
  const { item, commitCount, ...other } = props;
  return (
    <TreeItem
      nodeId={props.item.name}
      label={
        <div className="StyledDirectoryTreeItem-label">
          <Typography
            variant="body2"
            className="StyledDirectoryTreeItem-label-main"
          >
            {item.name}
          </Typography>
          <Typography
            variant="caption"
            className="StyledDirectoryTreeItem-label-secondary"
          >
            {commitCount.toLocaleString()}
          </Typography>
        </div>
      }
      {...other}
    />
  );
};
