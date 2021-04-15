import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';

const repositoryPath = process.env.REACT_APP_REPOSITORY_PATH;
if (!repositoryPath) {
  throw new Error('Environment variable  REACT_APP_REPOSITORY_PATH is not set');
}

ReactDOM.render(
  <React.StrictMode>
    <App repositoryPath={repositoryPath} />
  </React.StrictMode>,
  document.getElementById('root')
);
