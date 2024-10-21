import * as React from 'react';
import Head from 'next/head'
import {  Container, Stack, Typography, Box, Item, IconButton, Button, FormControl, InputLabel, Select, MenuItem, Slider, ToggleButtonGroup, ToggleButton, Icon } from '@mui/material';
import { useState, useEffect } from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { BorderBottomOutlined } from '@mui/icons-material';


function valuetext(value) {
  return `${value}`;
}

export default function FilterStack(props) {
  const [age, setAge] = useState([0, 30])
  const [weight, setWeight] = useState([0, 200])
  const [distance, setDistance] = useState(50)

  

  const handleGenderChange = (event, newFormats) => {
    props.setGenderFltr(newFormats);
  };
  
  useEffect(() =>  {
    //Get species options
    //Get breed options
  }, []);

  

  const handleAgeChange = (event, newValue) => {
    setAge(newValue);
  };
  const handleAgeComm = (event, newValue) => {
    props.setAgeFltr(newValue);
  };

  const handleWeightChange = (event, newValue) => {
    setWeight(newValue);
  };
  const hangeWeightComm = (event, newValue) => {
    props.setWeightFltr(newValue);
  };

  const handleDistanceChange = (event, newValue) => {
    setDistance(newValue);
  };

  const handleSpeciesChange = (event) => {
    props.setSpeciesFltr(event.target.value);
  };

  const handleBreedChange = (event) => {
    props.setBreedFltr(event.target.value);
  };

  return (

    <Stack sx={{ width: 300, position: 'sticky', marginLeft: 3, marginRight: 3 }} spacing={5}>
      <Stack sx={{boxShadow: '0 2px 2px -2px gray'}}>
        <Typography fontSize={19}>Filters</Typography>
      </Stack>
      <Stack>
        <Typography>Gender</Typography>
        <ToggleButtonGroup value={props.genderFltr} onChange={handleGenderChange} aria-label="gender filtering">
          <ToggleButton value="Male" aria-label="Male">
            <MaleIcon />
            <Typography>M</Typography>
          </ToggleButton>
          <ToggleButton value="Female" aria-label="Female">
            <FemaleIcon />
            <Typography>F</Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <FormControl>
        <InputLabel>Species</InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          value={props.speciesFltr}
          label="Species"
          onChange={handleSpeciesChange}
        >
          <MenuItem value={'Any'}>Any</MenuItem>
          <MenuItem value={'Dog'}>Dog</MenuItem>
          <MenuItem value={'Cat'}>Cat</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Breed</InputLabel>
        <Select
          labelId="select-label"
          id="simple-select"
          value={props.breedFltr}
          label="Species"
          onChange={handleBreedChange}
        >
          <MenuItem value={'Any'}>Any</MenuItem>
          <MenuItem value={'Husky'}>Husky</MenuItem>
          <MenuItem value={'Yorky'}>Yorky</MenuItem>
        </Select>
      </FormControl>
      <Box>
        <Typography marginLeft={1.5}>Age Range</Typography>
        <Slider
          getAriaLabel={() => 'Age range'}
          value={age}
          min={0}
          max={30}
          onChange={handleAgeChange}
          onChangeCommitted={handleAgeComm}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          sx={{width: '90%'}}
        />
      </Box>
      <Box>
        <Typography marginLeft={1.5}>Weight Range (kg)</Typography>
        <Slider
          getAriaLabel={() => 'Weight range'}
          value={weight}
          onChange={handleWeightChange}
          onChangeCommitted={hangeWeightComm}
          valueLabelDisplay="auto"
          min={0}
          max={200}
          getAriaValueText={valuetext}
          sx={{width: '90%'}}
        />
      </Box>
      <Box>
        <Typography marginLeft={1.5}>Distance (mi)</Typography>
        <Slider
          getAriaLabel={() => 'Distance'}
          value={distance}
          onChange={handleDistanceChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          min={0}
          max={50}
          sx={{width: '90%'}}
        />
      </Box>
      
      
    </Stack>
    );
}
