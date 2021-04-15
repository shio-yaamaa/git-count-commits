import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import './App.css';
import { FolderItem, CommitCountData } from './types';
import { sortAuthorNames } from './utils';
import { AuthorSelector } from './components/AuthorSelector';
import { DirectoryTree } from './components/DirectoryTree';
import { LabeledSwitch } from './components/LabeledSwitch';
import directoryTree from './data/mecab-directoryTree.json';
import commitCountData from './data/mecab-commitCount.json';

export const App: React.VFC = () => {
  const authorNames = sortAuthorNames(Object.keys(commitCountData));
  const [authorName, setAuthorName] = useState(authorNames[0]);
  const [showUncommittedItems, setShowUncommittedItems] = useState(true);
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
        <LabeledSwitch
          label="Show items that this person 👆 has not committed"
          value={showUncommittedItems}
          setValue={setShowUncommittedItems} />
        <DirectoryTree
          root={directoryTree as FolderItem}
          commitCountData={(commitCountData as CommitCountData)[authorName]}
          showUncommittedItems={showUncommittedItems}
        />
      </Container>
    </div>
  );
};
