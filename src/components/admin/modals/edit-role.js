import React from 'react'
import cn from 'classnames'
import FrameModal from '@/components/common/frame-modal'
import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import { axiosInstance } from 'src/utils/axios'
import { API_ROLE } from 'src/utils/api'
import { useDispatch } from 'react-redux'
import { setMessage, setOpenAlert, setSeverity } from 'src/redux/common/alertSlice'

export default function EditRoleModal({ open, onClose, id }) {
    const dispatch = useDispatch()

    const [role, setRole] = React.useState({
        name: '',
        description: ''
    })

    const handleChange = (e) => {
        setRole({
            ...role,
            [e.target.name]: e.target.value
        })
    }

    const getDetailRole = () => {
        axiosInstance.get(API_ROLE + "/" + id)
        .then((res) => {
            console.log(res)
            setRole({
                name: res.data.data.name,
                description: res.data.data.description
            })
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if(open) {
            getDetailRole()
        }
    }, [open])

    const submitForm = (e) => {
        e.preventDefault()

        const formData = {
            name: role.name,
            description: role.description
        }

        console.log(formData)
        axiosInstance.put(`${API_ROLE}/${id}`, formData)
        .then((res) => {
            console.log(res)
            if(res.status == 200) {
                dispatch(setOpenAlert(true))
                dispatch(setMessage(res.data.message))
                dispatch(setSeverity('success'))
            }

            onClose()
        }).catch((err) => {
            dispatch(setMessage(err.response?.message))
            dispatch(setSeverity('error'))
            dispatch(setOpenAlert(true))

            onClose()
        })
    }

    return(<>
        <FrameModal
            open={open}
            handleClose={onClose}
            title='Edit Detail Role'
        >
            <form onSubmit={submitForm}>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Nama Role</label>
                        <input type='text' className='form-control' name='name' value={role.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Role</label>
                        <input type='text' className='form-control' name='description' value={role.description} onChange={handleChange} />
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