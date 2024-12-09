import * as React from 'react';
import {
    Stack,
    Typography,
    TextField,
    Grid
} from '@mui/material';
import { useState, useEffect } from 'react';
import NavBar from "@/components/nav-bar";
import AdoptionCenterCard from "@/components/adoption-center-card";

// FilterStack Component
function FilterStack({ nameFltr, addressFltr, zipCodeFltr, onNameChange, onAddressChange, onZipCodeChange }) {
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
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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
            <TextField
                label="Zip Code"
                type="number"
                value={zipCodeFltr}
                onChange={onZipCodeChange}
                placeholder="Enter zip code"
                variant="outlined"
                fullWidth
            />
        </Stack>
    );
}

// AdoptionCenterFilterStack Component
export default function AdoptionCenterFilterStack() {
    const [nameFltr, setNameFltr] = useState('');
    const [addressFltr, setAddressFltr] = useState('');
    const [zipCodeFltr, setZipCodeFltr] = useState('');
    const [adoptionCenters, setAdoptionCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchAdoptionCenters = async () => {
            try {
                console.log("Fetching adoption centers from:", `${apiBaseUrl}/api/adoptioncenters`); // Log API URL
                const response = await fetch(`${apiBaseUrl}/api/adoptioncenters`);
                console.log("Response status:", response.status); // Log response status
                if (!response.ok) throw new Error('Failed to fetch adoption centers');
                const data = await response.json();
                console.log("Fetched adoption centers:", data); // Log fetched data
                setAdoptionCenters(data);
            } catch (err) {
                console.error("Error fetching adoption centers:", err.message); // Log error
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdoptionCenters();
    }, [apiBaseUrl]);


    // Event handlers for filters
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

    const handleZipCodeChange = (event) => {
        const value = event.target.value;
        console.log("Zip Code filter changed to:", value); // Log zip code filter change
        setZipCodeFltr(value);
    };

    // Filter logic
    const filteredCenters = adoptionCenters.filter((center) => {
        const matchesName = !nameFltr || center.name?.toLowerCase().includes(nameFltr.toLowerCase());
        const matchesAddress = !addressFltr || center.address?.toLowerCase().includes(addressFltr.toLowerCase());
        const matchesZip = !zipCodeFltr || center.zipCode?.includes(zipCodeFltr);

        console.log(`Center: ${center.name}, Matches Name: ${matchesName}, Matches Address: ${matchesAddress}, Matches Zip: ${matchesZip}`);
        return matchesName && matchesAddress && matchesZip;
    });

    console.log("Filtered centers:", filteredCenters); // Log filtered results

    return (
        <main>
            <Stack spacing={6}>
                {/* Navigation Bar */}
                <NavBar />

                <Stack direction="row" spacing={3}>
                    {/* Filter Panel */}
                    <FilterStack
                        nameFltr={nameFltr}
                        addressFltr={addressFltr}
                        zipCodeFltr={zipCodeFltr}
                        onNameChange={handleNameChange}
                        onAddressChange={handleAddressChange}
                        onZipCodeChange={handleZipCodeChange}
                    />

                    {/* Adoption Centers List */}
                    <Grid
                        container
                        spacing={2}
                        sx={{ flex: 1 }}
                        alignItems="flex-start"
                    >
                        {loading ? (
                            <Typography>Loading...</Typography>
                        ) : error ? (
                            <Typography color="error">Error: {error}</Typography>
                        ) : filteredCenters.length > 0 ? (
                            filteredCenters.map((center) => (
                                <Grid item xs={12} sm={6} md={4} key={center.id}>
                                    <AdoptionCenterCard adoptionCenter={center} />
                                </Grid>
                            ))
                        ) : (
                            <Typography>No adoption centers found</Typography>
                        )}
                    </Grid>
                </Stack>
            </Stack>
        </main>
    );
}
