import { createTheme } from '@mui/material/styles';

export const acTheme  = createTheme({
    palette: {
        primary: {
            main: '#5acce8',
            light: '#8bdeef',
            dark: '#1a9cc1',
            contrastText: '#fff',
        },
        secondary: {
            main: '#ff9b71',
            light: '#ffbc9c',
            dark: '#e67a4e',
            contrastText: '#fff',
        },
        error: {
            main: '#ff6b6b',
            light: '#ff9a9a',
            dark: '#d14848',
        },
        warning: {
            main: '#ffce54',
            light: '#ffe19c',
            dark: '#e6ad2e',
        },
        info: {
            main: '#8ed2cd',
            light: '#b4e4e0',
            dark: '#5fb5ae',
        },
        success: {
            main: '#8fd876',
            light: '#b0e69b',
            dark: '#67b44e',
        },
        background: {
            default: '#fcf8e8',
            paper: '#fcf8e8',
        },
        text: {
            primary: '#2a4054',
            secondary: '#6a7b87',
            disabled: '#a9b5bd',
        },
        divider: '#e0daca',
    },

    typography: {
        fontFamily: '"Nunito", "Quicksand", "Arial Rounded MT Bold", sans-serif',
        h1: {
            fontWeight: 800,
            fontSize: '2.5rem',
            letterSpacing: '0.01em',
        },
        h2: {
            fontWeight: 800,
            fontSize: '2rem',
            letterSpacing: '0.01em',
        },
        h3: {
            fontWeight: 700,
            fontSize: '1.75rem',
        },
        h4: {
            fontWeight: 700,
            fontSize: '1.5rem',
        },
        h5: {
            fontWeight: 700,
            fontSize: '1.25rem',
        },
        h6: {
            fontWeight: 700,
            fontSize: '1rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },

    shape: {
        borderRadius: 18,
    },

    shadows: [
        'none',
        '0px 2px 4px rgba(0, 0, 0, 0.05)',
        '0px 4px 8px rgba(0, 0, 0, 0.08)',
        '0px 6px 12px rgba(0, 0, 0, 0.1)',
        '0px 8px 16px rgba(0, 0, 0, 0.12)',
        '0px 10px 20px rgba(0, 0, 0, 0.14)',
        '0px 12px 24px rgba(0, 0, 0, 0.16)',
        '0px 14px 28px rgba(0, 0, 0, 0.18)',
        '0px 16px 32px rgba(0, 0, 0, 0.2)',
        '0px 18px 36px rgba(0, 0, 0, 0.22)',
        '0px 20px 40px rgba(0, 0, 0, 0.24)',
        '0px 22px 44px rgba(0, 0, 0, 0.26)',
        '0px 24px 48px rgba(0, 0, 0, 0.28)',
        '0px 26px 52px rgba(0, 0, 0, 0.3)',
        '0px 28px 56px rgba(0, 0, 0, 0.32)',
        '0px 30px 60px rgba(0, 0, 0, 0.34)',
        '0px 32px 64px rgba(0, 0, 0, 0.36)',
        '0px 34px 68px rgba(0, 0, 0, 0.38)',
        '0px 36px 72px rgba(0, 0, 0, 0.4)',
        '0px 38px 76px rgba(0, 0, 0, 0.42)',
        '0px 40px 80px rgba(0, 0, 0, 0.44)',
        '0px 42px 84px rgba(0, 0, 0, 0.46)',
        '0px 44px 88px rgba(0, 0, 0, 0.48)',
        '0px 46px 92px rgba(0, 0, 0, 0.5)',
        '0px 48px 96px rgba(0, 0, 0, 0.52)',
    ],

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    padding: '8px 16px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    textTransform: 'none',
                    transition: 'all 0.2s',
                    boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0px 4px 0px rgba(0, 0, 0, 0.1)',
                    },
                    '&:active': {
                        transform: 'translateY(0px)',
                        boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.1)',
                    },
                },

                contained: {
                    fontWeight: 700,
                },
            },
            variants: [
                {
                    props: { variant: 'contained', color: 'primary' },
                    style: {
                        backgroundColor: '#5acce8', // Turquoise button color
                        '&:hover': {
                            backgroundColor: '#47a1c7', // Darker turquoise on hover
                        },
                    },
                },
                {
                    props: { variant: 'contained', color: 'secondary' },
                    style: {
                        backgroundColor: '#ff9b71', // Coral button color
                        '&:hover': {
                            backgroundColor: '#e68d57', // Darker coral on hover
                        },
                    },
                },
            ],
        },

        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 24,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
                    overflow: 'hidden',
                    border: '1px solid #e0daca',
                    background: '#fcf8e8',
                },
            },
        },

        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fcf8e8', // Cream background
                    backgroundImage: 'none',
                },
                elevation1: {
                    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
                },
            },
        },

        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    fontWeight: 600,
                    padding: '0 4px',
                },
                colorPrimary: {
                    backgroundColor: '#5acce8',
                },
                colorSecondary: {
                    backgroundColor: '#ff9b71',
                },
            },
        },

        MuiTab: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 700,
                    borderRadius: '16px 16px 0 0',
                    '&.Mui-selected': {
                        backgroundColor: '#fff',
                    },
                },
            },
        },

        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 16,
                        '& fieldset': {
                            borderColor: '#e0daca',
                            borderWidth: 2,
                        },
                        '&:hover fieldset': {
                            borderColor: '#5acce8',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#5acce8',
                        },
                    },
                },
            },
        },

        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    '&:hover': {
                        backgroundColor: '#5acce8',
                    },
                },
            },
        },

        MuiSwitch: {
            styleOverrides: {
                root: {
                    padding: 8,
                },
                track: {
                    borderRadius: 22 / 2,
                    backgroundColor: '#e0daca',
                },
                thumb: {
                    backgroundColor: '#fff',
                },
                colorPrimary: {
                    '&.Mui-checked': {
                        '& + .MuiSwitch-track': {
                            backgroundColor: '#5acce8',
                        },
                        '& .MuiSwitch-thumb': {
                            backgroundColor: '#fff',
                        },
                    },
                },
            },
        },

        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: '#2a4054',
                    borderRadius: 12,
                    padding: '8px 12px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                },
                arrow: {
                    color: '#2a4054',
                },
            },
        },
    },
});