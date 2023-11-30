import styles from '@/styles/pages/company/CompanyProfile.module.scss'
import { Alert, AlertTitle, Avatar, Collapse } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import cn from 'classnames'
import { useRouter } from "next/router"
import LayoutMain from "@/components/company/layouts/main"
import { selectCompany } from "src/redux/common/companySlice"
import { useSelector } from "react-redux"
import IconBtn from "@/components/common/icon-button"
import { axiosInstance } from 'src/utils/axios'
import { API_COMPANY_PROFILE } from 'src/utils/api'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function CompanyProfile() {
    const router = useRouter()

    const company = useSelector(selectCompany); // Ambil data pengguna dari Redux store

    const [isDataCompleted, setIsDataCompleted] = useState(false)
    const [isVerified, setisVerified] = useState(false)
    const [dataCompany, setDataCompany] = useState()
    const editBtn = () => {
        router.push('/company/edit-company-profile')
    }

    console.log(dataCompany)

    const getProfileCompany = () => {
        axiosInstance.get(API_COMPANY_PROFILE)
        .then((res) => {
            console.log(res)
            setDataCompany(res.data.data)
        }).catch((err) => console.log(err))
    }
    console.log(dataCompany)

    useEffect(() => {
        getProfileCompany()
    }, [])

    useEffect(() => {
        if(dataCompany != null) {
            if(dataCompany.company_detail.status_completed == true) {
                setIsDataCompleted(true)
            }

            if(dataCompany.company_detail.status_verif == true) {
                setisVerified(true)
            }
        }
    }, [dataCompany])

    return (<>
        <div>
            {!isDataCompleted && 
                <Collapse in={true} sx={{ marginBottom: '20px' }}>
                    <Alert severity="warning"> 
                        <AlertTitle>Info</AlertTitle>
                        Silahkan lengkapi profil anda untuk bisa membuat lowongan pekerjaan.{" "}<strong><Link href='/company/edit-company-profile'>Lengkapi sekarang.</Link></strong>
                    </Alert>
                </Collapse>
            }
            {!isVerified && 
                <Alert severity="info" sx={{ marginBottom: '20px' }}>Menunggu verifikasi profil data oleh admin.</Alert>
            }
            <h3><b>Profil Perusahaan</b></h3>
            <div className={styles.profileCol}>
                <div className={styles.avaSection}>
                    <Avatar src={`http://localhost:3000/images/${dataCompany?.img}`} sx={{ width: 120, height: 120 }} />
                    <IconBtn
                        title="Edit Profil"
                        onClick={editBtn}
                        startIcon={<EditIcon />}
                        className={cn(styles.editBtn, "btn btn-primary blue")}
                    />
                </div>
                <div className={styles.dataSection}>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Nama Perusahaan</label>
                        <span className="col-6">{dataCompany?.full_name}</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Email Perusahaan</label>
                        <span className="col-6">{dataCompany?.email}</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Alamat Perusahaan</label>
                        <span className="col-6">{dataCompany?.company_detail?.address}</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Tentang Perusahaan</label>
                        <span className="col-6">{dataCompany?.company_detail?.about_company}</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Username</label>
                        <span className="col-6">{dataCompany?.username}</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Website</label>
                        <span className="col-6">metanesia.com</span>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

CompanyProfile.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}