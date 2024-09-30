import { Box, Button, Container, Paper, Typography } from "@mui/material";

const servicelist = ["Service 1", "Service 2", "Service 3"];

function Testing () {
    return (
    <Container>
        <Typography variant="h1" sx={{ my: 4, textAlign: 'center', color: "primary.main"}}>
            Services
        </Typography>
        <Typography variant="h2">Overview</Typography>
        <Box sx={{
            display: "flex", 
            flexDirection: { xs: "column", md: "row"},
            justifyContent: "space-between",
            gap: 4,
            }}>
            {servicelist.map((service) => 
                <Paper elevation={3}>
                    <Box sx={{ m: 3 }}>
                        <Typography variant="h3">{service}</Typography>
                        <Typography sx={{ mt: 2}}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </Typography>
                        <Button variant="contained" sx={{ mt: 2 }}>Learn more</Button>
                    </Box>
                </Paper>
            )}
        </Box>
    </Container>
    );
}

export default Testing;