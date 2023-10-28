import LayoutMain from "@/components/candidate/layouts/main"
import styles from '@/styles/pages/candidate/MyApplication.module.scss'
import ApplicationCard from "@/components/candidate/my-application/application-card"
import SideMenu from "@/components/candidate/side-menu"

export default function MyApplication() {
    const MenuData = [
        {
            label: 'Lamaran Saya',
            value: 1,
            path: '/candidate/application-list'
        },
        {
            label: 'Keahlian Saya',
            value: 2
        },
        {
            label: 'Penawaran',
            value: 3
        },
    ]

    return(<>
        <h3 className="mb-4"><b>Daftar Lamaran Saya</b></h3>
        <div className={styles.colGroup}>
            <SideMenu data={MenuData} />
            <div className={styles.cardList}>
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
            </div>
        </div>
    </>)
}

MyApplication.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}