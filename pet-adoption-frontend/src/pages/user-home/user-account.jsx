import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Avatar, Grid, Typography, Container, Box, TextField, Button } from '@mui/material';
import NavBar from '@/components/nav-bar';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import ImageDropzone from '@/components/image-dropzone';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UserAccount() {
  const user = useAuthUser();

  // State variables for user data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [bio, setBio] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  // Fetch user data on component mount
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

  // Handle Save
  const handleSave = () => {
    const payload = { firstName, lastName, email, phone, bio, imgUrl };

    axios.put(`${apiBaseUrl}/api/users/${user.id}`, payload)
      .then(response => {
        console.log("User account updated:", response.data);
        alert('Account details updated successfully!');
      })
      .catch(error => {
        console.error("Error updating user account:", error);
        alert('Failed to update account details.');
      });
  };

  return (
    <>
      <Head>
        <title>My Account</title>
      </Head>
      <main>
        <NavBar />
        <Container maxWidth="md" sx={{ mt: 8 }}>
          {/* User Profile Section */}
          <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Update Account
            </Typography>
            <Grid container spacing={2}>
              {/* Profile Picture */}
              <Grid item xs={12} textAlign="center">
                <Avatar
                  alt={firstName}
                  src={imgUrl || ''}
                  sx={{ width: 120, height: 120, margin: '0 auto' }}
                />
                <ImageDropzone setImgUrl={setImgUrl} />
              </Grid>

              {/* Account Details */}
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>

              {/* Save Button */}
              <Grid item xs={12} textAlign="right">
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
    </>
  );
}
