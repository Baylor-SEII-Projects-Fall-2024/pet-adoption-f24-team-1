import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import NavBar from "@/components/nav-bar";

export default function PetAdoptionForm() {
    const [fullName, setFullName] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [address, setAddress] = useState("");
    const [cityStateZip, setCityStateZip] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [employer, setEmployer] = useState("");
    const [jobTime, setJobTime] = useState("");

    const [message, setMessage] = useState("");  // State to store success/error message
    const [isSubmitted, setIsSubmitted] = useState(false);  // State to track submission

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            fullName,
            licenseNumber,
            address,
            cityStateZip,
            phoneNumber,
            email,
            employer,
            jobTime
        };

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
        console.log(formData);
        axios.post(`${apiBaseUrl}/api/pet-adoption-forms`, formData)
            .then(response => {
                setMessage("Form submitted successfully!");
                setIsSubmitted(true);
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    setMessage(`Error: ${error.response.data}`);
                } else if (error.request) {
                    // The request was made but no response was received
                    setMessage("No response from server.");
                } else {
                    // Something happened in setting up the request that triggered an error
                    setMessage("There was an error submitting the form. Please try again.");
                }
                setIsSubmitted(true);
            });
    };

    return (
        <>
            <Head>
                <title>Pet Adoption Form</title>
            </Head>

            <main>
                <Stack spacing={10}>
                <NavBar />
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <Stack sx={{ paddingTop: 4 }} alignItems="center" gap={2}>
                            <Typography variant="h4">Pet Adoption Form</Typography>
                        </Stack>

                        <Grid container spacing={4} sx={{ my: 1 }}>
                            <Grid item xs={12}>
                                <TextField
                                    id="fullName"
                                    placeholder="Enter your full name"
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="licenseNumber"
                                    placeholder="Enter your license number"
                                    label="License Number"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setLicenseNumber(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="address"
                                    placeholder="Enter your address"
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="cityStateZip"
                                    placeholder="Enter your city, state, and ZIP code"
                                    label="City, State, ZIP"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setCityStateZip(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="phoneNumber"
                                    placeholder="Enter your phone number"
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="email"
                                    placeholder="Enter your email address"
                                    label="Email Address"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="employer"
                                    placeholder="Enter your employer"
                                    label="Employer"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setEmployer(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    id="jobTime"
                                    placeholder="How long have you been at this job?"
                                    label="Job Duration"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    onChange={(e) => setJobTime(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                    Submit Form
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                ) : (
                    <Stack sx={{ paddingTop: 4 }} alignItems="center" gap={2}>
                        <Image
                            src="/checkmark.png"
                            alt="Success"
                            width={100}
                            height={100}
                            />
                        <Typography variant="h4">Thank You!</Typography>
                        <Typography variant="body1">Your pet adoption form has been successfully submitted.</Typography>
                    </Stack>
                )}
                </Stack>
            </main>
        </>
    );
}
