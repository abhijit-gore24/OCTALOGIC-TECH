import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';

const WheelsRadio = ({ selectedWheels, onSelectWheels }) => {
    const handleChange = (event) => {
        onSelectWheels(event.target.value);
      };
    
      return (
        <FormControl component="fieldset">
          <FormLabel component="legend">
          <Typography variant="h6" component="span" >
          Number of Wheels
        </Typography>

        </FormLabel>
          <RadioGroup
            mt={2}
            aria-labelledby="number-of-wheels-radio-group"
            name="number-of-wheels"
            value={selectedWheels}
            onChange={handleChange}
          >
            <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
            <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
          </RadioGroup>
        </FormControl>
      );
 
    
};

export default WheelsRadio;
