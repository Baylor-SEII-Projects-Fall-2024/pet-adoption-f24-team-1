import React from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, IconButton, InputAdornment, Slider } from '@mui/material';
import { useState } from "react";
import { useRouter } from 'next/router';
import AnimalBreeds from './constants/animal-breeds';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import PersonIcon from '@mui/icons-material/Person';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import axios from 'axios';
import ProtectedRoute from '@/components/protected-route';

const SetUserPreferencesPage = () => {
    const router = useRouter();
    const user = useAuthUser();

    const [species, setSpecies] = useState(null);
    const [breed, setBreed] = useState(null);
    const [gender, setGender] = useState(null);
    const [size, setSize] = useState(null);
    const [age, setAge] = useState([0, 30])

    const handleSpecies = (event) => {
        setSpecies(event.target.value);
    };

    const handleBreed = (event) => {
        setBreed(event.target.value);
    };

    const handleGender = (event, newGender) => {
        setGender(newGender);
    };

    const handleSize = (event) => {
        setSize(event.target.value);
    }

    const handleAge = (event, newValue) => {
        setAge(newValue);
    };

    const handleSubmit = () => {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

        console.log(1);

        axios.put(`${apiBaseUrl}/api/users/${user.id}/preferences`, {
            preferredSpecies: species,
            preferredBreed: breed,
            preferredGender: gender,
            preferredSize: size,
            ageMin: age[0],
            ageMax: age[1],
        })
        .then(response => {
            alert("Preferences set!");
            router.push("/");

        })
        .catch(error => {
            alert("Preference set failed: " + error.message);
        });
};

    return (
        <ProtectedRoute>
            <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f5f5f5'
            }}
            >
            <Paper
                elevation={3}
                sx={{
                padding: 4,
                width: 600,
                borderRadius: 2,
                textAlign: 'center',
                }}
            >
                <PersonIcon sx={{ width: "50px", height: "auto" }} />

                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Welcome to Fluffy Friends{user ? ", " + user.firstName : ""}
                </Typography>

                <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
                    Thank you for registering with Fluffy Friends! Take a moment to fill out the
                    information below to help us connect you with your preferred pets! You can always
                    change these later.
                </Typography>

                {/* Species Selection */}
                <Box >
                    <Typography variant="h6" sx={{ marginY: 1 }}>Select your preferred species:</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Species</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={species}
                            label="Species"
                            onChange={handleSpecies}
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Dog">Dog</MenuItem>
                        <MenuItem value="Cat">Cat</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Breed Selection */}
                <Box>
                    <Typography variant="h6" sx={{ marginY: 1 }}>What is your preferred breed?</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Breed</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={breed}
                            label="Breed"
                            onChange={handleBreed}
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {AnimalBreeds.DOG_BREEDS.map((dogBreed, index) => (
                            <MenuItem key={index} value={dogBreed}>
                                {dogBreed}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Gender Selection */}
                <Box>
                    <Typography variant="h6" sx={{ marginY: 1 }}>Gender?</Typography>
                    <ToggleButtonGroup
                        value={gender}
                        exclusive
                        onChange={handleGender}
                        aria-label="text alignment"
                        size='large'
                        >
                        <ToggleButton value="Male" aria-label="left aligned">
                            <MaleIcon />
                        </ToggleButton>
                        <ToggleButton value="Female" aria-label="centered">
                            <FemaleIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                {/* Size Selection */}
                <Box>
                    <Typography variant="h6" sx={{ marginY: 1 }}>Select your preferred size:</Typography>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Size</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={size}
                            label="Szie"
                            onChange={handleSize}
                        >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="Small">Small</MenuItem>
                        <MenuItem value="Medium">Medium</MenuItem>
                        <MenuItem value="Large">Large</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                {/* Age Range Selection */}
                <Box>
                    <Typography variant="h6" sx={{ marginY: 1 }}>Select your preferred age range:</Typography>
                    <Slider
                    getAriaLabel={() => 'Age range'}
                    value={age}
                    min={0}
                    max={30}
                    onChange={handleAge}
                    valueLabelDisplay="auto"
                    sx={{width: '80%'}}
                    />
                </Box>

                <Button onClick={handleSubmit} variant="contained" size='large'>
                    Set Preferences
                </Button>

            </Paper>
            </Box>
        </ProtectedRoute>
    );
};

export default SetUserPreferencesPage;
