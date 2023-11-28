import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import FrameModal from "@/components/common/frame-modal"
import React from 'react'
import cn from 'classnames'
import { axiosInstance } from 'src/utils/axios'
import { API_TIME_EXP } from 'src/utils/api'
import { useDispatch } from 'react-redux'
import { setMessage, setOpenAlert, setSeverity } from 'src/redux/common/alertSlice'

export default function AddTimeModal({ open, onClose }) {
    const dispatch = useDispatch()

    const [experience, setExperience] = React.useState({
        range: '',
        desc: ''
    })

    console.log(experience)
    const handleChange = (e) => {
        setExperience({
            ...experience,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()

        const data = {
            name: experience.range,
            description: experience.desc
        }

        axiosInstance.post(API_TIME_EXP, data)
        .then((res) => {
            console.log(res)
            dispatch(setOpenAlert(true))
            dispatch(setMessage('Data berhasil ditambahkan'))
            dispatch(setSeverity('success'))

            onClose()
        }).catch((err) => {
            console.log(err)
        })
    }

    return(<>
        <FrameModal
            open={open}
            handleClose={onClose}
            title='Tambah Tahun Pengalaman'
        >
            <div>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Tahun Pengalaman</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan tahun'
                            className='form-control' 
                            name='range' 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Tahun Pengalaman</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan deskripsi'
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