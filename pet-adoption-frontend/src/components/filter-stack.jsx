import * as React from 'react';
import Head from 'next/head'
import {  Container, Stack, Typography, Box, Item, IconButton, Button, FormControl, InputLabel, Select, MenuItem, Slider } from '@mui/material';
import { useState, useEffect } from 'react';

function valuetext(value) {
  return `${value}°C`;
}

export default function FilterStack() {
  const [age, setAge] = React.useState([0, 100]);
  const [value, setValue] = React.useState([20, 37]);

  const handleAgeChange = (event, newValue) => {
    setAge(newValue);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (

    <Container sx={{ justifyContent: 'center', width: 500}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        <Box sx={{ width: 300 }}>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={age}
            onChange={handleAgeChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
        </Box>
      </FormControl>
    </Container>
    );
}
