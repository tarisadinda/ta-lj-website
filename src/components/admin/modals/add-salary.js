import { DialogContent } from '@mui/material'
import CustomDialog from '../common/dialog'
import { useForm } from 'react-hook-form';
import styles from '@/styles/components/admin/modals/AddSalaryModal.module.scss'
import cn from 'classnames'
import React from 'react'
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { axiosInstance } from 'src/utils/axios'
import { API_SAVE_SAL_END, API_SAVE_SAL_START } from 'src/utils/api'
import { useDispatch } from 'react-redux';
import { setMessage, setOpenAlert } from 'src/redux/slices/alertSlice';

export default function AddSalaryModal({ open, onClose }) {
    const dispatch = useDispatch()
    const [dataSalary, setDataSalary] = React.useState({
        category: 'min',
        salary: ''
    })

    const handleChange = (e) => {
        setDataSalary({
            ...dataSalary,
            [e.target.name]: e.target.value
        })
    }

    const validationSchema = Yup.object().shape({
        salary: Yup.string().matches(/^[0-9]+/, 'Nominal yang diinputkan hanya boleh mengandung angka')
    })

    const formOptions = { resolver: yupResolver(validationSchema) }

    const { register, handleSubmit, reset, formState } = useForm(formOptions)

    const { errors } = formState;

    const saveSalary = (data) => {
        if(data) {
            if(dataSalary.category === 'min') {
                let formData = {
                    salary_start: data.salary
                }

                axiosInstance.post(API_SAVE_SAL_START, formData)
                .then((res) => {
                    console.log(res)
                    onClose()

                    dispatch(setMessage('Data berhasil ditambahkan'))
                    dispatch(setOpenAlert(true))
                }).catch((err) => { console.log(err) })
            } else {
                let formData = {
                    salary_end: data.salary
                }

                axiosInstance.post(API_SAVE_SAL_END, formData)
                .then((res) => {
                    console.log(res)
                    onClose()

                    dispatch(setMessage('Data berhasil ditambahkan'))
                    dispatch(setOpenAlert(true))
                }).catch((err) => { console.log(err) })
            }
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
                    <label style={{ fontWeight: 600, marginBottom: '6px' }}>Kategori Penghasilan</label>
                    <select value={dataSalary.category} name='category' className='form-select' onChange={handleChange}>
                        <option value="min">Penghasilan Minimal</option>
                        <option value="max">Penghasilan Maksimal</option>
                    </select>
                </div>
                <div className={styles.nominalSection}>
                    <label style={{ fontWeight: 600, marginBottom: '6px' }}>Nominal</label>
                    <input type='text' 
                        name='salary' 
                        onChange={handleChange} 
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