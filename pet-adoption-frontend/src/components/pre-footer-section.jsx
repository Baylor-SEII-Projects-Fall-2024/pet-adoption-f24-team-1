import React from "react";
import { Box, Typography, Grid, TextField, Button } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import Link from "next/link";

const PreFooterSection = () => {
  return (
    <Box
      sx={{
        padding: "2rem",
        borderTop: "1px solid #ddd",
        marginTop: "2rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={4} 
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
            How Can We Help?
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
            <Link href="/user-home" color="primary" style={{ textDecoration: "none" }}>
              Adopt a pet
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
            <Link href="/create-account" color="primary" style={{ textDecoration: "none" }}>
              Create an account
            </Link>
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "0.5rem" }}>
            <Link href="/adoption-center-register" color="primary" style={{ textDecoration: "none" }}>
              Adoption center registration
            </Link>
          </Typography>
          <Typography variant="body2">
            <Link href="/about" color="primary" style={{ textDecoration: "none" }}>
              About us
            </Link>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "1rem" }}>
            Contact Us
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}
          >
            <LocationOnIcon color="primary" sx={{ marginRight: "0.5rem" }} />
            1401 S 4th St, Waco, TX 76706
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center", marginBottom: "0.5rem" }}
          >
            <PhoneIcon color="primary" sx={{ marginRight: "0.5rem" }} />
            +1 (254) 123-4567
          </Typography>
          <Typography
            variant="body2"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <EmailIcon color="primary" sx={{ marginRight: "0.5rem" }} />
            fluffy.friends.support@gmail.com
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreFooterSection;
