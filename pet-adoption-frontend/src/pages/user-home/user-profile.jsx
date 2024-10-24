import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Button, Grid, Typography, Container, Box, TextField, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavBar from '@/components/nav-bar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useRouter } from 'next/router';
import axios from 'axios';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UserProfile() {
  const router = useRouter();

  // State variables for editing
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [location, setLocation] = useState();
  const [imgUrl, setProfilePicture] = useState('');
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();

  // Fetch user profile data from sessionStorage when component mounts
  useEffect(() => {
    const userFromSessionStorage = JSON.parse(sessionStorage.getItem('user'));
    if (userFromSessionStorage) {
      setId(userFromSessionStorage.id);
      setName(userFromSessionStorage.name || 'Beetle Juice');
      setBio(userFromSessionStorage.bio || 'Just looking for a cuppa pets');
      setEmail(userFromSessionStorage.email || 'beetlejuice@Gmail.com');
      setPhone(userFromSessionStorage.phone || '702-684-2621');
      setLocation(userFromSessionStorage.location || 'Las Vegas 1028 Hall Street');
      setProfilePicture(userFromSessionStorage.imgUrl || '');
      setPassword(userFromSessionStorage.password); 
      setUserType(userFromSessionStorage.userType);
    }
  }, []);

  // Toggle between editing and viewing modes
  const handleEditProfile = () => setIsEditing(true);
  const handleSaveProfile = async () => {
    try {
      //await axios.put('/api/update-profile', userFromSessionStorage.id);
      await axios.put(`${apiBaseUrl}/api/update-profile`, { id, name, bio, email, phone, location, imgUrl, password, userType });
      sessionStorage.setItem('user', JSON.stringify({ name, bio, email, phone, location }));
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

            {/* Main Content */}
            <Grid item xs={9}>
              <Box sx={{ padding: 2, backgroundColor: '#fff', borderRadius: 1, boxShadow: 1, position: 'relative' }}>
                <Grid container spacing={2} alignItems="center">
                  {/* Profile Picture */}
                  <Grid item>
                    <Avatar
                      alt={name}
                      src={imgUrl || ''}  // Use profilePicture state
                      sx={{ width: 120, height: 120 }}
                    >
                      {!imgUrl && <AccountCircleIcon sx={{ fontSize: 150 }} />} 
                    </Avatar>
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