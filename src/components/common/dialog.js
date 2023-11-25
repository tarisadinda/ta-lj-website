import { Dialog, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

//can't close if click outside of modal
export default function CustomDialog({open, title, closeModal, handleClose, children, ...props}) {
    return(<>
        <Dialog open={open} {...props}>
            <DialogTitle
                sx={{
                    width: '600px',
                    padding: '10px 15px'
                }}
            >
                {title}
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            {children}
        </Dialog>
    </>)
}