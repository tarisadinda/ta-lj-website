import React from 'react'
import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import cn from 'classnames'
import { useDispatch } from 'react-redux'
import { axiosInstance } from 'src/utils/axios'
import { API_JOB_TYPE } from 'src/utils/api'
import FrameModal from '@/components/common/frame-modal'
import { setMessage, setOpenAlert, setSeverity } from 'src/redux/common/alertSlice'

export default function AddJobType({ open, onClose }) {
    const dispatch = useDispatch()

    const [jobType, setJobType] = React.useState({
        name: '',
        desc: ''
    })

    const handleChange = (e) => {
        setJobType({
            ...jobType,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()

        const data = {
            name: jobType.name,
            description: jobType.desc
        }

        axiosInstance.post(API_JOB_TYPE, data)
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
            title='Tambah Tipe Kerja'
        >
            <form onSubmit={submitForm}>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Tipe Kerja</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan tipe kerja'
                            className='form-control' 
                            name='name' 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Tipe Kerja</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan deskripsi jobType'
                            className='form-control' 
                            name='desc' 
                            onChange={handleChange} 
                        />
                    </div>
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                    <button type='submit' className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                </div>
            </form>
        </FrameModal>
    </>)
}