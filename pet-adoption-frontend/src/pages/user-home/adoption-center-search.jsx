import * as React from 'react';
import {
    Stack,
    Typography,
    TextField,
    Grid
} from '@mui/material';
import { useState, useEffect } from 'react';
<<<<<<< HEAD
import NavBar from "@/components/nav-bar";
import AdoptionCenterCard from "@/components/adoption-center-card";
=======
import { useRouter } from 'next/router'
import axios from 'axios';
import NavBar from '@/components/nav-bar';
import FilterStack from '@/components/adoption-center-filter-stack';
//import PetCard from '@/components/pet-card';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import PetCard from "@/components/pet-card";
import Footer from '@/components/footer';
>>>>>>> 848bca463ff5894f13e9c6cf26691475d3563a80

// FilterStack Component
function FilterStack({ nameFltr, addressFltr, onNameChange, onAddressChange}) {
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

// AdoptionCenterFilterStack Component
export default function AdoptionCenterFilterStack() {
    const [nameFltr, setNameFltr] = useState('');
    const [addressFltr, setAddressFltr] = useState('');
    const [zipCodeFltr, setZipCodeFltr] = useState('');
    const [adoptionCenters, setAdoptionCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    // Fetch adoption centers from API
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


    // Filter logic
    const filteredCenters = adoptionCenters.filter((center) => {
        const matchesName = !nameFltr || center.centerName?.toLowerCase().includes(nameFltr.toLowerCase());
        const matchesAddress = !addressFltr || center.centerAddress?.toLowerCase().includes(addressFltr.toLowerCase());
        const matchesZip = !zipCodeFltr || center.centerZipCode?.toString().includes(zipCodeFltr);  // Assuming there's a zipCode field

        console.log(`Center: ${center.centerName}, Matches Name: ${matchesName}, Matches Address: ${matchesAddress}, Matches Zip: ${matchesZip}`);
        return matchesName && matchesAddress && matchesZip;
    });

    console.log("Filtered centers:", filteredCenters); // Log filtered results

    return (
        <main>
            <Stack spacing={6}>
                {/* Navigation Bar */}
                <NavBar />

                <Stack direction="row" spacing={3} sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                    {/* Filter Panel */}
                    <FilterStack
                        nameFltr={nameFltr}
                        addressFltr={addressFltr}
                        onNameChange={handleNameChange}
                        onAddressChange={handleAddressChange}
                    />

                    {/* Adoption Centers List */}
                    <Grid
                        container
                        spacing={6} // Increased spacing to space out the cards more
                        sx={{
                            flex: 1,
                            justifyContent: 'flex-start', // Aligns the items to the start of the container
                            marginTop: 2, // Optional: adds space above the grid
                            width: '100%', // Ensures the grid takes full width
                        }}
                        alignItems="flex-start"
                    >
                        {loading ? (
                            <Typography>Loading...</Typography>
                        ) : error ? (
                            <Typography color="error">Error: {error}</Typography>
                        ) : filteredCenters.length > 0 ? (
                            filteredCenters.map((center) => (
                                <Grid item xs={12} sm={6} md={4} key={center.centerId}> {/* Ensures unique keys */}
                                    <AdoptionCenterCard adoptionCenter={center} />
                                </Grid>
                            ))
                        ) : (
                            <Typography>No adoption centers found</Typography>
                        )}
                    </Grid>
                </Stack>
<<<<<<< HEAD
            </Stack>
        </main>
=======
                <Footer />
            </main>
        </>
>>>>>>> 848bca463ff5894f13e9c6cf26691475d3563a80
    );
}