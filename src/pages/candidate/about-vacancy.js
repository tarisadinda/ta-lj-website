import cn from 'classnames'
import styles from '@/styles/pages/candidate/AboutVacancy.module.scss'
import Avatar from '@mui/material/Avatar'
import LayoutMain from '@/components/candidate/layouts/main'
import { Tabs, Tab, Card } from '@mui/material'
import React from 'react'
import CompanyDetail from '@/components/candidate/about-vacancy/company-detail'
import VacancyDetail from '@/components/candidate/about-vacancy/vacancy-detail'
import { useRouter } from 'next/router'

export default function AboutVacancy() {
    const router = useRouter()
    const [selectedTab, setSelectedTab] = React.useState(0)

    const handleTab = (event, newValue) => {
        setSelectedTab(newValue)
    }

    const applyBtn = () => {
        router.push('/candidate/apply-job')
    }

    return (<>
        <div className={cn(styles.companyCard, 'card')}>
            <div className={styles.companyInfo}>
                <Avatar variant="rounded" sx={{ width: 120, height: 120 }} />
                <div>
                    <h3>Mobile Developer</h3>
                    <h5 className={styles.compName}>PT Metanesia Indonesia</h5>
                    <p className={styles.loc}>Gambir, Jakarta Pusat</p>
                    <button className={cn(styles.applyBtn, 'btn-primary blue')} onClick={applyBtn}>Lamar Sekarang</button>
                </div>
            </div>
        </div>
        <div className={styles.actionBtn}>
            {/* <button className={cn(styles.jobBtn, 'btn btn-primary blue')}>
                Tentang Pekerjaan
            </button>
            <button className={cn(styles.companyBtn, 'btn btn-secondary blue')}>
                Tentang Perusahaan
            </button> */}
            <Tabs value={selectedTab} onChange={handleTab}>
                <Tab 
                    label="Tentang Pekerjaan" 
                    sx={{
                        textTransform: 'capitalize'
                    }}
                />
                <Tab 
                    label="Tentang Perusahaan" 
                    sx={{
                        textTransform: 'capitalize'
                    }}
                />
            </Tabs>
        </div>
        {selectedTab === 0 ? <VacancyDetail /> : <CompanyDetail />}
    </>)
}

AboutVacancy.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}