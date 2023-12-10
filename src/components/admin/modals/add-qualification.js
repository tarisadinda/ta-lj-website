import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import cn from 'classnames'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import { axiosInstance } from 'src/utils/axios'
import { useState } from 'react'
import { API_QUALIFICATION } from 'src/utils/api'
import { setMessage, setOpenAlert, setSeverity } from 'src/redux/common/alertSlice'
import { fetchQualification } from 'src/redux/admin/qualificationSlice'

export default function AddQualificationModal({ open, onClose }) {
    const dispatch = useDispatch()

    const [qualification, setQualification] = useState('')
    const [desc, setDesc] = useState('')
    
    const uploadData = (e) => {
        e.preventDefault()

        const data = {
            name: qualification,
            description: desc
        }

        axiosInstance.post(API_QUALIFICATION, data)
        .then((res) => {
            console.log(res)
            if(res.status === 201) {
                dispatch(setOpenAlert(true))
                dispatch(setMessage(res.data.message))
                dispatch(setSeverity('success'))
            }

            dispatch(fetchQualification())
            onClose()
        }).catch((err) => {
            if(err.status == 400) {
                dispatch(setMessage(err.response.data.message))
                dispatch(setSeverity('error'))
                dispatch(setOpenAlert(true))
            }

            onClose()
        })
    }

    return(<>
        <Dialog open={open} fullWidth={true} maxWidth='xs'>
            <DialogTitle sx={{ padding: '10px 15px' }}>
                <div className='d-flex flex-row align-items-center justify-content-between'>
                    <span>Tambah Kualifikasi Pekerjaan</span>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Kualifikasi</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan kualifikasi'
                            className='form-control' 
                            name='qualification' 
                            onChange={(e) => setQualification(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Kualifikasi</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan deskripsi kualifikasi'
                            className='form-control' 
                            name='description' 
                            onChange={(e) => setDesc(e.target.value)} 
                        />
                    </div>
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                    <button onClick={uploadData} className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                </div>
            </DialogContent>
        </Dialog>
    </>)
}