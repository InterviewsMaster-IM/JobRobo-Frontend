import { createTheme, alpha } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        customGreen: {
            base: '#55B982',
            light: alpha('#55B982', 0.10),
            lighter: alpha('#EAF7EF', 0.30),
            dark: '',
            darker: '',
        },
        black: {
            base: '#001405',
            light: '',
            lighter: '',
            dark: '',
            darker: '',
        },
        white: {
            base: '#FFF',
            light: '',
            dark: '',
        },
        grey: {
            base: '#7F8781',
            lighter: '',
            light: '',
            dark: '',
            darker: ''
        },
        error: {

        },
        borderColors: {
            green: alpha('#55B982', 0.30),
            black: alpha('#001405', 0.10),
            grey: '#E5E5E5',
        },
    },
    typography: {
        fontFamily: 'Manrope, sans-serif',
    },
});

export default theme;