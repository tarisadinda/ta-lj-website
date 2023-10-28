import styles from '@/styles/pages/Dashboard.module.scss'
import LayoutMain from "@/components/layouts/main"
import { Avatar } from "@mui/material"
import WorkIcon from '@mui/icons-material/Work'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import CustomCard from "@/components/card"

export default function Dashboard() {
    return(<>
        <CustomCard className={styles.card}>
            <Avatar sx={{ bgcolor: '#FFC68E' }}>
                <WorkIcon />
            </Avatar>
            <p className='mb-0'>5 Lowongan kerja di buka</p>
        </CustomCard>
        <CustomCard className={styles.cardStatistic}>
            <Avatar sx={{ bgcolor: '#FFC68E' }}>
                <PeopleAltIcon />
            </Avatar>
            <div className={styles.details}>
                <h4><b>Statistik Pendaftar</b></h4>
                <p>Review : 10 Pelamar</p>
                <p>Seleksi : 3 Pelamar</p>
                <p>Ditolak : 8 Pelamar</p>
            </div>
        </CustomCard>
    </>)
}

Dashboard.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}
