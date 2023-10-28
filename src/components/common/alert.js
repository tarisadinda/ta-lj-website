import { Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import React from "react";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomAlert({ open, onClose, duration, severity, text }) {
    return(<>
        <Snackbar open={open} 
            onClose={onClose} 
            autoHideDuration={duration}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert onClose={onClose} sx={{ width: '100%' }} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    </>)
}