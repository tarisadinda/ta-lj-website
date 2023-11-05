import React from 'react'
import LayoutAuth from '@/components/admin/layouts/auth'
import styles from '@/styles/pages/Register.module.scss'
import { useRouter } from "next/router"
import cn from 'classnames'
import Link from "next/link"
import InputIcon from '@/components/common/input-icon'
import SVGEye from '@/public/icons/eye.svg'
import SVGEyeClose from '@/public/icons/eye-closed.svg'
import { axiosInstance } from 'src/utils/axios'
import { API_REGIS } from 'src/utils/api'

export default function Register() {
    const router = useRouter()

    const [seePassword, setSeePassword] = React.useState(false)
    const [seeConfirmPass, setSeeConfirmPass] = React.useState(false)
    const [userAccount, setUserAccount] = React.useState({
        username: '',
        name: '',
        email: '',
        password: '',
        confirm_pass: '',
        phone_number: '',
        role_id: 1
    })

    console.log(userAccount)

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

    const submitForm = (e) => {
        e.preventDefault()

        const data = {
            name: userAccount.name,
            username: userAccount.username,
            email: userAccount.email,
            password: userAccount.password,
            confPassword: userAccount.confirm_pass,
            phone_number: userAccount.phone_number,
            role_id: userAccount.role_id
        }

        axiosInstance.post(API_REGIS, data)
        .then((res) => {
            console.log(res)
            // if(res.data.statusCode === 200) {
                
            // }
        }).catch((err) => console.log(err))
    }

    console.log(userAccount)
    
    return(<>
        <div className={styles.wrapper}>
            <h2 className="d-flex justify-content-center mb-4">Buat Akun</h2>
            <form onSubmit={submitForm}>
                <div className={styles.form}>
                    <div className={styles.inputField}>
                        <label htmlFor="role_id" className="form-label"><b>Role</b></label>
                        <select name="role_id" id="role_id" className="form-select" onChange={handleChange}>
                            <option value="1">Perusahaan</option>
                            <option value="2">Kandidat</option>
                        </select>
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="name" className="form-label"><b>Nama</b></label>
                        <input type="text" onChange={handleChange} className="form-control" id="name" name="name" placeholder="Masukkan nama perusahaan" />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="email" className="form-label"><b>Email</b></label>
                        <input type="email" onChange={handleChange} className="form-control" id="email" name="email" placeholder="Masukkan email perusahaan" />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="phone_number" className="form-label"><b>Nomor Telepon</b></label>
                        <input type="text" onChange={handleChange} className="form-control" id="phone_number" name="phone_number" placeholder="Masukkan nomor telepon perusahaan" />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="username" className="form-label"><b>Username</b></label>
                        <input type="text" onChange={handleChange} className="form-control" id="username" name="username" placeholder="Masukkan username perusahaan" />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="password" className="form-label"><b>Password</b></label>
                        <InputIcon 
                            placeholder="Masukkan password"
                            id="password"
                            name="password"
                            type={seePassword ? "text" : "password"}
                            onClick={handleVisibility}
                            onChange={handleChange}
                            icon={seePassword ? <SVGEyeClose className={styles.eyeIcon} /> : <SVGEye className={styles.eyeIcon} />}
                        />
                    </div>
                    <div className={styles.inputField}>
                        <label htmlFor="confirmPass" className="form-label"><b>Konfirmasi Password</b></label>
                        <InputIcon 
                            placeholder="Masukkan konfirmasi password"
                            id="confirm_pass"
                            name="confirm_pass"
                            type={seeConfirmPass ? "text" : "password"}
                            onClick={handleSeeConfirmPass}
                            onChange={handleChange}
                            icon={seeConfirmPass ? <SVGEyeClose className={styles.eyeIcon} /> : <SVGEye className={styles.eyeIcon} />}
                        />
                    </div>
                    <button type='submit' className={cn(styles.regisBtn, "btn btn-primary blue")}>Daftar</button>
                </div>
            </form>
            <span className={cn(styles.loginWrap, "mt-3 mb-4")}>Sudah punya akun? <Link className={styles.loginBtn} href='/login'>Login</Link></span>
        </div>
    </>)
}

Register.getLayout = function getLayout(page) {
    return (
        <LayoutAuth>
            {page}
        </LayoutAuth>
    )
}