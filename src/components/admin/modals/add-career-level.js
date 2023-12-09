import { useDispatch } from "react-redux"
import React from 'react'
import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import cn from 'classnames'
import FrameModal from "@/components/common/frame-modal"
import { axiosInstance } from "src/utils/axios"
import { API_CAREER_LEVEL } from "src/utils/api"
import { setMessage, setOpenAlert, setSeverity } from "src/redux/common/alertSlice"
import { fetchCareerLevel } from "src/redux/admin/careerLevelSlice"

export default function AddLevelModal({ open, onClose }) {
    const dispatch = useDispatch()

    const [data, setData] = React.useState({
        name: '',
        desc: ''
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = () => {
        const formData = {
            name: data.name,
            description: data.desc
        }

        axiosInstance.post(API_CAREER_LEVEL, formData)
        .then((res) => {
            if(res) {
                dispatch(setOpenAlert(true))
                dispatch(setMessage('Data berhasil ditambahkan'))
                dispatch(setSeverity('success'))

                onClose()
                dispatch(fetchCareerLevel())
            }
        }).catch((err) => console.log(err))
    }

    return(<>
        <FrameModal
            open={open}
            handleClose={onClose}
            title='Tambah Kategori Kerja'
        >
            <div>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Kategori Kerja</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan kategori kerja'
                            className='form-control' 
                            name='name' 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Kategori Kerja</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan kategori kerja'
                            className='form-control' 
                            name='desc' 
                            onChange={handleChange} 
                        />
                    </div>
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                    <button onClick={submitForm} className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                </div>
            </div>
        </FrameModal>
    </>)
}