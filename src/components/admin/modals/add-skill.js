import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import FrameModal from "@/components/common/frame-modal"
import React from 'react'
import cn from 'classnames'
import { API_SKILL } from 'src/utils/api'
import { setMessage, setOpenAlert, setSeverity } from 'src/redux/common/alertSlice'
import { useDispatch } from 'react-redux'
import { axiosInstance } from 'src/utils/axios'

export default function AddSkillModal({ open, onClose }) {
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

    const submitForm = (e) => {
        e.preventDefault()

        const formData = {
            name: data.name,
            description: data.desc
        }

        axiosInstance.post(API_SKILL, formData)
        .then((res) => {
            console.log(res)
            if(res) {
                dispatch(setOpenAlert(true))
                dispatch(setMessage('Data berhasil ditambahkan'))
                dispatch(setSeverity('success'))

                onClose()
            }
        }).catch((err) => console.log(err))
    }

    return(<>
        <FrameModal
            open={open}
            handleClose={onClose}
            title='Tambah Keahlian'
        >
            <div className={styles.formSection}>
                <div>
                    <label className={styles.inputLabel}>Nama Keahlian</label>
                    <input 
                        type='text' 
                        placeholder='Masukkan keahlian'
                        className='form-control' 
                        name='name' 
                        onChange={handleChange} 
                    />
                </div>
                <div>
                    <label className={styles.inputLabel}>Deskripsi Keahlian</label>
                    <input 
                        type='text' 
                        placeholder='Masukkan deskripsi keahlian'
                        className='form-control' 
                        name='desc' 
                        onChange={handleChange} 
                    />
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                    <button onClick={submitForm} className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                </div>
            </div>
        </FrameModal>
    </>)
}