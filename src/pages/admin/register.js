import LayoutAuth from "@/components/admin/layouts/auth"
import styles from '@/styles/pages/admin/Register.module.scss'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Alert, Snackbar } from '@mui/material'
import cn from 'classnames'
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { setToken } from "src/utils/token"
import InputIcon from "@/components/common/input-icon"
import { axiosInstance } from "src/utils/axios"
import SVGEye from '@/public/icons/eye.svg'
import SVGEyeClose from '@/public/icons/eye-closed.svg'

export default function Register() {
    let vertical = 'top'
    let horizontal = 'center'

    const REGIST_API = '/admin/register'

    const router = useRouter()
    const [errorMsg, setErrorMsg] = React.useState('')
    const [seePassword, setSeePassword] = React.useState(false)
    const [seeConfirmPass, setSeeConfirmPass] = React.useState(false)
    const [userAccount, setUserAccount] = React.useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirm_pass: ''
    })

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Username wajib diisi'),
        name: Yup.string().required('Nama wajib diisi'),
        email: Yup.string().email('Format email tidak sesuai').required('Email wajib diisi'),
        password: Yup.string().min(6, 'Kata sandi harus terdapat minimal 6 karakter').required('Password wajib diisi'),
        confirm_pass: Yup.string().oneOf([Yup.ref('password'), null], 'Konfirmasi password tidak sesuai dengan password yang diinputkan')
        .required('Konfirmasi password wajib diisi')
    })

    const formOptions = { resolver: yupResolver(validationSchema) };

    const { register, handleSubmit, reset, formState } = useForm(formOptions);

    const { errors } = formState;

    const sendData = (data) => {
        if(data) {
            handleSubmitForm(data)
        }
        
    }

    const [openToast, setOpenToast] = React.useState(false)

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

    const handleSubmitForm = (data) => {
        const formData = {
            username: data.username,
            name: data.name,
            email: data.email,
            password: data.password,
            confPassword: data.confirm_pass
        }

        axiosInstance.post(REGIST_API, formData)
        .then((res) => {
            if(res.data.status === "success") {
                router.push('/')
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    return(<>
        <div className={styles.wrapper}>
            <h2 className="d-flex justify-content-center mb-5">Registrasi Admin</h2>
            <form onSubmit={handleSubmit(sendData)} className={styles.formWrap}>
                <div className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className="form-label"><b>Email</b></label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            {...register('email')}
                            placeholder="Masukkan email anda"
                            className={cn(styles.inputField, "form-control")} 
                        />
                        {errors && <span className="error-msg">{errors.email?.message}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className="form-label"><b>Name</b></label>
                        <input 
                            type="text" 
                            className={cn(styles.inputField, "form-control")} 
                            id="name" 
                            name="name" 
                            {...register('name')}
                            placeholder="Masukkan nama admin" 
                        />
                        {errors && <span className="error-msg">{errors.name?.message}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className="form-label"><b>Username</b></label>
                        <input 
                            type="text" 
                            className={cn(styles.inputField, "form-control")} 
                            id="username" 
                            name="username" 
                            {...register('username')}
                            placeholder="Masukkan username admin" 
                        />
                        {errors && <span className="error-msg">{errors.username?.message}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className="form-label"><b>Password</b></label>
                        <InputIcon 
                            placeholder="Masukkan password"
                            id="password"
                            name="password"
                            type={seePassword ? "text" : "password"}
                            onClick={handleVisibility}
                            register={register}
                            icon={seePassword ? <SVGEyeClose className={styles.eyeIcon} /> : <SVGEye className={styles.eyeIcon} />}
                        />
                        {errors && <span className="error-msg">{errors.password?.message}</span>}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="confirm_pass" className="form-label"><b>Konfirmasi Password</b></label>
                        <InputIcon 
                            placeholder="Masukkan konfirmasi password"
                            id="confirm_pass"
                            name="confirm_pass"
                            type={seeConfirmPass ? "text" : "password"}
                            onClick={handleSeeConfirmPass}
                            register={register}
                            icon={seeConfirmPass ? <SVGEyeClose className={styles.eyeIcon} /> : <SVGEye className={styles.eyeIcon} />}
                        />
                        {errors && <span className="error-msg">{errors.confirm_pass?.message}</span>}
                    </div>
                    <button type="submit" className={cn(styles.registBtn, "btn btn-primary blue")}>Registrasi</button>
                    <div className="mt-2">
                        <p className={styles.loginText}>Sudah punya akun? <Link href="/login"><span>Login</span></Link></p>
                    </div>
                </div>
            </form>
        </div>
        <Snackbar 
            open={openToast} 
            onClose={() => setOpenToast(false)}
            autoHideDuration={2500} 
            anchorOrigin={{vertical, horizontal}}
        >
            <Alert severity="error">{errorMsg}</Alert>
        </Snackbar>
    </>)
}

Register.getLayout = function getLayout(page) {
    return (
        <LayoutAuth>
            {page}
        </LayoutAuth>
    )
}