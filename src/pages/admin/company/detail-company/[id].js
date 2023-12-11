import LayoutMain from "@/components/admin/layouts/main"
import styles from '@/styles/pages/admin/company/DetailCompany.module.scss'
import Image from "next/image"
import cn from 'classnames'
import Laptop from '@/public/laptop-work.png'
import { CustomChip } from "@/components/common/chip"
import Link from "next/link"
import { useRouter } from "next/router"
import { axiosInstance } from "src/utils/axios"
import { API_USERS } from "src/utils/api"
import React from "react"
import { Avatar } from "@mui/material"
import { formatDate } from "src/utils/date-formatter"

export default function DetailCompany() {
    const router = useRouter()
    const dataId = router.query.id

    const [company, setCompany] = React.useState('')
    console.log(company)

    const detailData = () => {
        axiosInstance.get(API_USERS + "/" + dataId)
        .then((res) => {
            console.log(res)
            setCompany(res.data.data.user)
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        detailData()
    }, [dataId])

    return(<>
        {company.img?.includes("null") ? 
            <Avatar sx={{ width: 100, height: 100 }} /> :
            <Image 
                src={company.img} 
                className={styles.logoCompany} 
                width={150} height={150} 
                alt="company-logo" 
            />    
        }
        
        <div className="mt-2">
            {company.company_detail?.status_verif != true ? 
                <CustomChip label='Belum Terverifikasi' bgcolor='#F1C93A' /> :
                <CustomChip label='Terverifikasi' bgcolor='#17AD47' /> 
            }
        </div>
        <div className={cn(styles.tableWrap, 'mt-2')}>
            <div className="row">
                <div className="col-2"><b>Tanggal Daftar</b></div>
                <div className="col-4">{formatDate(company.createdAt)}</div>
            </div>
            <div className="row">
                <div className="col-2"><b>Tanggal Verifikasi</b></div>
                <div className="col-4">-</div>
            </div>
        </div>
        <div className={cn(styles.tableWrap, 'mt-5')}>
            <div className="row">
                <div className="col-3"><b>Nama Perusahaan</b></div>
                <div className="col-6">{company.full_name}</div>
            </div>
            <div className="row">
                <div className="col-3"><b>Email Perusahaan</b></div>
                <div className="col-6">{company.email}</div>
            </div>
            <div className="row">
                <div className="col-3"><b>Alamat</b></div>
                <div className="col-6">{company.company_detail?.address == null ? "-" : company.company_detail?.address}</div>
            </div>
            <div className="row">
                <div className="col-3"><b>Tentang Perusahaan</b></div>
                <div className="col-6">{company.company_detail?.about_company == null ? "-" : company.company_detail?.about_company}</div>
            </div>
        </div>
    </>)
}

DetailCompany.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}