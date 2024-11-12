import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router'; // Use Next.js useRouter for routing
import NavBar from '@/components/nav-bar';  // Assuming you have a NavBar component

export default function AdoptionCenterEventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [centerId, setCenterId] = useState(null); // State for centerId

    const router = useRouter();
    const { centerId: queryCenterId } = router.query; // Extract centerId from the query params

    // UseEffect to check if centerId exists in the query params
    useEffect(() => {
        if (queryCenterId) {
            setCenterId(queryCenterId); // Set the centerId when it's available in the query
        }
    }, [queryCenterId]); // Re-run this effect if queryCenterId changes

    // Fetch events from API when centerId is available
    useEffect(() => {
        if (centerId) {
            setLoading(true); // Show loading spinner
            setError(null); // Clear previous error state

            // Fetch events from the API
            fetch(`http://localhost:8080/api/adoptioncenters/${centerId}/events`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch events');
                    }
                    return response.json();
                })
                .then((data) => {
                    setEvents(data); // Update events state with the fetched data
                })
                .catch((err) => {
                    setError(err.message); // Set error message in case of failure
                })
                .finally(() => {
                    setLoading(false); // Stop loading once the API call finishes
                });
        }
    }, [centerId]); // Re-fetch when centerId is updated

    // Display loading spinner while data is being fetched
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    // Display error message if fetching events failed
    if (error) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="error">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {/* Navbar */}
            <NavBar />

            {/* Page Title */}
            <Box sx={{ padding: 4, marginTop: '64px' }}>
                <Typography variant="h4" gutterBottom>
                    Adoption Center Events
                </Typography>
                {/* Additional Text */}
                <Typography variant="h5" gutterBottom>
                    Events
                </Typography>
            </Box>

            {/* Display Event Names as Cards */}
            <Grid container spacing={3} sx={{ padding: 4 }}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <Card elevation={3}>
                            <CardContent>
                                <Typography variant="h6">{event.name}</Typography> {/* Display only event name */}
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
