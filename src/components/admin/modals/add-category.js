import styles from '@/styles/components/admin/modals/AddCategoryModal.module.scss'
import cn from 'classnames'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useDispatch } from 'react-redux'
import { axiosInstance } from 'src/utils/axios'
import { useState } from 'react'
import { API_ADD_CAT } from 'src/utils/api'
import { setMessage, setOpenAlert, setSeverity } from 'src/redux/common/alertSlice'

export default function AddCategoryModal({ open, onClose }) {
    const dispatch = useDispatch()

    const [catName, setCatName] = useState('')
    const [desc, setDesc] = useState('')
    
    const saveCategory = (e) => {
        e.preventDefault()

        const data = {
            name: catName,
            description: desc
        }

        axiosInstance.post(API_ADD_CAT, data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if(res.status === 201) {
                dispatch(setOpenAlert(true))
                dispatch(setMessage('Data berhasil ditambahkan'))
                dispatch(setSeverity('success'))
            }

            // if(res.status === 200) {
            //     dispatch(setOpenAlert(true))
            //     dispatch(setMessage('Data berhasil ditambahkan'))
            //     dispatch(setSeverity('success'))
            // }
        }).catch((err) => {
            console.log(err)

            // if(err) {
            //     dispatch(setMessage(err.response.data.message))
            //     dispatch(setSeverity('error'))
            //     dispatch(setOpenAlert(true))
            // } else {
            //     dispatch(setMessage('Data gagal ditambahkan. Silahkan ulangi kembali!'))
            //     dispatch(setSeverity('error'))
            //     dispatch(setOpenAlert(true))
            // }
        })

        onClose()
    }

    return(<>
        <Dialog open={open} fullWidth={true} maxWidth='xs'>
            <DialogTitle sx={{ padding: '10px 15px' }}>
                <div className='d-flex flex-row align-items-center justify-content-between'>
                    <span>Tambah Kategori Pekerjaan</span>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Nama Kategori</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan nama kategori'
                            className='form-control' 
                            name='category_name' 
                            onChange={(e) => setCatName(e.target.value)} 
                        />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Kategori</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan deskripsi kategori'
                            className='form-control' 
                            name='description' 
                            onChange={(e) => setDesc(e.target.value)} 
                        />
                    </div>
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                    <button onClick={saveCategory} className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                </div>
            </DialogContent>
        </Dialog>
    </>)
}