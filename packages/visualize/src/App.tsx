import React from 'react';
import './App.css';
import { FolderItem } from './types';
import { AuthorSelector } from './components/AuthorSelector';
import { DirectoryTree } from './components/DirectoryTree';
import directoryTree from './data/mecab-directoryTree.json';
import commitCountData from './data/mecab-commitCount.json';

export const App: React.VFC = () => {
  return (
    <div className="App">
      <AuthorSelector authorNames={Object.keys(commitCountData)} />
      <DirectoryTree root={directoryTree as FolderItem} />
    </div>
  );
};
