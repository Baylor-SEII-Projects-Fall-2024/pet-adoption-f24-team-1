import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Box, Typography, Grid, TextField, Button, Avatar } from '@mui/material';
import NavBar from '@/components/nav-bar';
import axios from 'axios';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import ImageDropzone from '@/components/image-dropzone';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AdoptionCenterAccount() {
  const user = useAuthUser();

  // ----- Admin Info States -----
  const [adminFirstName, setAdminFirstName] = useState('');
  const [adminLastName, setAdminLastName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');

  // ----- Adoption Center Info States -----
  const [centerName, setCenterName] = useState('');
  const [centerEmail, setCenterEmail] = useState('');
  const [centerPhone, setCenterPhone] = useState('');
  const [centerImgUrl, setCenterImgUrl] = useState('');

  useEffect(() => {
    if (user?.id && user?.role == "ADMIN") {
      // Fetch current admin info
      // Adjust the endpoint as needed
      axios.get(`${apiBaseUrl}/api/admins/${user.id}`)
        .then(response => {
          const adminData = response.data; 
          setAdminFirstName(adminData.firstName || '');
          setAdminLastName(adminData.lastName || '');
          setAdminEmail(adminData.email || '');
        })
        .catch(error => console.error("Error fetching admin info:", error));

      // Fetch current adoption center info
      axios.get(`${apiBaseUrl}/api/admins/center/${user.id}`)
        .then(response => {
          const centerData = response.data;
          setCenterName(centerData.centerName || '');
          setCenterEmail(centerData.centerEmail || '');
          setCenterPhone(centerData.centerPhone || '');
          setCenterImgUrl(centerData.centerImgUrl || '');
        })
        .catch(error => console.error("Error fetching center info:", error));
    }
  }, [user]);

  // ----- Handlers for Submitting Admin Info -----
  const handleSaveAdminInfo = () => {
    // Adjust the payload and endpoint based on your backend
    const payload = {
      id: user.id,
      firstName: adminFirstName,
      lastName: adminLastName,
      email: adminEmail
    };

    axios.put(`${apiBaseUrl}/api/admins/update`, payload)
      .then(response => {
        console.log("Admin info updated:", response.data);
      })
      .catch(error => console.error("Error updating admin info:", error));
  };

  // ----- Handlers for Submitting Adoption Center Info -----
  const handleSaveCenterInfo = () => {
    // Adjust the payload and endpoint based on your backend
    const payload = {
      adminId: user.id,
      centerName,
      centerEmail,
      centerPhone,
      centerImgUrl
    };

    axios.put(`${apiBaseUrl}/api/admins/center/update`, payload)
      .then(response => {
        console.log("Center info updated:", response.data);
      })
      .catch(error => console.error("Error updating center info:", error));
  };

  return (
    <>
      <Head>
        <title>Adoption Center Account</title>
      </Head>
      <main>
        <NavBar />
        <Container maxWidth="md" sx={{ mt: 8 }}>
          {/* Admin Account Section */}
          <Box sx={{ mb: 6, p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Admin Account Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={adminFirstName}
                  onChange={(e) => setAdminFirstName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={adminLastName}
                  onChange={(e) => setAdminLastName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button variant="contained" color="primary" onClick={handleSaveAdminInfo}>
                  Save Admin Info
                </Button>
              </Grid>
            </Grid>
          </Box>

          {/* Adoption Center Section */}
          <Box sx={{ p: 3, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Adoption Center Details
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Center Name"
                  value={centerName}
                  onChange={(e) => setCenterName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Center Email"
                  value={centerEmail}
                  onChange={(e) => setCenterEmail(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Center Phone"
                  value={centerPhone}
                  onChange={(e) => setCenterPhone(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {
                <ImageDropzone setImgUrl={setCenterImgUrl} />
                }
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button variant="contained" color="primary" onClick={handleSaveCenterInfo}>
                  Save Center Info
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </main>
    </>
  );
}
