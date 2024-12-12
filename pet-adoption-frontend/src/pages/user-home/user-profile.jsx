import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Grid, Typography, Container, Box } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import NavBar from '@/components/nav-bar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import axios from 'axios';
import PetCard from '@/components/pet-card';
import ProtectedUserRoute from '@/components/protected-user-route';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UserProfile() {
  const user = useAuthUser();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [likedPets, setLikedPets] = useState([]);

  // Fetch user data
  useEffect(() => {
    if (user) {
      axios.get(`${apiBaseUrl}/api/users/${user.id}`)
        .then(response => {
          const data = response.data;
          setFirstName(data.firstName || '');
          setLastName(data.lastName || '');
          setEmail(data.email || '');
          setPhone(data.phone || '');
          setBio(data.bio || '');
          setImgUrl(data.imgUrl || '');
        })
        .catch(error => console.error("Error fetching user data:", error));
    }
  }, [user]);

  // Fetch liked pets
  useEffect(() => {
    if (user) {
      axios.get(`${apiBaseUrl}/api/matches`, {
        params: { userID: user.id }
      })
      .then(response => {
        setLikedPets(response.data);
      })
      .catch(error => console.error("Error fetching liked pets:", error));
    }
  }, [user]);

  return (
    <ProtectedUserRoute>
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <main>
        <NavBar />
        <Container maxWidth="lg" sx={{ marginTop: '64px' }}>
          {/* Profile Info Section */}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 1, boxShadow: 1 }}>
                <Grid container spacing={2} alignItems="center">
                  {/* Profile Picture */}
                  <Grid item>
                    <Avatar
                      alt={firstName}
                      src={imgUrl || ''}
                      sx={{ width: 120, height: 120 }}
                    >
                      {!imgUrl && <AccountCircleIcon sx={{ fontSize: 150 }} />}
                    </Avatar>
                  </Grid>

                  {/* Profile Info */}
                  <Grid item xs>
                    <Typography variant="h5">{`${firstName} ${lastName}`}</Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      {bio || 'No bio available.'}
                    </Typography>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <EmailIcon fontSize="small" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Email:</strong> {email}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <PhoneIcon fontSize="small" />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Phone:</strong> {phone}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          {/* Liked Pets Section */}
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Pets You've Liked
            </Typography>
            <Grid container spacing={2}>
              {likedPets.map((pet) => (
                <Grid item key={pet.petID} xs={12} sm={6} md={4}>
                  <PetCard pet={pet} user={user} liked={true} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </main>
    </>
    </ProtectedUserRoute>
  );
}
