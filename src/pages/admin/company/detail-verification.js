import LayoutMain from "@/components/admin/layouts/main"
import cn from 'classnames'
import styles from '@/styles/pages/admin/company/DetailVerification.module.scss'
import { Card } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import Laptop from '@/public/laptop-work.png'
import Image from "next/image"
import Link from "next/link"

export default function DetailVerification() {
    return(<>
        <h3><b>Permintaan Verifikasi</b></h3>
        <Card className={styles.infoWrapper} variant="outlined">
            <Image src={Laptop} className={styles.logoCompany} width={150} height={150} alt="company-logo" />
            <div className="d-flex flex-column justify-content-around">
                <div>
                    <p className={styles.companyName}>PT Indonesia Sejahtera</p>
                    <p className={styles.loc}>
                        <PlaceIcon />
                        Malang, Jawa Timur
                    </p>
                </div>
                <div className={styles.actionBtn}>
                    <button className={cn(styles.button, "btn btn-primary blue")}>Terima</button>
                    <button className={cn(styles.button, "btn btn-secondary blue")}>Tolak</button>
                </div>
            </div>
        </Card>
        <div className="mt-3">
            <p><b>Tanggal mendaftar: 10 September 2022</b></p>
            <div>
                <div className="row">
                    <p className="col-2"><b>Email</b></p>
                    <p className="col-6"><Link href='#'>indonesia.sejahtera@company.mail</Link></p>
                </div>
                <div className="row">
                    <p className="col-2"><b>Nomor Telepon</b></p>
                    <p className="col-6">085205667212</p>
                </div>
                <div className="row">
                    <p className="col-2"><b>Kategori Usaha</b></p>
                    <p className="col-6">Teknologi</p>
                </div>
                <div className="row">
                    <p className="col-2"><b>Alamat</b></p>
                    <p className="col-6">Jalan Iskandarsyah II No.7, RW. 2, Melawai, Kebayoran Baru, RT.3/RW.1, Melawai, Kby. Baru Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta</p>
                </div>
                <div className="row">
                    <p className="col-2"><b>Provinsi</b></p>
                    <p className="col-6">DKI Jakarta</p>
                </div>
                <div className="row">
                    <p className="col-2"><b>Kabupaten/Kota</b></p>
                    <p className="col-6">Jakarta Selatan</p>
                </div>
            </div>
        </div>
    </>)
}

DetailVerification.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}