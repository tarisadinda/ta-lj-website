import { useDispatch } from "react-redux"
import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import cn from 'classnames'
import FrameModal from "@/components/common/frame-modal"
import { axiosInstance } from "src/utils/axios"
import React from "react"
import { API_CAREER_LEVEL } from "src/utils/api"
import { setMessage, setOpenAlert, setSeverity } from "src/redux/common/alertSlice"

export default function EditCareerLevel({ open, onClose, id }) {
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

    const getDetailLevel = () => {
        axiosInstance.get(API_CAREER_LEVEL + "/" + id)
        .then((res) => {
            console.log(res)
            setData({
                name: res.data.data.name,
                desc: res.data.data.description
            })
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if(open) {
            getDetailLevel()
        }
    }, [open])

    const submitForm = (e) => {
        e.preventDefault()

        const inputForm = {
            name: data.name,
            description: data.desc
        }

        axiosInstance.put(API_CAREER_LEVEL + "/" + id, inputForm)
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
            title='Edit Kategori Kerja'
        >
            <div>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Kategori Kerja</label>
                        <input type='text' className='form-control' name='name' value={data.name} onChange={handleChange} />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Deskripsi Kategori Kerja</label>
                        <input type='text' className='form-control' name='desc' value={data.desc} onChange={handleChange} />
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