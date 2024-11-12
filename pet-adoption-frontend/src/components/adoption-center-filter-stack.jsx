import * as React from 'react';
import {
    Stack,
    Typography,
    TextField,
    Grid,
    Box,
    Paper
} from '@mui/material';
import { useState, useEffect } from 'react';
import NavBar from "@/components/nav-bar";
import AdoptionCenterCard from "@/components/adoption-center-card"; // Assuming you have a component for displaying adoption centers

// Custom FilterStack for Adoption Centers
function FilterStack({ nameFltr, addressFltr, zipCodeFltr, onNameChange, onAddressChange, onZipCodeChange }) {
    return (
        <Stack sx={{ width: 300, position: 'sticky', marginLeft: 3, marginRight: 3 }} spacing={5}>
            <Stack sx={{ boxShadow: '0 2px 2px -2px gray' }}>
                <Typography fontSize={19}>Filters</Typography>
            </Stack>

            <Stack spacing={2}>
                <Typography>Name</Typography>
                <TextField
                    value={nameFltr}
                    onChange={onNameChange}
                    placeholder="Enter adoption center name"
                    variant="outlined"
                    fullWidth
                />
                <Typography>Address</Typography>
                <TextField
                    value={addressFltr}
                    onChange={onAddressChange}
                    placeholder="Enter adoption center address"
                    variant="outlined"
                    fullWidth
                />
                <Typography>Zip Code</Typography>
                <TextField
                    type="number"
                    value={zipCodeFltr}
                    onChange={onZipCodeChange}
                    placeholder="Enter zip code"
                    variant="outlined"
                    fullWidth
                />
            </Stack>
        </Stack>
    );
}

export default function AdoptionCenterFilterStack(props) {
    // Initialize state with empty strings for name and address filters, and 'Any' for zip code if preferred
    const [nameFltr, setNameFltr] = useState('');
    const [addressFltr, setAddressFltr] = useState('');
    const [zipCodeFltr, setZipCodeFltr] = useState('');
    const [adoptionCenters, setAdoptionCenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch adoption centers from API
    useEffect(() => {
        const fetchAdoptionCenters = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/adoptioncenters');
                if (!response.ok) {
                    throw new Error('Failed to fetch adoption centers');
                }
                const data = await response.json();
                console.log(data); // Log the data to inspect the structure
                setAdoptionCenters(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdoptionCenters();
    }, []);
    // Empty dependency array to run once on component mount

    // Handle changes for each filter input
    const handleNameChange = (event) => {
        setNameFltr(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddressFltr(event.target.value);
    };

    const handleZipCodeChange = (event) => {
        setZipCodeFltr(event.target.value);
    };

    // Filter function to apply filters to the adoption centers list (partial match)
    const filters = (adoptionCenter) => {
        return (
            (nameFltr === '' || adoptionCenter.name.toLowerCase().includes(nameFltr.toLowerCase())) &&
            (addressFltr === '' || adoptionCenter.address.toLowerCase().includes(addressFltr.toLowerCase())) &&
            (zipCodeFltr === '' || adoptionCenter.zipCode.includes(zipCodeFltr))
        );
    };

    // Check if any filter field is non-empty
    const hasValidFilters = nameFltr || addressFltr || zipCodeFltr;

    return (
        <main>
            <Stack spacing={10}>
                <NavBar />

                <Stack direction="row">
                    {/* Adoption Center Filters */}
                    <FilterStack
                        nameFltr={nameFltr}
                        addressFltr={addressFltr}
                        zipCodeFltr={zipCodeFltr}
                        onNameChange={handleNameChange}
                        onAddressChange={handleAddressChange}
                        onZipCodeChange={handleZipCodeChange}
                    />

                    {/* Only render the filtered adoption center cards if the user has entered valid data */}
                    {loading && <Typography>Loading...</Typography>}
                    {error && <Typography>Error: {error}</Typography>}
                    {!loading && !error && (
                        <Grid container direction="row" display="flex" alignItems="center" justifyContent="left" rowGap={2} spacing={2}>
                            {adoptionCenters.filter(filters).map((center) => (
                                <Grid item key={center.id}>
                                    <AdoptionCenterCard adoptionCenter={center} />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Stack>
            </Stack>
        </main>
    );
}