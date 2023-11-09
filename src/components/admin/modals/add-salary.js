import { DialogContent } from '@mui/material'
import CustomDialog from '@/components/common/dialog'
import { useForm } from 'react-hook-form';
import styles from '@/styles/components/admin/modals/AddSalaryModal.module.scss'
import cn from 'classnames'
import React from 'react'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosInstance } from 'src/utils/axios'
import { API_SALARY, API_SAVE_SAL_END, API_SAVE_SAL_START } from 'src/utils/api'
import { useDispatch } from 'react-redux';
import { setMessage, setOpenAlert } from 'src/redux/common/alertSlice';

export default function AddSalaryModal({ open, onClose }) {
    const dispatch = useDispatch()
    const [salary, setSalary] = React.useState('')

    const validationSchema = Yup.object().shape({
        salary: Yup.string().matches(/^[0-9]+/, 'Nominal yang diinputkan hanya boleh mengandung angka')
    })

    const formOptions = { resolver: yupResolver(validationSchema) }

    const { register, handleSubmit, reset, formState } = useForm(formOptions)

    const { errors } = formState;

    console.log(salary)
    const saveSalary = (data) => {
        if(data) {
            let formData = {
                nominal: data.salary
            }

            axiosInstance.post(API_SALARY, formData, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((res) => {
                console.log(res)
                onClose()

                dispatch(setMessage('Data berhasil ditambahkan'))
                dispatch(setOpenAlert(true))
            }).catch((err) => { console.log(err) })
        }
    }

    return(<>
        <CustomDialog 
            title='Tambah Penghasilan'
            open={open} 
            handleClose={onClose} 
            maxWidth='md'
        >
            <DialogContent dividers>
                <div>
                    <label style={{ fontWeight: 600, marginBottom: '6px' }}>Nominal</label>
                    <input type='text' 
                        name='salary' 
                        {...register('salary')}
                        className='form-control' 
                        placeholder='Masukkan nominal gaji' 
                    />
                    {errors && <span className='error-msg'>{errors.salary?.message}</span>}
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                    <button onClick={handleSubmit(saveSalary)} className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                </div>
            </DialogContent>
        </CustomDialog>
    </>)
}