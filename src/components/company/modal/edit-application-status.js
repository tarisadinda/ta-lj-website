import React from 'react'
import styles from '@/styles/components/modals/EditApplicationStatus.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { openAlert, setOpenAlert } from 'src/redux/slices/alertSlice'
import CustomAlert from '../common/custom-alert'
import FrameModal from '../common/frame-modal'

const ModalEditStatus = ({open, handleClose}) => {
    const dispatch = useDispatch()

    const isOpenAlert = useSelector(openAlert)

    return(<>
        <FrameModal
            open={open}
            handleClose={handleClose}
            title='Edit Status Lamaran'
        >
            <div>
                <p>Status Seleksi</p>
                <select className="form-select" aria-label="Pilih Status Seleksi">
                    <option selected>Open this select menu</option>
                    <option value="1">Dalam Review</option>
                    <option value="2">Terpilih</option>
                    <option value="3">Tidak Sesuai</option>
                </select>
                <div className='mt-4 d-flex justify-content-end'>
                    <div className={styles.modalBtn}>
                        <button onClick={handleClose} className='btn btn-ghost blue'>Batal</button>
                        <button onClick={() => { dispatch(setOpenAlert(true)); handleClose() }} className='btn btn-primary blue'>Update</button>
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