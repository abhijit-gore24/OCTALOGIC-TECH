import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';

const VehicleModelRadio = ({ vehicleModels, selectedModel, onSelectModel }) => {
  const handleChange = (event) => {
    onSelectModel(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">
        <Typography variant="h6" component="span">
          Vehicle Model
        </Typography>
      </FormLabel>
      <RadioGroup
        aria-labelledby="vehicle-model-radio-group"
        name="vehicle-model"
        value={selectedModel}
        onChange={handleChange}
      >
        {vehicleModels.map((model) => (
          <FormControlLabel
            key={model.id}
            value={model.id}
            control={<Radio />}
            label={model.name}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default VehicleModelRadio;
