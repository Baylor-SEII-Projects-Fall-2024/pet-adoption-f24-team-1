import * as React from 'react';
import Head from 'next/head'
import {
    Container,
    Stack,
    Typography,
    Box,
    Item,
    IconButton,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Slider,
    ToggleButtonGroup,
    ToggleButton,
    Icon,
    TextField
} from '@mui/material';
import { useState, useEffect } from 'react';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { BorderBottomOutlined } from '@mui/icons-material';
import axios from 'axios';


function valuetext(value) {
    return `${value}`;
}

export default function CenterFilterStack(props) {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;


    const handleNameChange = (event) => {
        const value = event.target.value;
        console.log("Name filter changed to:", value); // Log name filter change
        setNameFltr(value);
    };

    const handleAddressChange = (event) => {
        const value = event.target.value;
        console.log("Address filter changed to:", value); // Log address filter change
        setAddressFltr(value);
    };

    return (
        <Stack
            sx={{
                width: 300,
                position: 'sticky',
                marginLeft: 3,
                marginRight: 3,
                padding: 2,
                border: '1px solid #ddd',
                borderRadius: 1,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                flexShrink: 0 // Prevents it from shrinking and overlapping
            }}
            spacing={3}
        >
            <Typography variant="h6">Filters</Typography>
            <TextField
                label="Name"
                value={nameFltr}
                onChange={onNameChange}
                placeholder="Enter adoption center name"
                variant="outlined"
                fullWidth
            />
            <TextField
                label="Address"
                value={addressFltr}
                onChange={onAddressChange}
                placeholder="Enter adoption center address"
                variant="outlined"
                fullWidth
            />
        </Stack>
    );
}
