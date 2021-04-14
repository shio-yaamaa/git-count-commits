import React from 'react';
import './AuthorSelector.css';

interface Props {
  authorName: string;
  authorNames: string[];
  setAuthorName: (name: string) => void;
}

export const AuthorSelector: React.VFC<Props> = (props) => {
  return (
    <div className="AuthorSelector">
      <select
        name="author"
        onChange={(event) => props.setAuthorName(event.target.value)}
      >
        {props.authorNames.map((name) => (
          <option key={name} value={name} selected={name === props.authorName}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
