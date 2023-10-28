import React from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import styles from '@/styles/components/common/FrameModal.module.scss'

const FrameModal = ({open, handleClose, children, title}) => {
    return(<>
        <Dialog 
            open={open}
            handleClose={handleClose}
            PaperProps={{
                sx: {
                    width: '574px',
                    height: 'max-content',
                    borderRadius: '7px'
                }
            }}
        >
            <DialogTitle className={styles.title}>
                <span className={styles.modalTitle}><b>{title}</b></span>
                <IconButton 
                    onClick={handleClose}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    </>)
}

export default FrameModal