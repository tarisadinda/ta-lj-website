import LayoutMain from "@/components/admin/layouts/main"
import styles from '@/styles/pages/admin/company/DetailCompany.module.scss'
import Image from "next/image"
import cn from 'classnames'
import Laptop from '@/public/laptop-work.png'
import { CustomChip } from "@/components/common/chip"
import Link from "next/link"
import { useRouter } from "next/router"
import { axiosInstance } from "src/utils/axios"
import { API_COMPANY } from "src/utils/api"
import React from "react"

export default function DetailCompany() {
    const router = useRouter()
    const dataId = router.query.id

    const [company, setCompany] = React.useState('')
    console.log(router.query)

    const detailData = () => {
        axiosInstance.get(API_COMPANY + "/" + dataId)
        .then((res) => {
            console.log(res)
            setCompany(res.data)
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        detailData()
    }, [dataId])

    return(<>
        <Image src={Laptop} className={styles.logoCompany} width={150} height={150} alt="company-logo" />
        <div className="mt-2">
            {company.status == "0" ? 
                <CustomChip label='Belum Terverifikasi' bgcolor='#F1C93A' /> :
                <CustomChip label='Terverifikasi' bgcolor='#17AD47' /> 
            }
        </div>
        <div className={cn(styles.tableWrap, 'mt-2')}>
            <div className="row">
                <div className="col-2"><b>Tanggal Daftar</b></div>
                <div className="col-4">10 Juni 2022</div>
            </div>
            <div className="row">
                <div className="col-2"><b>Tanggal Verifikasi</b></div>
                <div className="col-4">-</div>
            </div>
        </div>
        <div className={cn(styles.tableWrap, 'mt-5')}>
            <div className="row">
                <div className="col-3"><b>Nama Perusahaan</b></div>
                <div className="col-6">{company.name}</div>
            </div>
            <div className="row">
                <div className="col-3"><b>Kategori Usaha</b></div>
                <div className="col-6">{company.category}</div>
            </div>
            <div className="row">
                <div className="col-3"><b>Provinsi</b></div>
                <div className="col-6">Jakarta Pusat</div>
            </div>
            <div className="row">
                <div className="col-3"><b>Kabupaten/Kota</b></div>
                <div className="col-6">Menteng</div>
            </div>
            <div className="row">
                <div className="col-3"><b>Tentang Perusahaan</b></div>
                <div className="col-6">{company.about_company}</div>
            </div>
            <div className="row">
                <div className="col-3"><b>Website</b></div>
                <div className="col-6"><Link href='#'>{company.website}</Link></div>
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