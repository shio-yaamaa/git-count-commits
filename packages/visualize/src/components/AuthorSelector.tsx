import React from 'react';
import './AuthorSelector.css';

interface Props {
  authorNames: string[];
}

export const AuthorSelector: React.VFC<Props> = (props) => {
  return (
    <div className="AuthorSelector">
      <select name="author">
        {props.authorNames.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
