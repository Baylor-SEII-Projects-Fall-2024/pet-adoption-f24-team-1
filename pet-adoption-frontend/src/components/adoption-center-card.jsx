import React from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box, alpha, useTheme, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { useState } from'react';
import PetInfoModal from '@/components/pet-info-modal';
import LoginModal from './login-modal';
import axios from 'axios';

export default function AdoptionCenterCard(props) {

    return (
        <Box>
            <Paper sx={{ width: 250, marginBottom: 10 }} elevation={3}>
                <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>

                    <Box component="img" sx={{ width: 250, height: 120, objectFit: "cover"}} src={props.pet.imgUrl} alt="pet image"/>

                    <Box sx={{ width: 240, position: "absolute", display: "flex", marginTop: -9 }} justifyContent="flex-start">
                        <IconButton color="primary" size="small" onClick={handleLikedPet}>
                            {liked ? <FavoriteIcon sx={{ color: red[500] }} /> : <FavoriteBorderIcon sx={{ color: red[500] }} color="red"/>}
                        </IconButton>
                    </Box>

                    <Stack direction="column" alignItems="center" >
                        <Typography variant="h6" marginBottom={2}>{props.pet.petName}</Typography>
                        <Stack direction="row" alignItems="center" spacing={1} marginLeft={-3}>
                            <LocationOnIcon fontSize="11px" sx={{ color: theme.palette.primary.light }}/>
                            <Typography variant="body2">{props.location.adoptionCenter}</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={1} >

                            <Typography fontSize="11px">{props.location.address}</Typography>
                        </Stack>
                    </Stack>

                    <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>
                        <Stack direction={{ xs: 'column', sm: 'row'}} spacing={2}>
                            <Stack justifyContent="space-between" direction="row" spacing={1} alignItems="center" sx={{width: 105}}>
                                <Typography variant="body2" align="left">Gender:</Typography>
                                <Box sx={{ borderRadius: 1, height: "110%", width: "110%", bgcolor: alpha(theme.palette.primary.light, 0.30), display: "flex" }} alignItems="center" align="right" justifyContent="center">
                                    <Typography variant="caption" align="center" color={theme.palette.primary.dark}>{props.pet.petGender}</Typography>
                                </Box>
                            </Stack>
                            <Stack justifyContent="space-between" direction="row" spacing={1} alignItems="center" sx={{width: 105}}>
                                <Typography variant="body2" align="left">Age:</Typography>
                                <Box sx={{ borderRadius: 1, height: "110%", width: "110%", bgcolor: alpha(theme.palette.primary.light, 0.30), display: "flex" }} alignItems="center" align="right" justifyContent="center">
                                    <Typography variant="caption" align="center" color={theme.palette.primary.dark}>{props.pet.petAge} years</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Stack justifyContent="space-between" direction="row" spacing={1} alignItems="center" sx={{width: 105}}>
                                <Typography variant="body2" align="left">Breed:</Typography>
                                <Box sx={{ borderRadius: 1, height: "110%", width: "110%", bgcolor: alpha(theme.palette.primary.light, 0.30), display: "flex", wordWrap: "break-word" }} alignItems="center" align="right" justifyContent="center">
                                    <Typography fontSize="10px" align="center" color={theme.palette.primary.dark}>{breed}</Typography>
                                </Box>
                            </Stack>
                            <Stack justifyContent="space-between" direction="row" spacing={1} alignItems="center" sx={{width: 105}}>
                                <Typography variant="body2" align="left">Weight:</Typography>
                                <Box sx={{ borderRadius: 1, height: "110%", width: "110%", bgcolor: alpha(theme.palette.primary.light, 0.30), display: "flex" }} alignItems="center" align="right" justifyContent="center">
                                    <Typography variant="caption" align="center" color={theme.palette.primary.dark}>{props.pet.petWeight} kg</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </Grid>

                    <Box sx={{ width: 200, height: 50 }}>
                        <Button onClick={handleOpen} sx={{ width: 200 }}variant="outlined" color="primary">Pet Info</Button>
                    </Box>
                </Grid>
            </Paper>

            <PetInfoModal open={open} handleClose={handleClose} pet={props.pet} />

            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

        </Box>


    );

}