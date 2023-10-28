import CompanyCard from '@/components/candidate/application-list/company-card'
import ProfileLayout from '@/components/candidate/layouts/profile-layout'
import SideMenu from '@/components/candidate/side-menu'
import styles from '@/styles/pages/candidate/ApplicationList.module.scss'
import Link from 'next/link'

export default function ApplicationList() {
    return(<>
        <h2><b>Daftar Lamaran Saya</b></h2>
        <div className={styles.cardList}>
            <Link href='/candidate/application-detail'>
                <CompanyCard />
            </Link>
            <CompanyCard />
        </div>
    </>)
}

ApplicationList.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}