import { useState } from "react"
import { useDispatch } from "react-redux"
import { axiosInstance } from "src/utils/axios"
import styles from '@/styles/components/admin/modals/AddCategoryModal.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import cn from 'classnames'
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"

export default function EditCategoryModal({ open, onClose, id }) {
    const dispatch = useDispatch()

    const [catName, setCatName] = useState('')

    console.log(id)
    
    const getDetailCategory = () => {
        // axiosInstance.
    }

    return(<>
        <Dialog open={open} fullWidth={true} maxWidth='xs'>
            <DialogTitle sx={{ padding: '10px 15px' }}>
                <div className='d-flex flex-row align-items-center justify-content-between'>
                    <span>Edit Kategori Pekerjaan</span>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    <label className={styles.inputLabel}>Nama Kategori</label>
                    <input type='text' className='form-control' name='category_name' onChange={(e) => setCatName(e.target.value)} />
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                    <button className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                </div>
            </DialogContent>
        </Dialog>
    </>)
}