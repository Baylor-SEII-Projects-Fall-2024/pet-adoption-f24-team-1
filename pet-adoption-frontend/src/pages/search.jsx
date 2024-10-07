import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import styles from '@/styles/Home.module.css';

export default function Search() {
  // State to hold search filters
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');

  // Handle search button click
  const handleSearch = () => {
    // Here you'd trigger the search functionality with filters
    console.log('Search clicked', { species, age, location });
  };

  return (
    <>
      <Head>
        <title>Search Pets</title>
      </Head>

      <main>
        <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
          <Typography variant='h4'>Search for Pets</Typography>

          {/* Species Filter */}
          <FormControl fullWidth sx={{ maxWidth: 400 }}>
            <InputLabel>Species</InputLabel>
            <Select
              value={species}
              label="Species"
              onChange={(e) => setSpecies(e.target.value)}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="dog">Dog</MenuItem>
              <MenuItem value="cat">Cat</MenuItem>
              <MenuItem value="bird">Bird</MenuItem>
            </Select>
          </FormControl>

          {/* Age Filter */}
          <TextField
            fullWidth
            sx={{ maxWidth: 400 }}
            label="Age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          {/* Location Filter */}
          <TextField
            fullWidth
            sx={{ maxWidth: 400 }}
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          {/* Search Button */}
          <Button variant="contained" color="primary" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
      </main>
    </>
  );
}