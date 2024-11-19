import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';

const lightTheme = createTheme({
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
    shadows: [
        'none',
        '0px 1px 8px rgba(255, 255, 255, 0.08), 0px 1px 1px rgba(255, 255, 255, 0.05), 0px 2px 1px rgba(255, 255, 255, 0.01)',
        '0px 3px 9px rgba(255, 255, 255, 0.12), 0px 1px 3px rgba(255, 255, 255, 0.04)',
        '0px 2px 4px rgba(255, 255, 255, 0.16), 0px 2px 6px rgba(255, 255, 255, 0.04)',
        // Up to 25 levels for Material UI shadows
      ]
});

export { lightTheme, darkTheme };