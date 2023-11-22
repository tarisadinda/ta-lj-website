import LayoutAuth from "@/components/admin/layouts/auth"
import styles from "@/styles/pages/Login.module.scss"
import cn from 'classnames'
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { setToken } from "src/utils/token"
import InputIcon from "@/components/common/input-icon"
import { axiosInstance } from "src/utils/axios"
import SVGEye from '@/public/icons/eye.svg'
import SVGEyeClose from '@/public/icons/eye-closed.svg'
import CustomAlert from "@/components/common/alert"
import { API_LOGIN } from "src/utils/api"

export default function Login() {
    const router = useRouter()
    const [errorMsg, setErrorMsg] = React.useState('')
    const [severity, setSeverity] = React.useState('success')
    const [openAlert, setOpenAlert] = React.useState(false)
    const [seePassword, setSeePassword] = React.useState(false)
    const [userAccount, setUserAccount] = React.useState({
        username: 'min',
        password: ''
    })

    const handleVisibility = () => {
        setSeePassword(!seePassword)
    }

    const handleChange = (e) => {
        setUserAccount({
            ...userAccount,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            username: userAccount.username,
            password: userAccount.password
        }

        axiosInstance.post(API_LOGIN, formData)
        .then((res) => {
            console.log(res)
            if(res.status == 200) {
                setToken(res.data.data.accessToken)
                setErrorMsg(res.data.message)
                setSeverity('success')
                setOpenAlert(true)

                if(res.data) {
                    if(res.data.data.login_as === 'admin') {
                        router.push('/admin/dashboard')
                    } else if(res.data.data.login_as === 'company') {
                        router.push('/company/dashboard')
                    } else {
                        router.push('/candidate/home')
                    }
                }
            }
            // if(res.status === 201) {
            //     if(res.data.username === "admin") {
            //         router.push('/admin/dashboard')
            //     } else if(res.data.username === "company1") {
            //         router.push('/company/dashboard')
            //     } else if(res.data.username === "user1") {
            //         router.push('/candidate/home')
            //     } else {
            //         setErrorMsg('Data tidak valid')
            //         setSeverity('error')
            //         setOpenAlert(true)
            //     }
            // }
        }).catch((err) => {
            if(err) {
                if( err.response?.status !== 200) {
                    setErrorMsg(err.response?.data.message)
                    setSeverity('error')
                    setOpenAlert(true)
                }
            }
        })
    }

    return(<>
        <div className={styles.wrapper}>
            <h2 className="d-flex justify-content-center mb-5">Login</h2>
            <form onSubmit={handleSubmit} className={styles.formWrap}>
                <div className={styles.form}>
                    <div className={cn(styles.inputGroup, "mb-3")}>
                        <label htmlFor="username" className="form-label"><b>Username</b></label>
                        <input type="text" 
                            onChange={handleChange} 
                            className={cn(styles.inputField, "form-control")} 
                            id="username" 
                            name="username" 
                            placeholder="Masukkan username" 
                        />
                    </div>
                    <div className={cn(styles.inputGroup, "mb-1")}>
                        <label htmlFor="password" className="form-label"><b>Password</b></label>
                        <InputIcon 
                            placeholder="Masukkan password"
                            id="password"
                            name="password"
                            type={seePassword ? "text" : "password"}
                            onChange={handleChange}
                            onClick={handleVisibility}
                            icon={seePassword ? <SVGEyeClose className={styles.eyeIcon} /> : <SVGEye className={styles.eyeIcon} />}
                        />
                    </div>
                    <div className="mb-4">
                        <span className={styles.forgetText}>
                            <Link href='#'>Lupa password?</Link>
                        </span>
                    </div>
                    <button type="submit" className={cn(styles.loginBtn, "btn btn-primary blue")}>Login</button>
                    <div className="mt-2">
                        <p className={styles.registText}>Belum punya akun? <Link href="/register"><span>Daftar</span></Link></p>
                    </div>
                </div>
            </form>
        </div>
        <CustomAlert
            open={openAlert}
            onClose={() => setOpenAlert(false)}
            severity={severity}
            duration={2500}
            text={errorMsg}
        />
    </>)
}

Login.getLayout = function getLayout(page) {
    return (
        <LayoutAuth>
            {page}
        </LayoutAuth>
    )
}