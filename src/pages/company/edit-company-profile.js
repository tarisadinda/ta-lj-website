import CustomAlert from "@/components/common/alert"
import LayoutMain from "@/components/company/layouts/main"
import styles from '@/styles/pages/company/EditCompanyProfile.module.scss'
import { Avatar } from "@mui/material"
import cn from 'classnames'
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { alertMessage, openAlert, setMessage, setOpenAlert, setSeverity, severity } from "src/redux/common/alertSlice"
import { API_COMPANY_PROFILE } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"
import { dataCompany } from "src/utils/data-cookies"

export default function CompanyEditForm() {
    const router = useRouter()
    const dispatch = useDispatch()

    const imageRef = React.useRef(null)
    const tempDataCompany = typeof window != undefined ? getCookie("company_detail") : null
    const readDataCompany = tempDataCompany != null ? JSON.parse(tempDataCompany) : null

    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)
    const alertSeverity = useSelector(severity)

    const [companyImg, setCompanyImg] = React.useState('')
    const [imgPreview, setImgPreview] = React.useState('')
    const [formData, setFormData] = React.useState({
        full_name: readDataCompany != null ? readDataCompany.full_name : "",
        email: readDataCompany != null ? readDataCompany.email : "",
        phone_number: readDataCompany != null ? readDataCompany.company_detail.phone_number : "",
        address: readDataCompany != null ? readDataCompany.company_detail.address : "",
        about_company: readDataCompany != null ? readDataCompany.company_detail.about_company : ""
    })
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const selectImage = (e) => {
        e.preventDefault()

        imageRef.current.click()
    }

    const uploadImage = (e) => {
        console.log(e.target.files[0])
        setCompanyImg(e.target.files[0])
        setImgPreview(URL?.createObjectURL(e.target.files[0]))
    }

    console.log(imgPreview)
    console.log(companyImg)
    console.log(readDataCompany)

    const cancelBtn = (e) => {
        e.preventDefault()

        router.back()
    }
    
    const updateProfile = (e) => {
        e.preventDefault()

        let submitData

        if(companyImg == "") {
            submitData = {
                address: formData.address,
                phone_number: formData.phone_number,
                logo_company: readDataCompany.img,
                about_company: formData.about_company,
            }
        } else {
            submitData = {
                address: formData.address,
                phone_number: formData.phone_number,
                logo_company: companyImg,
                about_company: formData.about_company
            }
        }
        
        axiosInstance.post(API_COMPANY_PROFILE, submitData)
        .then((res) => {
            console.log(res)
            dispatch(setOpenAlert(true))
            dispatch(setMessage('Data berhasil diperbarui!'))
            dispatch(setSeverity('success'))

            router.push('/company/company-profile')
        }).catch((err) => {
            console.log(err)
            dispatch(setOpenAlert(true))
            dispatch(setMessage(err.response.data.message))
            dispatch(setSeverity('error'))
        })
    }

    const removeImg = () => {
        setCompanyImg('')
        setImgPreview('')
    }

    return(<>
        <div>
            <h3><b>Edit Profil Perusahaan</b></h3>
            <div className={styles.avaSection}>
                <Avatar 
                    sx={{ width: 150, height: 150, objectFit: 'contain' }} 
                    src={imgPreview == "" ? readDataCompany?.img : imgPreview} 
                />
                <div className={styles.btnList}>
                    <input 
                        type="file"
                        style={{ display: 'none' }}
                        ref={imageRef}
                        accept="image/*"
                        onChange={uploadImage}
                    />
                    <button onClick={selectImage} className={cn(styles.actionBtn, "btn btn-primary blue")}>Ubah Foto Profil</button>
                    <button onClick={removeImg} className={cn(styles.actionBtn, "btn btn-secondary blue")}>Hapus Foto Profil</button>
                </div>
            </div>
            <div className={styles.formSection}>
                <form>
                    <div className={styles.inputGroup}>
                        <label>Nama Perusahaan</label>
                        <input 
                            type="text" 
                            placeholder="Masukkan nama perusahaan" 
                            className="form-control" 
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Perusahaan</label>
                        <input 
                            type="email" 
                            placeholder="Masukkan email perusahaan" 
                            className="form-control" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Nomor Telepon</label>
                        <input 
                            type="text" 
                            placeholder="Masukkan nomor telepon perusahaan" 
                            className="form-control" 
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Alamat Perusahaan</label>
                        <textarea 
                            placeholder="Masukkan alamat perusahaan" 
                            className="form-control" 
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Tentang Perusahaan</label>
                        <textarea 
                            placeholder="Deskripsikan perusahaan anda" 
                            className={cn(styles.about, "form-control")}
                            name="about_company"
                            value={formData.about_company}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formBtn}>
                        <button onClick={cancelBtn} className="btn btn-secondary blue">Batal</button>
                        <button onClick={updateProfile} className="btn btn-primary blue">Perbarui Profil</button>
                    </div>
                </form>
            </div>
        </div>
        <CustomAlert 
            open={isOpenAlert} 
            severity={alertSeverity}
            text={alertMsg}
            duration={2800} 
            onClose={() => dispatch(setOpenAlert(false))} 
        />
    </>)
}

CompanyEditForm.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}