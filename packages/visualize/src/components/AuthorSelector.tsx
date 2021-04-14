import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './AuthorSelector.css';

interface Props {
  authorName: string;
  authorNames: string[];
  setAuthorName: (name: string) => void;
}

export const AuthorSelector: React.VFC<Props> = (props) => {
  return (
    <div className="AuthorSelector">
      <FormControl>
        <InputLabel id="AuthorSelector-label">Committer</InputLabel>
        <Select
          labelId="AuthorSelector-label"
          value={props.authorName}
          onChange={(event) =>
            props.setAuthorName(event.target.value as string)
          }
        >
          {props.authorNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
