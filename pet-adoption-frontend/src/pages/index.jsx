import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Box, Card, CardContent, Stack, Typography, Grid } from '@mui/material'

import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';

import NavBar from '@/components/nav-bar';
import PetCard from '@/components/pet-card';
import axios from 'axios';
import { width } from '@mui/system';
import Footer from '@/components/footer';
import PreFooterSection from '@/components/pre-footer-section';

export default function HomePage() {
  const [pets, setPets] = useState(null);
  const router = useRouter();

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const petDisplayNum = 4;

  const navigateTo = (page) => {
    router.push(page);
  }

  useEffect(() => {
    // Fetch pets
    axios.get(`${apiBaseUrl}/api/pets?limit=${petDisplayNum}`)
      .then(response => {
          let pets = response.data.map(pet => {return {...pet, distance: 0}})
          console.log(pets)
          setPets(pets);
        })
      .catch(error => {
          console.error('Error fetching pets:', error);
        });
  }, [])

  return (
    <>
      <Head>
        <title>Fluffy Friends</title>
      </Head>

      <main>
        <NavBar />

        <Box sx={{ padding: "2rem" }}>
          {/* Hero Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
              flexWrap: "wrap",
              padding: "2rem",
              marginBottom: "4rem",
              height: "95vh"
            }}
          >
            <Box sx={{ maxWidth: "50%" }}>
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                Give a New Life to
              </Typography>
              <Typography
                variant="h4"
                color="primary"
                sx={{ fontWeight: "bold", marginBottom: "1rem" }}
              >
                Fluffy Friends
              </Typography>
              <Typography sx={{ marginBottom: "2rem", maxWidth: {md: "60%"} }}>
                Adopting a pet not only provides a loving home for an animal in need,
                but it also brings companionship and joy to your life.
                Every adoption helps reduce the number of animals in shelters,
                giving them a second chance at happiness.
              </Typography>
              <Button variant="contained" color="primary"
                sx={{ marginRight: "1rem" }}
                onClick={() => navigateTo('/user-home/')}
              >
                Adopt Now
              </Button>
              <Button variant="outlined" color="primary"
                onClick={() => navigateTo('/adoption-center-search')}
              >
                Find Adoption centers
              </Button>
            </Box>
            <Box
              sx={{
                borderRadius: "50%",
                width: "400px",
                height: "400px",
                background: (theme) => theme.palette.primary.main,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/pets.png"
                alt="Furry Friends"
                style={{ width: "80%", height: "auto" }}
              />
            </Box>
          </Box>

          {/* Pet Cards */}
          <Box
            sx={{
              marginBottom: "4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh"
            }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", textAlign: "center", marginBottom: "2rem" }}
            >
              Take a Look at Some of <span style={{ color: "green" }}>Our Pets</span>
            </Typography>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "20px",
                width: "80vw",
              }}>
              {pets?.map((pet, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <PetCard key={pet.petID} pet={pet} user={null} liked={false} location={location} />
              </Grid>
              ))}
            </Grid>
            <Box sx={{ textAlign: "center" }}>
              <Button variant="outlined" color="primary" onClick={() => navigateTo("/user-home")}>
                See more
              </Button>
            </Box>
          </Box>

          {/* Steps */}
          <Box
            sx={{
              marginBottom: "4rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Adopt a Pet in Just
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "green", marginBottom: "2rem" }}
            >
              3 Easy Steps
            </Typography>
            <Grid container spacing={4} sx={{ width: "60vw" }}>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                    1
                  </Typography>
                  <GroupAddOutlinedIcon sx={{ width: "80px", height: "auto" }}/>
                  <Typography>
                    Set up your profile in minutes.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                    2
                  </Typography>
                  <PetsOutlinedIcon sx={{ width: "80px", height: "auto" }}/>
                  <Typography>
                    Describe your pet preferences.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box
                  sx={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "2rem",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
                    3
                  </Typography>
                  <ContentPasteSearchOutlinedIcon sx={{ width: "80px", height: "auto" }}/>
                  <Typography>Start your search!</Typography>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: "center", marginTop: "4rem" }}>
              <Button variant="outlined" color="primary" onClick={() => navigateTo('/create-account')}>
                Start Today!
              </Button>
            </Box>
          </Box>
        </Box>

        <PreFooterSection />
        <Footer />
      </main>
    </>
  );
}