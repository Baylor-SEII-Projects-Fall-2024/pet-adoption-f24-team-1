import React from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box, alpha, useTheme, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { useState, useEffect } from'react';
import PetInfoModal from '@/components/pet-info-modal';
import LoginModal from './login-modal';
import axios from 'axios';
import { useThemeCust } from '@/utils/ThemeContext';

export default function AdoptionCenterCard(props) {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    const { toggleTheme, isDarkMode } = useThemeCust();

    const [adoptionCenter, setAdoptionCenter] = useState(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => console.log(setOpen(false));


    return (
        <Box>
            <Paper sx={{ width: 250, marginBottom: 10 }} elevation={3}>
                <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>


                    <Stack direction="column" alignItems="center" >
                        <Typography variant="h6" marginBottom={2}>{props.pet.petName}</Typography>
                        <Stack direction="row" alignItems="center" spacing={1} marginLeft={-3}>
                            <LocationOnIcon fontSize="11px" sx={{ color: theme.palette.primary.light }}/>
                            <Typography variant="body2">{adoptionCenter ? adoptionCenter.centerName : 'Home Free'}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1} >

                            <Link fontSize="11px" href={`https://www.google.com/maps/place/${adoptionCenter ? adoptionCenter.centerAddress : '1311 S 5th St, Waco, TX 76706'}`} target="_blank" rel="noopener noreferrer" sx={{ color: !isDarkMode ? theme.palette.primary.dark : 'white' }}>{adoptionCenter ? adoptionCenter.centerAddress : '1311 S 5th St, Waco, TX 76706'}</Link>
                        </Stack>
                    </Stack>

                    <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>
                        <Stack direction={{ xs: 'column', sm: 'row'}} spacing={2}>
                            <Stack justifyContent="space-between" direction="row" spacing={1} alignItems="center" sx={{width: 105}}>
                                <Typography variant="body2" align="left">Gender:</Typography>
                                <Box sx={{ borderRadius: 1, height: "110%", width: "110%", bgcolor: "white"}}>
                                    <Box sx={{ borderRadius: 1, height: "100%", width: "100%", bgcolor: alpha(theme.palette.primary.light, 0.30), display: "flex" }} alignItems="center" align="right" justifyContent="center">
                                        <Typography variant="caption" align="center" color={theme.palette.primary.dark}>{props.pet.petGender}</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                            <Stack justifyContent="space-between" direction="row" spacing={1} alignItems="center" sx={{width: 105}}>
                                <Typography variant="body2" align="left">Age:</Typography>
                                <Box sx={{ borderRadius: 1, height: "110%", width: "110%", bgcolor: "white"}}>
                                    <Box sx={{ borderRadius: 1, height: "100%", width: "100%", bgcolor: alpha(theme.palette.primary.light, 0.30), display: "flex" }} alignItems="center" align="right" justifyContent="center">
                                        <Typography variant="caption" align="center" color={theme.palette.primary.dark}>{props.pet.petAge} years</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Stack justifyContent="space-between" direction="row" spacing={1} alignItems="center" sx={{width: 105}}>
                                <Typography variant="body2" align="left">Breed:</Typography>
                                <Box sx={{ borderRadius: 1, height: "110%", width: "110%", bgcolor: "white"}}>
                                    <Box sx={{ borderRadius: 1, height: "100%", width: "100%", bgcolor: alpha(theme.palette.primary.light, 0.30), display: "flex", wordWrap: "break-word" }} alignItems="center" align="right" justifyContent="center">
                                        <Typography fontSize="10px" align="center" color={theme.palette.primary.dark}>{breed}</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                            <Stack justifyContent="space-between" direction="row" spacing={1} alignItems="center" sx={{width: 105}}>
                                <Typography variant="body2" align="left">Weight:</Typography>
                                <Box sx={{ borderRadius: 1, height: "110%", width: "110%", bgcolor: "white"}}>
                                    <Box sx={{ borderRadius: 1, height: "100%", width: "100%", bgcolor: alpha(theme.palette.primary.light, 0.30), display: "flex" }} alignItems="center" align="right" justifyContent="center">
                                        <Typography variant="caption" align="center" color={theme.palette.primary.dark}>{props.pet.petWeight} kg</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Stack sx={{ width: 230, height: 50 }} direction="column" alignItems="center">

                        <Button onClick={handleOpen} sx={{ width: 220, bgcolor: alpha(theme.palette.primary.light, 0.05), color: isDarkMode ? theme.palette.primary.light : theme.palette.primary.main }}variant="outlined">Pet Info</Button>

                    </Stack>
                </Grid>
            </Paper>


        </Box>


    );
}