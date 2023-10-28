import styles from '@/styles/pages/candidate/ApplicationDetail.module.scss'
import LayoutMain from '@/components/candidate/layouts/main'
import Image from 'next/image'
import CompanyImg from 'public/images/company.jpg'
import { Divider } from '@mui/material'
import { CustomChip } from '@/components/common/chip'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

export default function ApplicationDetail() {
    return(<>
        <h3 className='mb-4'><b>Detail Lamaran</b></h3>
        <div className={styles.jobTitle}>
            <Image 
                alt='company-logo'
                src={CompanyImg}
                width={100}
                height={100}
                className={styles.companyLogo}
            />
            <div>
                <h3>Mobile Developer</h3>
                <p className='mb-0'>PT Metanesia Indonesia</p>
            </div>
        </div>
        <Divider sx={{ borderWidth: '1px', borderColor: '#919293', margin: '25px 0px' }} />
        <div className={styles.colGrid}>
            <div>
                <p className={styles.statusText}>Status Lamaran</p>
                <CustomChip label='Dalam Review' bgcolor='#458AEB' />
                <p className='mt-2 mb-4'>Lamaran dikirim pada 10 Oktober 2022</p>
                <div>
                    <p className='mb-1'><b>Nomor Telepon</b></p>
                    <p>085203476772</p>
                </div>
                <div>
                    <p className='mb-1'><b>Email</b></p>
                    <p>dioputra@gmail.com</p>
                </div>
                <div>
                    <p className='mb-1'><b>Curriculum Vitae/Resume</b></p>
                    <p>CV - Dio Putra.pdf</p>
                </div>
            </div>
            <div>
                <p><b>Informasi Pekerjaan</b></p>
                <p><AccessTimeFilledIcon /> Fulltime</p>
                <p className='d-flex col-gap-3'><LocationOnIcon />
                    <span className={styles.workType}>
                        <span>WFO</span>
                        <span>Gambir, Jakarta Pusat</span>
                    </span>
                </p>
            </div>
        </div>
        <div className={styles.timeline}>
            <p className='mb-1'><b>Timeline Seleksi</b></p>
            <div className='d-grid gap-2'>
                <span><RadioButtonUncheckedIcon /> Interview HR</span>
                <span><CheckCircleIcon sx={{ color: '#24C70A' }} /> Interview User</span>
            </div>
        </div>
    </>)
}

ApplicationDetail.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}