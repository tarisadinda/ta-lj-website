import styles from '@/styles/pages/search-employee/Detail.module.scss'
import cn from 'classnames'
import CustomCard from "@/components/card"
import LayoutMain from "@/components/layouts/main"
import VerifiedIcon from '@mui/icons-material/Verified';
import { Avatar } from "@mui/material"

export default function SearchEmployeeDetail() {
    return(<>
        <CustomCard className={styles.wrapCard}>
            <div className={styles.avaInfo}>
                <Avatar sx={{ width: 110, height: 110 }} />
                <div className={styles.textInfo}>
                    <h4 className={styles.name}><b>Ryan</b></h4>
                    <p className={styles.role}>
                        <span>Web Developer - Level 2 </span>
                        <VerifiedIcon/>
                    </p>
                    <p className={styles.loc}>Malang, Jawa Timur</p>
                </div>
            </div>
            <button className={cn(styles.offerBtn, 'btn btn-primary blue')}>
                Beri Tawaran
            </button>
        </CustomCard>
        <div className={cn(styles.detail, 'mt-4')}>
            <div>
                <p><b>Email</b></p>
                <p>ryan123@gmail.com</p>
            </div>
            <div>
                <p><b>Nomor Handphone</b></p>
                <p>085203476772</p>
            </div>
        </div>
        <div className={styles.detail}>
            <div>
                <p><b>Keahlian Terverifikasi</b></p>
                <ol>
                    <li>Level 1 - Web Developer</li>
                    <li>Level 2 - Web Developer</li>
                    <li>Level 3 - Web Developer</li>
                </ol>
            </div>
            <div>
                <p><b>Curriculum Vitae/Resume</b></p>
                <p className={styles.pdf}>CV - Ryan.pdf</p>
            </div>
        </div>
        <div className={styles.historySection}>
            <p><b>Riwayat Pendaftaran</b></p>
            <ul>
                <li className={styles.itemHistory}>
                    <p>Digital Marketing - PT Sentosa Mandiri</p>
                    <p><b>Ditolak</b></p>
                    <p>Dilamar pada 8 Februari 2022</p>
                </li>
                <li className={styles.itemHistory}>
                    <p>Digital Marketing - PT Sentosa Mandiri</p>
                    <p><b>Ditolak</b></p>
                    <p>Dilamar pada 8 Februari 2022</p>
                </li>
            </ul>
        </div>
    </>)
}

SearchEmployeeDetail.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}