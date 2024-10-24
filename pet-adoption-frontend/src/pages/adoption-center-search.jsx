import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import styles from '@/styles/Home.module.css';

export default function adoptionCenterSearch() {
    // State to hold search filters
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');

    // Handle search button click
    const handleSearch = () => {
        // Here you'd trigger the search functionality with filters
        console.log('Search clicked', {name, address, zipCode });
    };

    return (
        <>
            <Head>
                <title>Find Adoption Centers</title>
            </Head>

            <main>
                <Stack sx={{ paddingTop: 4 }} alignItems='center' gap={2}>
                    <Typography variant='h4'>Find Adoption Centers</Typography>

                    {/* Name Filter */}
                    <TextField
                        fullWidth
                        sx={{ maxWidth: 400 }}
                        label="Name"
                        type="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/* address filter */}
                    <TextField
                        fullWidth
                        sx={{ maxWidth: 400 }}
                        label="Address"
                        type="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    {/* zip code filter */}
                    <TextField
                        fullWidth
                        sx={{ maxWidth: 400 }}
                        label="Zip"
                        type="Zip"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
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