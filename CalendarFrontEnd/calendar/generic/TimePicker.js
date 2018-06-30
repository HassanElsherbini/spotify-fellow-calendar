import React from 'react';
import TextField from '@material-ui/core/TextField';

const TimePicker = (props) => {
  let { handleChange, startErrorTxt,
        endErrorTxt, isEdit,
        startTime, endTime, date} = props;

  //initialzing time pickers
  let hhmmPicker = (
    <div className="timepickers">
      <div className="form-group">
        <TextField
            id="startTime"
            label="Start"
            type="time"
            defaultValue={startTime}
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
          defaultValue={endTime}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange('endTime')}
        />
        <div className="error-text">{endErrorTxt}</div>
      </div>
    </div>
  );

  let dateTimePicker = (
    <div>
      {hhmmPicker}
      <TextField
        required
        id="date"
        label="Day"
        type="date"
        defaultValue={date}
        onChange={handleChange('date')}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </div>
  );

  return isEdit ? dateTimePicker : hhmmPicker;
};

export default TimePicker;
