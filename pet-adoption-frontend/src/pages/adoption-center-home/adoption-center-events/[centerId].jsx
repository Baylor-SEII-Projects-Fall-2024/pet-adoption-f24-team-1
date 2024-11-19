// /pages/adoption-center/[centerId]/events.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import { useRouter } from 'next/router';
import NavBar from '@/components/nav-bar';

export default function AdoptionCenterEventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [centerId, setCenterId] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

    const router = useRouter();
    const { centerId: queryCenterId } = router.query;

    useEffect(() => {
        if (queryCenterId) {
            setCenterId(queryCenterId);
        }
    }, [queryCenterId]);

    useEffect(() => {
        if (centerId) {
            setLoading(true);
            setError(null);

            fetch(`${apiBaseUrl}/api/adoptioncenters/${centerId}/events`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch events');
                    }
                    return response.json();
                })
                .then((data) => {
                    setEvents(data);
                })
                .catch((err) => {
                    setError(err.message);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [centerId]);

    const handleOpenDialog = (event) => {
        setSelectedEvent(event);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedEvent(null);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ padding: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="error">Error: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            <NavBar />

            <Box sx={{ padding: 4, marginTop: '64px' }}>
                <Typography variant="h4" gutterBottom>
                    Adoption Center Events
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Upcoming Events at Our Center
                </Typography>
            </Box>

            <Grid container spacing={3} sx={{ padding: 4 }}>
                {events && events.length > 0 ? (
                    events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
                            <Box sx={{ border: '1px solid #ddd', borderRadius: 2, padding: 2 }}>
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                    {event.title || 'No Title'}
                                </Typography>
                                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                    {event.date || 'Date not available'}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 2 }}>
                                    {event.description ? event.description : 'No description available.'}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleOpenDialog(event)}
                                >
                                    Details
                                </Button>
                            </Box>
                        </Grid>
                    ))
                ) : (
                    <Box sx={{ padding: 4, textAlign: 'center' }}>
                        <Typography variant="h6">No events available</Typography>
                    </Box>
                )}
            </Grid>

            {/* Event Details Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                {selectedEvent && (
                    <>
                        <DialogContent>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Location:</strong> {selectedEvent.location || "N/A"}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 1 }}>
                                <strong>Date:</strong> {selectedEvent.date || "N/A"}
                            </Typography>
                            <Typography variant="body2">
                                {selectedEvent.description || "No description available."}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Close
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    );
}