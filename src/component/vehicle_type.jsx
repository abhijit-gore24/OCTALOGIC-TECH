import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';

const VehicleTypeRadio = ({ vehicleTypes, selectedType, onSelectType }) => {
  const handleChange = (event) => {
    onSelectType(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <Typography variant="h6" component="span">
          Vehicle Type
        </Typography>
      </FormLabel>
      <RadioGroup
        aria-labelledby="vehicle-type-radio-group"
        name="vehicle-type"
        value={selectedType}
        onChange={handleChange}
      >
        {vehicleTypes?.map((type) => (
          <FormControlLabel
            key={type.id}
            value={type.id}
            control={<Radio />}
            label={type.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default VehicleTypeRadio;
