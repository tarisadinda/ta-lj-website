import { useDispatch } from "react-redux"
import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import cn from 'classnames'
import FrameModal from "@/components/common/frame-modal"
import { axiosInstance } from "src/utils/axios"
import { API_JOB_TYPE } from "src/utils/api"
import React from "react"
import { setMessage, setOpenAlert, setSeverity } from "src/redux/common/alertSlice"

export default function EditJobType({ open, onClose, id }) {
    const dispatch = useDispatch()

    const [jobType, setJobType] = React.useState({
        name: '',
        description: ''
    })

    const handleChange = (e) => {
        setJobType({
            ...jobType, 
            [e.target.name]: e.target.value
        })
    }

    const getDetailJob = () => {
        axiosInstance.get(API_JOB_TYPE + "/" + id)
        .then((res) => {
            console.log(res)
            setJobType({
                name: res.data.data.name,
                description: res.data.data.description
            })
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if(open) {
            getDetailJob()
        }
    }, [open])

    const submitForm = (e) => {
        e.preventDefault()

        const inputForm = {
            name: jobType.name,
            description: jobType.description
        }

        axiosInstance.put(API_JOB_TYPE + "/" + id, inputForm)
        .then((res) => {
            console.log(res)
            if(res.status == 200) {
                dispatch(setOpenAlert(true))
                dispatch(setMessage('Data berhasil diperbarui'))
                dispatch(setSeverity('success'))
            }

            onClose()
        }).catch((err) => console.log(err))
    }

    return(<>
        <FrameModal
            open={open}
            handleClose={onClose}
            title='Edit Tipe Pekerjaan'
        >
            <div>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Tipe Pekerjaan</label>
                        <input type='text' className='form-control' name='name' value={jobType.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Tipe Pekerjaan</label>
                        <input type='text' className='form-control' name='description' value={jobType.description} onChange={handleChange} />
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