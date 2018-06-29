import React from 'react';
import TextField from '@material-ui/core/TextField';

const TimePicker = ({ handleChange, startErrorTxt, endErrorTxt}) => {
  let hhmmPicker = (
    <div className="timepickers">
      <div className="form-group">
        <TextField
            id="startTime"
            label="Start"
            type="time"
            defaultValue="7:00"
            InputLabelProps={{
              shrink: true
            }}
            onChange={handleChange('startTime')}
          />
          <div className="error-text">{startErrorTxt}</div>
      </div>

      <div className="form-group">
        <TextField
          id="endTime"
          label="End"
          type="time"
          defaultValue="8:00"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('endTime')}
        />
        <div className="error-text">{endErrorTxt}</div>
      </div>
    </div>
  );

  let mmPicker = (
    <div className="timepickers">
      <div className="form-group">
        <TextField
            required
            id="startTime"
            label="Start"
            defaultValue={0}
            onChange={handleChange('startTime')}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 59 } }}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
        />
        <div className="error-text">{startErrorTxt}</div>
      </div>
      <div className="form-group">
        <TextField
            required
            id="endTime"
            label="End"
            defaultValue={0}
            onChange={handleChange('endTime')}
            type="number"
            InputProps={{ inputProps: { min: 0, max: 59 } }}
            InputLabelProps={{
              min: 0,
              max: 59,
              shrink: true,
            }}
            margin="normal"
          />
          <div className="error-text">{endErrorTxt}</div>
      </div>
  </div>
  );

  return (hhmmPicker);
};

export default TimePicker;
