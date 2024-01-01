import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        customGreen: {
            main: '#55B982',
            light: alpha('#55B982', 0.10),
            lighter: alpha('#EAF7EF', 0.30),
            dark: '',
            darker: '',
        },
        black: {
            main: '#001405',
            light: '',
            lighter: '',
            dark: '',
            darker: '',
        },
        white: {
            main: '#FFF',
            light: '',
            dark: '',
        },
        grey: {
            main: '#7F8781',
            lighter: '',
            light: '',
            dark: '',
            darker: ''
        },
        borderColors: {
            main: alpha('#55B982', 0.30),
            black: alpha('#001405', 0.10),
            grey: '#E5E5E5',
        },
    },
    typography: {
        fontFamily: 'Manrope, sans-serif',
        color: '#001405',
    },
});

export default theme;