import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        backgroundColor: (theme) => theme.palette.primary.main,
        padding: "1rem",
        textAlign: "center",
        borderTop: "1px solid #ddd",
      }}
    >
      <Typography variant="body2" sx={{ color: 'lightgray' }} >
        &copy; {currentYear} Fluffy Friends. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
