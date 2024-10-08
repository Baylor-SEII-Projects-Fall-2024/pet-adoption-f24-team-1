import React from 'react';
import Head from 'next/head';
import { Button, Card, CardContent, Stack, Typography, Grid, TextField, Container, Link, Paper, Box, alpha, useTheme, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { useState } from'react';

export default function PetCard(props) {
  const [liked, setLiked] = useState(false);

  const theme = useTheme();
  const breed = props.breed.length < 11 ? props.breed : props.breed.substring(0, 8) + '...';

  const handleLikedPet = () => {
    
    if(!liked)  {
      setLiked(true);
      console.log('liked animal: ' + props.id);
    }
    else  {
      setLiked(false);
      console.log('unliked animal: ' + props.id);
    }
}

  
  return (
    <Paper sx={{ width: 250, marginBottom: 10 }} elevation={3}>
      <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>

        <Box component="img" sx={{ width: 250, height: 120, objectFit: "cover"}} src={props.imgSrc} alt="pet image"/>
          
        <Box sx={{ width: 240, position: "absolute", display: "flex", marginTop: -5 }} justifyContent="flex-start">
          <IconButton color="primary" size="small" onClick={handleLikedPet}>
            {liked ? <FavoriteIcon sx={{ color: red[500] }} /> : <FavoriteBorderIcon sx={{ color: red[500] }} color="red"/>}
          </IconButton>
        </Box>

        <Stack direction="column" alignItems="center">
          <Typography variant="h6">{props.name}</Typography>
          <Typography variant="body2">Adoption Center</Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "105%", marginLeft: 0, border: 1, borderRadius: 1, borderColor: theme.palette.primary.dark }}>
            <LocationOnIcon fontSize="11px" sx={{ color: theme.palette.primary.light }}/>
            <Typography variant="caption">{props.location.address}</Typography>
          </Stack>
        </Stack>
        <Grid container direction="column" alignItems="center" justifyContent="center" rowGap={2}>
          <Stack direction={{ xs: 'column', sm: 'row'}} spacing={2}>
            <Stack justifyContent="space-between" direction="row" spacing={1} alignItems="center" sx={{width: 105}}>
              <Typography variant="body2" align="left">Gender:</Typography>
              <Box sx={{ borderRadius: 1, height: "110%", width: "110%", bgcolor: alpha(theme.palette.primary.light, 0.30), display: "flex" }} alignItems="center" align="right" justifyContent="center">
                <Typography variant="caption" align="center" color={theme.palette.primary.dark}>{props.gender}</Typography>
              </Box>
            </Stack>
            <Stack justifyContent="space-between" direction="row" spacing={1} alignItems="center" sx={{width: 105}}>
              <Typography variant="body2" align="left">Age:</Typography>
              <Box sx={{ borderRadius: 1, height: "110%", width: "110%", bgcolor: alpha(theme.palette.primary.light, 0.30), display: "flex" }} alignItems="center" align="right" justifyContent="center">
                <Typography variant="caption" align="center" color={theme.palette.primary.dark}>{props.age} years</Typography>
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
                <Typography variant="caption" align="center" color={theme.palette.primary.dark}>{props.weight} lbs</Typography>
              </Box>
            </Stack>
          </Stack>
        </Grid>

        <Box sx={{ width: 200, height: 50 }}>
          <Button sx={{ width: 200 }}variant="outlined" color="primary">Pet Info</Button>
        </Box>
      </Grid>
    </Paper>
  );
}