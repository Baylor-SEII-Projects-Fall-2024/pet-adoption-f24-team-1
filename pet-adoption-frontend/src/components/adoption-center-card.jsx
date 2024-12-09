import React, { useState, useEffect } from 'react';
import { Button, Grid, Paper, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function AdoptionCenterCard({ adoptionCenterId }) {
    const [adoptionCenter, setAdoptionCenter] = useState(null);
    const router = useRouter();

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        // Fetch the adoption center details using the ID provided
        axios
            .get(`${apiBaseUrl}/api/adoption-center/${adoptionCenterId}`)
            .then((response) => setAdoptionCenter(response.data))
            .catch((err) => console.error(err));
    }, [adoptionCenterId]);

    if (!adoptionCenter) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box>
            <Paper sx={{ width: 300, marginBottom: 10 }} elevation={3}>
                <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>
                    {/* Adoption Center Name */}
                    <Typography variant="h6" marginTop={2}>
                        {adoptionCenter.centerName}
                    </Typography>

                    {/* Address */}
                    <Typography variant="body2" marginBottom={2} textAlign="center">
                        {adoptionCenter.centerAddress}
                    </Typography>

                    {/* Button to Homepage */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push(adoptionCenter.centerWebsite)}
                        sx={{ marginBottom: 2 }}
                    >
                        Visit Homepage
                    </Button>
                </Grid>
            </Paper>
        </Box>
    );
}
