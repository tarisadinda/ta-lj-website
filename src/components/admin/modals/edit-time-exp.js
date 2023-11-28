import cn from 'classnames'
import FrameModal from "@/components/common/frame-modal"
import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import { useDispatch } from "react-redux"
import { setMessage, setOpenAlert, setSeverity } from 'src/redux/common/alertSlice'
import { API_TIME_EXP } from 'src/utils/api'
import { axiosInstance } from 'src/utils/axios'
import React from 'react'

export default function EditTimeModal({ open, onClose, id }) {
    const dispatch = useDispatch()

    const [data, setData] = React.useState({
        name: '',
        desc: ''
    })

    console.log(data)
    console.log(id)
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const getDetailTime = () => {
        axiosInstance.get(API_TIME_EXP + '/' + id)
        .then((res) => {
            setData({
                name: res.data.data.name,
                desc: res.data.data.description
            })
            
        })
    } 

    React.useEffect(() => {
        if(open) {
            getDetailTime()
        }
    }, [open])

    const submitForm = (e) => {
        e.preventDefault()

        const inputForm = {
            name: data.name,
            description: data.desc
        }

        axiosInstance.put(API_TIME_EXP + "/" + id, inputForm)
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
            title='Edit Tahun Pengalaman'
        >
            <div>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Tahun Pengalaman</label>
                        <input type='text' className='form-control' value={data.name} name='name' onChange={handleChange} />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Kualifikasi</label>
                        <input type='text' className='form-control' value={data.desc} name='desc' onChange={handleChange} />
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