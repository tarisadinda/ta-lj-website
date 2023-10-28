import styles from '@/styles/components/admin/modals/TrueFalseModal.module.scss'
import cn from 'classnames'
import { Dialog, DialogContent } from '@mui/material'

export default function TrueFalseModal({open, onClose, acceptBtn, declineBtn, title, desc}) {
    return(<>
        <Dialog open={open} onClose={onClose}>
            <DialogContent>
                <div className='d-flex flex-column align-items-center'>
                    <h3 className={styles.title}>{title}</h3>
                    <p>{desc}</p>
                    <div className={styles.actionBtn}>
                        <button className={cn(styles.actBtn, "btn btn-secondary blue")} onClick={declineBtn}>Tidak Yakin</button>
                        <button className={cn(styles.actBtn, "btn btn-primary blue")} onClick={acceptBtn}>Yakin</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </>)
}