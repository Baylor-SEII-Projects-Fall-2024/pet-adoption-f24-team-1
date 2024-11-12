import React, { useState } from 'react';
import { Button, Grid, Box, Stack, Typography, Paper, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PetInfoModal from '@/components/pet-info-modal';
import LoginModal from './login-modal';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function AdoptionCenterCard({ adoptionCenter, user }) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const theme = useTheme();

    const [liked, setLiked] = useState(false);



    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // Function to navigate to events page
    const navigateTo = (page) => {
        console.log('Navigating to:', page);  // Log the full URL
        router.push(page);
    };

    return (
        <Box>
            <Paper sx={{ width: 250, marginBottom: 10 }} elevation={3}>
                <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>
                    {/* Adoption Center Image */}
                    <Box component="img" sx={{ width: 250, height: 120, objectFit: "cover" }} src={adoptionCenter.centerImageUrl} alt="Adoption center image" />

                    {/* Adoption Center Info */}
                    <Stack direction="column" alignItems="center">
                        <Typography variant="h6" marginBottom={2}>{adoptionCenter.centerName}</Typography>
                        <Stack direction="row" alignItems="center" spacing={1} marginLeft={-3}>
                            <LocationOnIcon fontSize="11px" sx={{ color: theme.palette.primary.light }} />
                            <Typography variant="body2">{adoptionCenter.centerAddress}</Typography>
                        </Stack>
                    </Stack>

                    {/* Action Buttons */}
                    <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button variant="outlined" color="primary" href={adoptionCenter.homepage} target="_blank">
                                Go to Homepage
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => {
                                const eventPageUrl = `/adoption-center-home/adoption-center-events/${adoptionCenter.centerId}`;
                                navigateTo(eventPageUrl);
                            }} sx={{ width: 100 }}>
                                View Events
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </Paper>

            {/* Modals */}
            <PetInfoModal open={open} handleClose={handleClose} pet={adoptionCenter} />
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </Box>
    );
}
