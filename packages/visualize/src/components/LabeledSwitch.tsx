import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import './LabeledSwitch.css';

interface Props {
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}

export const LabeledSwitch: React.FC<Props> = (props) => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={props.value}
            color="primary"
            onChange={(event) => props.setValue(event.target.checked)}
          />
        }
        label={props.label}
      />
    </FormGroup>
  );
};
