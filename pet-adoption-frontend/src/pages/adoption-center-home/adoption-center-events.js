import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent, Button, CardMedia, Modal } from '@mui/material';
import { useRouter } from 'next/router';

export default function AdoptionCenterEventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null); // Holds the current event data for the modal
    const router = useRouter();
    const { centerId } = router.query;  // Get the centerId from the URL

    useEffect(() => {
        const fetchEvents = async () => {
            if (centerId) {
                setLoading(true); // Set loading state before making the API request
                try {
                    const response = await fetch('http://localhost:8080/api/events/{id}');
                    if (!response.ok) {
                        throw new Error('Failed to fetch events');
                    }
                    const data = await response.json();
                    console.log(data); // Log the data to inspect the structure
                    setEvents(data);
                } catch (err) {
                    setError(err.message); // Set error message if the fetch fails
                } finally {
                    setLoading(false); // Set loading to false once the fetch completes
                }
            }
        };

        fetchEvents(); // Call the async function to fetch the events

    }, [centerId]);  // Fetch events when the centerId changes

    const handleOpenDescriptionModal = (event) => {
        setCurrentEvent(event);
        setOpenDescriptionModal(true);
    };

    const handleCloseDescriptionModal = () => {
        setOpenDescriptionModal(false);
        setCurrentEvent(null);
    };

    if (loading) return <Typography variant="h6">Loading events...</Typography>;
    if (error) return <Typography variant="h6" color="error">Error: {error}</Typography>;

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Events for Adoption Center {centerId}
            </Typography>
            <Grid container spacing={3}>
                {events.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.id}>
                        <Card elevation={3}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={event.imageUrl} // Event image
                                alt={event.title}
                            />
                            <CardContent>
                                <Typography variant="h6">{event.title}</Typography>
                                <Typography variant="body2" color="text.secondary">{event.date}</Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleOpenDescriptionModal(event)}
                                    sx={{ mt: 2 }}
                                >
                                    View Description
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Description Modal */}
            <Modal
                open={openDescriptionModal}
                onClose={handleCloseDescriptionModal}
                aria-labelledby="description-modal-title"
                aria-describedby="description-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                }}>
                    {currentEvent && (
                        <>
                            <Typography id="description-modal-title" variant="h6" component="h2">
                                {currentEvent.title} - Description
                            </Typography>
                            <Typography id="description-modal-description" sx={{ mt: 2 }}>
                                {currentEvent.description}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleCloseDescriptionModal}
                                sx={{ mt: 2 }}
                            >
                                Close
                            </Button>
                        </>
                    )}
                </Box>
            </Modal>
        </Box>
    );
}
