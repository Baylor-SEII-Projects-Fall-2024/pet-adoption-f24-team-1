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

export default function PetCard(props) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const { toggleTheme, isDarkMode } = useThemeCust();

  const [liked, setLiked] = useState(props.liked);
  const [open, setOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [adoptionCenter, setAdoptionCenter] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => console.log(setOpen(false));

  const theme = useTheme();
  const breed = props.pet.petBreed.length < 11 ? props.pet.petBreed : props.pet.petBreed.substring(0, 8) + '...';

  // Login
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };
  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleLikedPet = () => {
    
    if(!liked)  {
      if(props.user)  {
        axios.post(`${apiBaseUrl}/api/matches`, {
          petID: props.pet.petID,
          userID: props.user.id
        })
        .then(() => {
          setLiked(true);
        })
        .catch(error => {
          console.error('Error adding match:', error);
        });
      }
      else  {
        openLoginModal();
      }
    }
    else  {
      axios.delete(`${apiBaseUrl}/api/matches`, {
        data: {
          petID: props.pet.petID,
          userID: props.user.id
        }
      })
      .then(() => {
        setLiked(false);
      })
      .catch(error => {
        console.error('Error deleting match:', error);
      });
    }
  }

  useEffect(() => {
    axios.get(`${apiBaseUrl}/api/adoptioncenters/${props.pet.centerID}`)
      .then(response => {
          setAdoptionCenter(response.data)
        })
      .catch(error => {
          console.error('Error fetching pets:', error);
        });
  },[])
  
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

      <PetInfoModal open={open} handleClose={handleClose} pet={props.pet} />

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

    </Box>

    
  );
}