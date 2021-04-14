import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import './App.css';
import { FolderItem, CommitCountData } from './types';
import { sortAuthorNames } from './utils';
import { AuthorSelector } from './components/AuthorSelector';
import { DirectoryTree } from './components/DirectoryTree';
import directoryTree from './data/mecab-directoryTree.json';
import commitCountData from './data/mecab-commitCount.json';

export const App: React.VFC = () => {
  const authorNames = sortAuthorNames(Object.keys(commitCountData));
  const [authorName, setAuthorName] = useState(authorNames[0]);
  return (
    <div className="App">
      <Container
        maxWidth="sm"
        style={{ paddingTop: '2rem', paddingBottom: '2rem' }}
      >
        <AuthorSelector
          authorName={authorName}
          authorNames={authorNames}
          setAuthorName={setAuthorName}
        />
        <DirectoryTree
          root={directoryTree as FolderItem}
          commitCountData={(commitCountData as CommitCountData)[authorName]}
        />
      </Container>
    </div>
  );
};
