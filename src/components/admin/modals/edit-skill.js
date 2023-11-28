import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { axiosInstance } from "src/utils/axios"
import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import cn from 'classnames'
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material"
import { API_SKILL } from "src/utils/api"
import { setMessage, setOpenAlert, setSeverity } from "src/redux/common/alertSlice"

export default function EditSkillModal({ open, onClose, id }) {
    const dispatch = useDispatch()

    const [data, setData] = React.useState({
        name: '',
        desc: ''
    })

    console.log(data)
    
    const handleChange = (e) => {
        setData({
            ...data, 
            [e.target.name]: e.target.value
        })
    }

    const getSkill = () => {
        axiosInstance.get(API_SKILL + "/" + id)
        .then((res) => {
            console.log(res)
            setData({
                name: res.data.data.name,
                desc: res.data.data.description
            })
        }).catch((err) => { console.log(err) })
    }

    React.useEffect(() => {
        if(open) {
            getSkill()
        }
    }, [open])

    const submitForm = (e) => {
        e.preventDefault()
        
        const inpuForm = {
            name: data.name,
            description: data.desc
        }

        console.log(inpuForm)
        axiosInstance.put(API_SKILL + "/" + id, inpuForm)
        .then((res) => {
            console.log(res)
            dispatch(setOpenAlert(true))
            dispatch(setMessage('Data berhasil diperbarui!'))
            dispatch(setSeverity('success'))
            onClose()
        }).catch(err => console.log(err))
    }

    return(<>
        <Dialog open={open} fullWidth={true} maxWidth='xs'>
            <DialogTitle sx={{ padding: '10px 15px' }}>
                <div className='d-flex flex-row align-items-center justify-content-between'>
                    <span>Edit Keahlian</span>
                    <IconButton onClick={onClose}><CloseIcon /></IconButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                <div>
                    <div className={styles.formSection}>
                        <div>
                            <label className={styles.inputLabel}>Nama Kategori</label>
                            <input type='text' className='form-control' value={data.name} name='name' onChange={handleChange} />
                        </div>
                        <div>
                            <label className={styles.inputLabel}>Deskripsi Kategori</label>
                            <input type='text' className='form-control' value={data.desc} name='desc' onChange={handleChange} />
                        </div>
                    </div>
                    <div className={styles.actionBtn}>
                        <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                        <button onClick={submitForm} className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    </>)
}