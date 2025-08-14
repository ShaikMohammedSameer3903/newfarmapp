import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
} from '@mui/material';

function FarmDetailsPopup({ open, onClose, type, farmlandID, cropID }) {
    const [details, setDetails] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            let url = '';

            if (type === 'soil') {
                url = `${process.env.REACT_APP_BACKEND_URL}/soil/getDetails/${farmlandID}`;
            } else if (type === 'weather') {
                url = `${process.env.REACT_APP_BACKEND_URL}/weather/getDetails/${farmlandID}`;
            } else if (type === 'plant') {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/farmland/getCrop/${farmlandID}`);
                const data = await response.json();
                const cropId = data.cropId;
                url = `${process.env.REACT_APP_BACKEND_URL}/crop/getbyID/${cropId}`;
            }

            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setDetails(JSON.stringify(data, null, 2)); // Format data for display
            } else {
                setDetails('Failed to fetch details.');
            }
        };

        if (open) {
            fetchData();
        }
    }, [open, type, farmlandID, cropID]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle>Details</DialogTitle>
            <DialogContent>
                <Typography variant="body1">{details}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FarmDetailsPopup;
