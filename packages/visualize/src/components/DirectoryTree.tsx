import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import './DirectoryTree.css';
import { FolderItem, CommitCountDataPerAuthor } from '../types';
import { DirectoryItemComponent } from './DirectoryItemComponent';
import { sortDirectoryItems } from '../utils';

interface Props {
  root: FolderItem;
  commitCountData: CommitCountDataPerAuthor;
  showUncommittedItems: boolean;
}

export const DirectoryTree: React.VFC<Props> = (props) => {
  return (
    <div className="DirectoryTree">
      <TreeView
        defaultCollapseIcon={<ArrowDropDownIcon />}
        defaultExpandIcon={<ArrowRightIcon />}
      >
        {sortDirectoryItems(Object.values(props.root.children)).map((item) => (
          <DirectoryItemComponent
            key={item.name}
            item={item}
            commitCountData={props.commitCountData}
            showUncommittedItems={props.showUncommittedItems}
          />
        ))}
      </TreeView>
    </div>
  );
};
