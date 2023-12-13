import React from 'react'
import LayoutAuth from '@/components/admin/layouts/auth'
import styles from '@/styles/pages/Register.module.scss'
import { useRouter } from "next/router"
import cn from 'classnames'
import Link from "next/link"
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import InputIcon from '@/components/common/input-icon'
import SVGEye from '@/public/icons/eye.svg'
import SVGEyeClose from '@/public/icons/eye-closed.svg'
import { axiosInstance } from 'src/utils/axios'
import { API_REGIS } from 'src/utils/api'
import CustomAlert from '@/components/common/alert'

export default function Register() {
    const router = useRouter()

    const [openAlert, setOpenAlert] = React.useState(false)
    const [clickSend, setClickSend] = React.useState(false)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [severity, setSeverity] = React.useState('success')
    const [seePassword, setSeePassword] = React.useState(false)
    const [seeConfirmPass, setSeeConfirmPass] = React.useState(false)
    const [roleId, setRoleId] = React.useState(3)
    const [userAccount, setUserAccount] = React.useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirm_pass: '',
        phone_number: '',
    })

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username wajib diisi'),
        name: Yup.string().required('Nama wajib diisi'),
        email: Yup.string().email('Format email tidak sesuai').required('Email wajib diisi'),
        phone_number: Yup.string().matches(/^[0-9]+$/, 'Nomor telepon hanya mengandung angka').max(13, 'Nomor telepon maksimal mengandung 13 digit angka'),
        password: Yup.string().min(6, 'Kata sandi harus terdapat minimal 6 karakter').required('Password wajib diisi'),
        confirm_pass: Yup.string().oneOf([Yup.ref('password'), null], 'Konfirmasi password tidak sesuai dengan password yang diinputkan')
        .required('Konfirmasi password wajib diisi'),
    })

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState, setValue } = useForm(formOptions);

    const { errors } = formState;

    const handleVisibility = () => {
        setSeePassword(!seePassword)
    }

    const handleSeeConfirmPass = () => {
        setSeeConfirmPass(!seeConfirmPass)
    }

    const handleChange = (e) => {
        setUserAccount({
            ...userAccount,
            [e.target.name]: e.target.value
        })
    }

    const handleRole = (e) => {
        setRoleId(e.target.value)
    }

    const submitForm = (data) => {
        const formData = {
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
            confPassword: data.confirm_pass,
            phone_number: data.phone_number,
            role_id: roleId
        }

        setClickSend(true)

        console.log(formData)

        axiosInstance.post(API_REGIS, formData)
        .then((res) => {
            console.log(res)
            if(res.status == 201) {
                setSeverity('success')
                setErrorMsg(res.data.message)
                setOpenAlert(true)
                setUserAccount({
                    name: '',
                    username: '',
                    email: '',
                    phone_number: '',
                    password: '',
                    confirm_pass: '',
                    role_id: 2
                })
                setValue('password', '')
                setValue('confirm_pass', '')
            }

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        }).catch((err) => {
            console.log(err)
            if(err.response.status == 400) {
                setErrorMsg(err.response.data.message)
                setSeverity('error')
                setOpenAlert(true)
            }
        })
    }

    // React.useEffect(() => {
    //     if(!openAlert && clickSend) {
    //         router.push('/login')
    //         setClickSend(false)
    //     }
    // }, [openAlert, clickSend])
    console.log(errors) 
    console.log(userAccount)
    console.log(roleId)
    console.log(openAlert)
    return(<>
        <div className={styles.wrapper}>
            <h2 className="d-flex justify-content-center mb-4"><b>Buat Akun</b></h2>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className={styles.form}>
                    <div className={styles.inputField}>
                        <label htmlFor="role_id" className="form-label"><b>Role</b></label>
                        <select 
                            name="role_id" 
                            id="role_id" 
                            className="form-select"
                            onChange={handleRole} 
                            value={roleId}
                        > 
                            <option value="2">Perusahaan</option>
                            <option value="3">Kandidat</option>
                        </select>
                        {errors && <span className="error-msg">{errors.role_id?.message}</span>}
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="name" className="form-label"><b>Nama {roleId == 2 ? 'Perusahaan' : 'Lengkap'}</b></label>
                        <input 
                            type="text"  
                            {...register('name')}
                            onChange={handleChange}
                            className="form-control" 
                            id="name" 
                            name="name" 
                            placeholder={`Masukkan nama ${roleId == 2 ? 'perusahaan' : 'lengkap'}`}
                            value={userAccount.name}
                        />
                        {errors && <span className="error-msg">{errors.name?.message}</span>}
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="email" className="form-label"><b>Email</b></label>
                        <input 
                            type="email"  
                            {...register('email')}
                            onChange={handleChange}
                            className="form-control" 
                            id="email" 
                            name="email" 
                            placeholder={`Masukkan email ${roleId == 2 ? 'perusahaan' : ''}`}
                            value={userAccount.email}
                        />
                        {errors && <span className="error-msg">{errors.email?.message}</span>}
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="phone_number" className="form-label"><b>Nomor Telepon {roleId == 2 ? 'Perusahaan' : ''}</b></label>
                        <input 
                            type="text"  
                            {...register('phone_number')}
                            onChange={handleChange}
                            className="form-control" 
                            id="phone_number" 
                            name="phone_number" 
                            placeholder={`Masukkan nomor telepon ${roleId == 2 ? 'perusahaan' : ''}`}
                            value={userAccount.phone_number} 
                        />
                        {errors && <span className="error-msg">{errors.phone_number?.message}</span>}
                    </div>                    
                    <div className={styles.inputField}>
                        <label htmlFor="username" className="form-label"><b>Username {roleId == 2 ? 'Perusahaan' : ''}</b></label>
                        <input 
                            type="text"  
                            {...register('username')}
                            onChange={handleChange}
                            className="form-control" 
                            id="username" 
                            name="username" 
                            placeholder={`Masukkan username ${roleId == 2 ? 'perusahaan' : ''}`}
                            value={userAccount.username}
                        />
                        {errors && <span className="error-msg">{errors.username?.message}</span>}
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="password" className="form-label"><b>Password</b></label>
                        <InputIcon 
                            placeholder="Masukkan password"
                            id="password"
                            name="password"
                            type={seePassword ? "text" : "password"}
                            onClick={handleVisibility}
                            register={register}
                            onChange={handleChange}
                            icon={seePassword ? <SVGEyeClose className={styles.eyeIcon} /> : <SVGEye className={styles.eyeIcon} />}
                        />
                        {errors && <span className="error-msg">{errors.password?.message}</span>}
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="confirmPass" className="form-label"><b>Konfirmasi Password</b></label>
                        <InputIcon 
                            placeholder="Masukkan konfirmasi password"
                            id="confirmPass"
                            name="confirm_pass"
                            type={seeConfirmPass ? "text" : "password"}
                            onClick={handleSeeConfirmPass}
                            register={register}
                            onChange={handleChange}
                            icon={seeConfirmPass ? <SVGEyeClose className={styles.eyeIcon} /> : <SVGEye className={styles.eyeIcon} />}
                        />
                        {errors && <span className="error-msg">{errors.confirm_pass?.message}</span>}
                    </div>
                    <button type='submit' className={cn(styles.regisBtn, "btn btn-primary blue")}>Daftar</button>
                </div>
            </form>
            <span className={cn(styles.loginWrap, "mt-3 mb-4")}>Sudah punya akun? <Link className={styles.loginBtn} href='/login'>Login</Link></span>
        </div>
        <CustomAlert
            open={openAlert}
            onClose={() => setOpenAlert(false)}
            duration={2000}
            severity={severity}
            text={errorMsg}
        />
    </>)
}

Register.getLayout = function getLayout(page) {
    return (
        <LayoutAuth>
            {page}
        </LayoutAuth>
    )
}