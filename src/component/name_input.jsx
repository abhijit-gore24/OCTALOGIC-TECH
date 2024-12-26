import { Box, Grid, TextField } from '@mui/material';
import React from 'react';

const NameInput = ({ firstName, lastName, onFirstNameChange, onLastNameChange }) => {
  return (
    <Box 
    // display="grid" 
    mt={4}
    gap={2}
     display="flex"
            flexDirection="column"
            width="100%"
    >
         <TextField
          required
          id="outlined-required"
          label="First Name"
          // defaultValue="First Name"
          value={firstName} onChange={onFirstNameChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Last Name"
          // defaultValue="First Name"
          value={lastName} onChange={onLastNameChange}
        />
     
    </Box>
  );
};

export default NameInput;
