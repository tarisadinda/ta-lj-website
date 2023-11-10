import cn from 'classnames'
import FrameModal from "@/components/common/frame-modal"
import styles from '@/styles/components/admin/modals/AddCategoryModal.module.scss'
import { axiosInstance } from 'src/utils/axios'
import { API_SALARY } from 'src/utils/api'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setMessage, setOpenAlert, setSeverity } from 'src/redux/common/alertSlice'

export default function EditSalaryModal({ open, onClose, id }) {
    const dispatch = useDispatch()

    const [nominal, setNominal] = React.useState('')

    const getDetailSalary = () => {
        axiosInstance.get(API_SALARY + '/' + id)
        .then((res) => {
            setNominal(res.data.nominal)
        })
    } 

    React.useEffect(() => {
        if(open) {
            getDetailSalary()
        }
    }, [open])

    const submitForm = (e) => {
        e.preventDefault()

        const inpuForm = {
            nominal: nominal
        }

        axiosInstance.put(API_SALARY + "/" + id, inpuForm, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res)
            dispatch(setOpenAlert(true))
            dispatch(setMessage('Data berhasil diperbarui!'))
            dispatch(setSeverity('success'))
            onClose()
        }).catch(err => console.log(err))
    }

    return(<>
        <FrameModal
            open={open}
            handleClose={onClose}
            title='Edit Nominal Gaji'
        >
            <form onSubmit={submitForm}>
                <div className="mb-3">
                    <label className={styles.inputLabel}>Nominal</label>
                    <input type='text' className='form-control' value={nominal} name='name' onChange={(e) => setNominal(e.target.value)} />
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                    <button type='submit' className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                </div>
            </form>
        </FrameModal>
    </>)
}