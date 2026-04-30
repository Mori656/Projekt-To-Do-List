import { createTheme } from '@mui/material/styles'
import type { PaletteMode } from '@mui/material'

const palette = {
  light: {
    primary: {
      main: '#4f46e5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#22d3ee',
      contrastText: '#0f172a',
    },
    background: {
      default: '#f3f6fb',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
    divider: '#e2e8f0',
  },
  dark: {
    primary: {
      main: '#818cf8',
      contrastText: '#0f172a',
    },
    secondary: {
      main: '#7dd3fc',
      contrastText: '#0f172a',
    },
    background: {
      default: '#060b16',
      paper: '#0f172a',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#94a3b8',
    },
    divider: '#1f2937',
  },
}

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light' ? palette.light : palette.dark),
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: 'Inter, Roboto, Helvetica, Arial, sans-serif',
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: mode === 'light' ? '#f3f6fb' : '#060b16',
          color: mode === 'light' ? '#0f172a' : '#e2e8f0',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          textTransform: 'none',
          padding: '10px 18px',
        },
        containedPrimary: {
          boxShadow: '0 12px 24px rgba(79, 70, 229, 0.16)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: '0 18px 40px rgba(15, 23, 42, 0.08)',
          border: '1px solid transparent',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 24,
          backgroundImage: 'none',
          overflow: 'hidden',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 14,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          textTransform: 'none',
          borderColor: mode === 'light' ? '#e2e8f0' : '#1f2937',
          '&.Mui-selected': {
            backgroundColor: mode === 'light' ? '#eef2ff' : '#1e293b',
            color: mode === 'light' ? '#3730a3' : '#f8fafc',
          },
        },
      },
    },
  },
})

export const getTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode))
