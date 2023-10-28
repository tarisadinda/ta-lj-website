import cn from 'classnames'
import { Avatar } from "@mui/material"
import styles from '@/styles/pages/candidate/ApplyJob.module.scss'
import LayoutMain from '@/components/candidate/layouts/main'
import Link from 'next/link'
import BorderColorIcon from '@mui/icons-material/BorderColor'

export default function ApplyJob() {
    return(<>
        <div className={cn(styles.companyCard, 'card')}>
            <div className={styles.companyInfo}>
                <Avatar variant="rounded" sx={{ width: 120, height: 120 }} />
                <div>
                    <h3><b>Mobile Developer</b></h3>
                    <h5 className={styles.compName}>PT Metanesia Indonesia</h5>
                    <p className={styles.loc}>Gambir, Jakarta Pusat</p>
                </div>
            </div>
        </div>
        <div className={styles.formSection}>
            <b className={styles.headline}>Form Pengajuan Lamaran</b>
            <div className={styles.cardApply}>
                <div className={styles.textDetail}>
                    <div className={styles.group}>
                        <button className={cn(styles.skillBtn, "btn")}>
                            <BorderColorIcon fontSize="small" className={styles.editIcon} />
                            <span>Edit Informasi</span>
                        </button>
                    </div>
                </div>
                <div className={styles.textDetail}>
                    <p className='mb-2'><b>Curriculum Vitae/Resume</b></p>
                    <Link href='#' className={styles.fileCV}>CV - Dio Putra.pdf</Link>
                    <span>Diupload pada 5 Juni 2022</span>
                    <span><b>Upload file dalam format PDF maks 5MB.</b></span>
                </div>
                <div className={styles.textDetail}>
                    <p className='mb-2'><b>Email</b></p>
                    <p className='mb-0'>dioputra@gmail.com</p>
                </div>
                <div className={styles.textDetail}>
                    <p className='mb-2'><b>Nomor Telepon</b></p>
                    <p className='mb-0'>085203476772</p>
                </div>
                <button className='btn btn-primary blue'>Kirim Lamaran</button>
                <button className='btn btn-secondary blue'>Batal</button>
            </div>
        </div>
    </>)
}

ApplyJob.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}