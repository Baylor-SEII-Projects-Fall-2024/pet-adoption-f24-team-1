import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Button, Grid, Typography, Container, Box, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import NavBar from '@/components/nav-bar';
import Sidebar from '@/components/Sidebar';
import axios from 'axios';

export default function UserProfile() {
  // State variables for editing
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('Beetle Juice');
  const [bio, setBio] = useState('Just looking for a cuppa pets');
  const [email, setEmail] = useState('beetlejuice@Gmail.com');
  const [phone, setPhone] = useState('702-684-2621');
  const [location, setLocation] = useState('Las Vegas 1028 Hall Street');
  const [instagram, setInstagram] = useState('beets.juice');

  // Fetch user profile data when component mounts
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/user');
        const userData = response.data;
        setName(userData.name || 'Beetle Juice');
        setBio(userData.bio || 'Just looking for a cuppa pets');
        setEmail(userData.email || 'beetlejuice@Gmail.com');
        setPhone(userData.phone || '702-684-2621');
        setLocation(userData.location || 'Las Vegas 1028 Hall Street');
        // probably don't need instagram
        setInstagram(userData.instagram || 'beets.juice');
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserProfile();
  }, []);

  // Toggle between editing and viewing modes
  const handleEditProfile = () => setIsEditing(true);
  const handleSaveProfile = async () => {
    try {
      await axios.put('/api/update-profile', { name, bio, email, phone, location, instagram });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const handleCancelEdit = () => setIsEditing(false);

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>
      <main>
        <NavBar />
        <Container maxWidth="lg" sx={{ display: 'flex', marginTop: '64px' }}>
          <Grid container spacing={2}>
            {/* Sidebar */}
            <Grid item xs={3}>
              <Sidebar />
            </Grid>

            {/* Main Content */}
            <Grid item xs={9}>
              <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 1, boxShadow: 1, position: 'relative' }}>
                <Grid container spacing={2} alignItems="center">
                  {/* Profile Picture */}
                  <Grid item>
                    <Avatar
                      alt="User Profile Picture"
                      src="/profile-picture.jpg"
                      sx={{ width: 120, height: 120 }}
                    />
                  </Grid>

                  {/* Profile Info */}
                  <Grid item xs>
                    {isEditing ? (
                      <>
                        <TextField 
                          label="Name" 
                          value={name} 
                          onChange={(e) => setName(e.target.value)} 
                          fullWidth 
                          sx={{ marginBottom: 1 }}
                        />
                        <TextField 
                          label="Bio" 
                          value={bio} 
                          onChange={(e) => setBio(e.target.value)} 
                          fullWidth 
                          multiline 
                          rows={4}
                          sx={{ marginBottom: 1 }}
                        />
                        <TextField 
                          label="Email" 
                          value={email} 
                          onChange={(e) => setEmail(e.target.value)} 
                          fullWidth 
                          sx={{ marginBottom: 1 }}
                        />
                        <TextField 
                          label="Phone" 
                          value={phone} 
                          onChange={(e) => setPhone(e.target.value)} 
                          fullWidth 
                          sx={{ marginBottom: 1 }}
                        />
                        <TextField 
                          label="Location" 
                          value={location} 
                          onChange={(e) => setLocation(e.target.value)} 
                          fullWidth 
                          sx={{ marginBottom: 1 }}
                        />
                        <TextField 
                          label="Instagram" 
                          value={instagram} 
                          onChange={(e) => setInstagram(e.target.value)} 
                          fullWidth 
                          sx={{ marginBottom: 1 }}
                        />
                      </>
                    ) : (
                      <>
                        <Typography variant="h5">{name}</Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                          {bio}
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

                          <Grid item>
                            <LocationOnIcon fontSize="small" />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Location:</strong> {location}
                            </Typography>
                          </Grid>

                          <Grid item>
                            <InstagramIcon fontSize="small" />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="text.secondary">
                              <strong>Instagram:</strong> @{instagram}
                            </Typography>
                          </Grid>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </Grid>

                {/* Edit and Save/Cancel Buttons */}
                {isEditing ? (
                  <Box sx={{ marginTop: 2, textAlign: 'right' }}>
                    <IconButton onClick={handleSaveProfile} color="primary" sx={{ marginRight: 1 }}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancelEdit} color="secondary">
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Button 
                    variant="outlined" 
                    startIcon={<EditIcon />} 
                    color="primary" 
                    sx={{ position: 'absolute', top: 16, right: 16 }} 
                    onClick={handleEditProfile}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    </>
  );
}