import React from 'react';
import { Box, Button, TextField, Typography, Grid, Paper, IconButton, InputAdornment, Collapse, Fade, Input } from '@mui/material';
import { useState, useRef } from "react";
import { useRouter } from 'next/router';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { loginAdmin, registerAdmin } from '@/auth/authentication';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

const AdoptionCenterRegisterPage = () => {
    const router = useRouter();
    const signIn = useSignIn();

    // Adoption Center form use states
    const [isAdoptionCenterFormVisible, setIsAdoptionCenterFormVisible] = useState(true);
    const [isNameFieldVisible, setIsNameFieldVisibile] = useState(true);
    const [isLocationFieldVisible, setIsLocationFieldVisible] = useState(false);
    const [isPhoneFieldVisible, setIsPhoneFieldVisible] = useState(false);
    const [isEmailFieldVisible, setIsEmailFieldVisible] = useState(false);
    const [adoptionCenterName, setAdoptionCenterName] = useState("");
    const [adoptionCenterLocation, setAdoptionCenterLocation] = useState("");
    const [adoptionCenterPhone, setAdoptionCenterPhone] = useState("");
    const [adoptionCenterEmail, setAdoptionCenterEmail] = useState("");
    const [adoptionCenterNameError, setAdoptionCenterNameError] = useState(false);
    const [adoptionCenterLocationError, setAdoptionCenterLocationError] = useState(false);
    const [adoptionCenterPhoneError, setAdoptionCenterPhoneError] = useState(false);
    const [adoptionCenterEmailError, setAdoptionCenterEmailError] = useState(false);

    // Admin form use states
    const [isAdminFormVisible, setIsAdminFormVisible] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Google Maps Autocomplete
    const [country, setCountry] = useState("us");
    const { ref: materialRef } = usePlacesWidget({
        apiKey: process.env.REACT_APP_GOOGLE,
        onPlaceSelected: (place) => {console.log(place)},
        options: {
            componentRestrictions: { country: country },
            fields: ['formatted_address'],
        },
        
    });

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const checkAllFields = () => {
        let fieldsValid = true;
        if (adoptionCenterName === "") {
            setAdoptionCenterNameError(true);
            fieldsValid = false;
        } else {
            setAdoptionCenterNameError(false);
        }
        if (adoptionCenterLocation === "") {
            setAdoptionCenterLocationError(true);
            fieldsValid = false;
        } else {
            setAdoptionCenterLocationError(false);
        }
        if (adoptionCenterPhone === "") {
            setAdoptionCenterPhoneError(true);
            fieldsValid = false;
        } else {
            setAdoptionCenterPhoneError(false);
        }
        if (adoptionCenterEmail === "") {
            setAdoptionCenterEmailError(true);
            fieldsValid = false;
        } else {
            setAdoptionCenterEmailError(false);
        }
        return fieldsValid;
    }

    const handleNext = () => {
        if (!isLocationFieldVisible) {
            // Check if field is empty
            if (adoptionCenterName === "") {
                setAdoptionCenterNameError(true);
            } else{
                setAdoptionCenterNameError(false);
                setIsLocationFieldVisible(true);
            }
        } else if (!isPhoneFieldVisible) {
            if (adoptionCenterLocation === "") {
                setAdoptionCenterLocationError(true);
            } else {
                setAdoptionCenterLocationError(false);
                setIsPhoneFieldVisible(true);
            }
        } else if (!isEmailFieldVisible) {
            if (adoptionCenterPhone === "") {
                setAdoptionCenterPhoneError(true);
            } else {
                setAdoptionCenterPhoneError(false);
                setIsEmailFieldVisible(true);
            }
        } else {
            if (checkAllFields()) {
                setIsAdoptionCenterFormVisible(false);
                setTimeout(() => {
                    setIsAdminFormVisible(true);
                }, 300)
            }
        }
    };

    const registerAdoptionCenter = async () => {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
    
        try {
            const response = await axios.post(`${apiBaseUrl}/api/adoptioncenters`, {
                centerName: adoptionCenterName,
                centerAddress: adoptionCenterLocation,
                centerPhone: adoptionCenterPhone,
                centerEmail: adoptionCenterEmail,
            });
            alert("Adoption Center Registration successful!");
            console.log(response.data.centerId);
            return response.data.centerId;
        } catch (error) {
            alert("Adoption Center Registration failed: " + error.message);
            return -1;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const centerId = await registerAdoptionCenter();
        console.log(centerId);
        if (centerId !== -1) {
            try {
                const response = await registerAdmin({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    centerId: centerId,
                });
                alert("Registration success!");
                // Login if registered
                try {
                    const result = await loginAdmin(email, password, signIn);
                    router.push("/adoption-center-home");
                } catch (error) {
                    alert("Admin login failed: " + error.message);
                }
            } catch (error) {
                alert("Admin register failed: " + error.message);
            }
        }
      };

    return (
        <>
        <Box sx={{ display: "flex", width: "100%", justifyContent: "start" }}>
            <Button startIcon={<ArrowBackIcon />} size='large' href='/'>Back to Paws&More</Button>
        </Box>
        <Box
        sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5'
        }}
        >
        <Paper
            elevation={3}
            sx={{
            padding: 4,
            width: 600,
            borderRadius: 2,
            textAlign: 'center',
            }}
        >
            {/* Adoption Center form */}
            <Collapse in={isAdoptionCenterFormVisible} timeout={300} unmountOnExit>
                <HomeIcon sx={{ width: "50px", height: "auto" }}/>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Register Adoption Center
                </Typography>

                <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
                    Give your lovely friends new homes to potential pet owners!
                    Let's start by gathering some information about your adoption center.
                </Typography>

                {/* Name field */}
                <Fade direction='up' in={isNameFieldVisible}>
                    <Box>
                        <Typography variant="h6" sx={{ marginY: 1, textAlign: "start" }}>What is your adoption center's name?</Typography>
                        <TextField
                            error={adoptionCenterNameError}
                            label="Adoption Center Name"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                            onChange={(e) => setAdoptionCenterName(e.target.value)}
                        />
                    </Box>
                </Fade>

                {/* Location field */}
                <Collapse in={isLocationFieldVisible}>
                    <Box>
                        <Typography variant="h6" sx={{ marginY: 1, textAlign: "start" }}>Location?</Typography>
                        <TextField
                            error={adoptionCenterLocationError}
                            label="Adoption Center Address"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                            onChange={(e) => setAdoptionCenterLocation(e.target.value)}
                        />
                        {/*
                        <TextField
                            fullWidth
                            color="primary"
                            variant="outlined"
                            required
                            inputRef={materialRef}
                            onChange={(e) => {
                                setAdoptionCenterLocation(e.target.value);
                                console.log(e.target.value);
                            }}
                        />
                        
                        <Input
                            fullWidth
                            color="secondary"
                            inputComponent={({ inputRef, onFocus, onBlur, ...props }) => (
                            <Autocomplete
                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_AUTOFILL_API_KEY}
                                {...props}
                                onPlaceSelected={(selected) => console.log(selected)}
                            />
                            )}
                        />
                        */}
                    </Box>
                </Collapse>

                {/* Phone field */}
                <Collapse in={isPhoneFieldVisible}>
                    <Box>
                        <Typography variant="h6" sx={{ marginY: 1, textAlign: "start" }}>Phone number?</Typography>
                        <TextField
                            error={adoptionCenterPhoneError}
                            label="Adoption Center's phone number"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                            onChange={(e) => setAdoptionCenterPhone(e.target.value)}
                        />
                    </Box>
                </Collapse>

                {/* Email field */}
                <Collapse in={isEmailFieldVisible}>
                    <Box>
                        <Typography variant="h6" sx={{ marginY: 1, textAlign: "start" }}>Email address?</Typography>
                        <TextField
                            error={adoptionCenterEmailError}
                            label="Adoption Center's phone number"
                            variant="outlined"
                            fullWidth
                            required
                            sx={{ marginBottom: 2 }}
                            onChange={(e) => setAdoptionCenterEmail(e.target.value)}
                        />
                    </Box>
                </Collapse>

                <Button variant="contained" onClick={handleNext}>
                    { isEmailFieldVisible ? "Confirm Information" : "Next" }
                </Button>
            </Collapse>

            {/* Admin form */}
            <Collapse in={isAdminFormVisible} timeout={300} unmountOnExit>
            <SupervisorAccountIcon sx={{ width: "50px", height: "auto" }} />
                <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    One Last Step!
                </Typography>

                <Typography variant="subtitle1" sx={{ marginBottom: 3 }}>
                    Now that we have your adoption center information, please fill out
                    the information below to create an admin account for your adoption center.
                </Typography>

                <Typography variant="subtitle1" sx={{ marginY: 2 }}>Note: More admin accounts can be created later</Typography>

                <form onSubmit={handleSubmit}>
                    {/* First Name Input */}
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    {/* Last Name Input */}
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    {/* Email Input */}
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ marginBottom: 2 }}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* Password Input */}
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        fullWidth
                        required
                        sx={{ marginBottom: 3 }}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button type="submit" variant="contained" fullWidth>
                        Register Admin
                    </Button>
                </form>
            </Collapse>
        </Paper>
        </Box>
        </>
    );
};

export default AdoptionCenterRegisterPage;
