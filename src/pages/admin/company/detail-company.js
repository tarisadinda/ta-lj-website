import LayoutMain from "@/components/admin/layouts/main"
import styles from '@/styles/pages/admin/company/DetailCompany.module.scss'
import Image from "next/image"
import cn from 'classnames'
import Laptop from '@/public/laptop-work.png'
import { CustomChip } from "@/components/common/chip"
import Link from "next/link"

export default function DetailCompany() {
    return(<>
        <Image src={Laptop} className={styles.logoCompany} width={150} height={150} alt="company-logo" />
        <div className="mt-2">
            <CustomChip label='Belum Terverifikasi' bgcolor='#F1C93A' />
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
                <div className="col-6">PT Metanesia Indonesia</div>
            </div>
            <div className="row">
                <div className="col-3"><b>Kategori Usaha</b></div>
                <div className="col-6">Kesehatan</div>
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
                <div className="col-6">PT Metanesia Indonesia is a member of Dexagroup, one of Indonesias largest ethical pharmaceutical company that engage in digital area. Aligning with technology advancement, PT Global Urban Esensial reaches the society wider, answering the societys needs for easier access to digital, and to be a leader in pharmaceutical business. </div>
            </div>
            <div className="row">
                <div className="col-3"><b>Website</b></div>
                <div className="col-6"><Link href='#'>metanesia.co.id</Link></div>
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