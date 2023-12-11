import React from 'react'
import styles from '@/styles/components/company/modals/EditApplicationStatus.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { openAlert, setOpenAlert } from 'src/redux/common/alertSlice'
import CustomAlert from '@/components/common/alert'
import FrameModal from '@/components/common/frame-modal'
import { axiosInstance } from 'src/utils/axios'
import { API_APPLIED_STATUS } from 'src/utils/api'
import { fetchDetailCandidate } from 'src/redux/company/candidateDetailSlice'

const ModalEditStatus = ({open, handleClose, id}) => {
    const dispatch = useDispatch()

    console.log(id)
    const isOpenAlert = useSelector(openAlert)
    const [selectedStatus, setSelectedStatus] = React.useState('')

    const changeStatus = () => {
        console.log(selectedStatus)
        const sendData = {
            status: selectedStatus,
        }
        
        axiosInstance.post(API_APPLIED_STATUS, sendData, {
            params: {
                candidate_job_id: id
            },
        }).then((res) => {
            console.log(res)

            handleClose()
            dispatch(fetchDetailCandidate(id))
        }).catch((err) => {
            console.log(err)
        })
    }
    
    console.log(selectedStatus)

    const handleStatus = (e) => {
        setSelectedStatus(e.target.value)
    }

    return(<>
        <FrameModal
            open={open}
            handleClose={handleClose}
            title='Edit Status Lamaran'
        >
            <div>
                <p className='mb-1'><b>Status Seleksi</b></p>
                <select onChange={handleStatus} className="form-select" aria-label="Pilih Status Seleksi">
                    <option selected disabled>Pilih status</option>
                    <option value="processed">Dalam Review</option>
                    <option value="accepted">Diterima</option>
                    <option value="rejected">Ditolak</option>
                </select>
                <div className='mt-4 d-flex justify-content-end'>
                    <div className={styles.modalBtn}>
                        <button onClick={handleClose} className='btn btn-ghost blue'>Batal</button>
                        <button onClick={changeStatus} className='btn btn-primary blue'>Update</button>
                    </div>
                </div>
            </div>
        </FrameModal>
        <CustomAlert 
            open={isOpenAlert} 
            onClose={() => dispatch(setOpenAlert(false))}
            duration={2500}
            text='Tesss..'
        />
    </>)
}

export default ModalEditStatus