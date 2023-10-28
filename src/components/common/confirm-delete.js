import styles from '@/styles/components/common/ConfirmDelete.module.scss'
import cn from 'classnames'
import { Dialog, DialogContent } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

export default function ConfirmDeleteModal({ open, delFunc, onClose, title, desc }) {
    return(<>
        <Dialog open={open} fullWidth maxWidth='xs'>
            <DialogContent>
                <div className='d-flex justify-content-center'>
                    <DeleteIcon sx={{ fontSize: 50, color: '#D41C1D' }} />
                </div>
                <p className={styles.text}>{title}</p>
                {desc && <p className={styles.desc}>{desc}</p>}
                <div className={styles.btnList}>
                    <button onClick={onClose} className={cn(styles.actBtn, "btn btn-outline gray")}>Batal</button>
                    <button onClick={delFunc} className={cn(styles.actBtn, "btn btn-primary red")}>Ya, Hapus</button>
                </div>
            </DialogContent>
        </Dialog>
    </>)
}