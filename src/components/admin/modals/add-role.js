import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import FrameModal from "@/components/common/frame-modal"
import cn from 'classnames'
import React from 'react'
import { API_ROLE } from 'src/utils/api'
import { axiosInstance } from 'src/utils/axios'
import { useDispatch } from 'react-redux'
import { setMessage, setOpenAlert, setSeverity } from 'src/redux/common/alertSlice'

export default function AddRoleModal({ open, onClose }) {
    const dispatch = useDispatch()

    const [role, setRole] = React.useState({
        name: '',
        desc: ''
    })

    const handleChange = (e) => {
        setRole({
            ...role,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()

        const formData = {
            name: role.name,
            description: role.desc
        }

        axiosInstance.post(API_ROLE, formData)
        .then((res) => {
            if(res.status === 201) {
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
            title='Tambah Role'
        >
            <div>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Role</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan role'
                            className='form-control' 
                            name='name' 
                            onChange={handleChange} 
                        />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Role</label>
                        <input 
                            type='text' 
                            placeholder='Masukkan deskripsi role'
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