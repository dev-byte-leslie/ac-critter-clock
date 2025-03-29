import { styled } from '@mui/system';
import { Button } from '@mui/material';

const customColors = {
    leaf: '#76c360',
    brown: '#8e6e59',
    pink: '#ffa5cf',
    purple: '#c792ea',
    tan: '#e9dccb',
};

const LeafButton = styled(Button)({
    backgroundColor: '#76c360',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#8cd276',
    },
});

const TanButton = styled(Button)({
    backgroundColor: '#e9dccb',
    color: '#2a4054',
    '&:hover': {
        backgroundColor: '#f0e6d9',
    },
});

export {customColors, LeafButton, TanButton};
