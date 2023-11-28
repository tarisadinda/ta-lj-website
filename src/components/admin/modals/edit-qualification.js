import cn from 'classnames'
import FrameModal from "@/components/common/frame-modal"
import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import { axiosInstance } from 'src/utils/axios'
import { API_QUALIFICATION } from 'src/utils/api'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setMessage, setOpenAlert, setSeverity } from 'src/redux/common/alertSlice'

export default function EditQualificationModal({ open, onClose, id }) {
    const dispatch = useDispatch()

    const [qualification, setQualification] = React.useState({
        name: '',
        desc: ''
    })

    console.log(qualification)

    const handleChange = (e) => {
        setQualification({
            ...qualification,
            [e.target.name]: e.target.value
        })
    }

    const getDetailQualification = () => {
        axiosInstance.get(API_QUALIFICATION + '/' + id)
        .then((res) => {
            setQualification({
                name: res.data.data.name,
                desc: res.data.data.description
            })
            
        })
    } 

    React.useEffect(() => {
        if(open) {
            getDetailQualification()
        }
    }, [open])

    const submitForm = (e) => {
        e.preventDefault()

        const inputForm = {
            name: qualification.name,
            description: qualification.desc
        }

        axiosInstance.put(API_QUALIFICATION + "/" + id, inputForm)
        .then((res) => {
            console.log(res)
            if(res.status == 200) {
                dispatch(setOpenAlert(true))
                dispatch(setMessage(res.data.message))
                dispatch(setSeverity('success'))
            }

            onClose()
        }).catch((err) => {
            console.log(err)

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
            title='Edit Kualifikasi Pekerjaan'
        >
            <form onSubmit={submitForm}>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Kualifikasi</label>
                        <input type='text' className='form-control' value={qualification.name} name='name' onChange={handleChange} />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Kualifikasi</label>
                        <input type='text' className='form-control' value={qualification.desc} name='desc' onChange={handleChange} />
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