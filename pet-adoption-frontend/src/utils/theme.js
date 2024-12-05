import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

const lightTheme = createTheme({
    link: {
        color: 'inherit',
    },
    typography: {
        fontFamily: 'Roboto, Noto Sans, sans-serif',
        fontSize: 14,
        body2: {
            fontSize: 14
        }
    },
    shape: {
        borderRadius: 5,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    marginLeft: 4,
                    marginRight: 4,
                    marginTop: 4,
                    marginBottom: 4,
                },
                outlinedPrimary: {
                    border: '2px solid',
                    borderRadius: '20px'
                },
                outlinedSecondary: {
                    border: '2px solid'
                },
            },
        },
    },
    palette: {
        primary: {
            main: '#08352D',
            light: '#158F78',
            dark: '#062822',
        },
        secondary: {
            main: '#0F6153',
            light: '#ff9800',
            dark: '#b71c1c',
        },
        background: {
            default: '#f5f5f5',
        }
    }
});

const darkTheme = createTheme({
    typography: {
        fontFamily: 'Roboto, Noto Sans, sans-serif',
        fontSize: 14,
        body2: {
            fontSize: 14
        }
    },
    shape: {
        borderRadius: 5,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    marginLeft: 4,
                    marginRight: 4,
                    marginTop: 4,
                    marginBottom: 4,
                },
                outlinedPrimary: {
                    border: '2px solid',
                    borderRadius: '20px'
                },
                outlinedSecondary: {
                    border: '2px solid'
                },
            },
        },
    },
    palette: {
        mode: 'dark',
        primary: {
            main: '#08352D',
            light: '#008F78',
            dark: '#062822',
        },
        secondary: {
            main: '#2D0835',
            light: '#ff9800',
            dark: '#b71c1c',
        },
        background: {
            default: '#191816',
        },
    },
});

export { lightTheme, darkTheme };