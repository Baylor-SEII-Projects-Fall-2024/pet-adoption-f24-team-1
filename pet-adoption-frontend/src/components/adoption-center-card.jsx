import React from 'react';
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box, alpha, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AdoptionCenterCard(props) {
    const theme = useTheme();
    const router = useRouter();

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    const [adoptionCenter, setAdoptionCenter] = useState(null);

    useEffect(() => {
        // Fetch the adoption center details using the ID or props provided.
        axios.get(`${apiBaseUrl}/adoption-centers/${props.adoptionCenterId}`)
            .then(response => setAdoptionCenter(response.data))
            .catch(err => console.error(err));
    }, [props.adoptionCenterId]);

    return (
        <Box>
            <Paper sx={{ width: 300, marginBottom: 10 }} elevation={3}>
                <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>
                    {/* Adoption Center Name */}
                    <Typography variant="h6" marginTop={2}>
                        {adoptionCenter ? adoptionCenter.centerName : 'Adoption Center Name'}
                    </Typography>

                    {/* Address */}
                    <Typography variant="body2" marginBottom={2} textAlign="center">
                        {adoptionCenter ? adoptionCenter.centerAddress : 'Adoption Center Address'}
                    </Typography>

                    {/* Button to Homepage */}
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push(adoptionCenter ? adoptionCenter.centerWebsite : '/')}
                        sx={{ marginBottom: 2 }}
                    >
                        Visit Homepage
                    </Button>
                </Grid>
            </Paper>
        </Box>
    );
}
