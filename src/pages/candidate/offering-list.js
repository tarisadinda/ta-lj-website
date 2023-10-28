import ProfileLayout from "@/components/candidate/layouts/profile-layout"
import OfferingCard from "@/components/candidate/offering/offering-card"
import styles from '@/styles/pages/candidate/OfferingList.module.scss'
import Link from "next/link"

export default function OfferingList() {
    return(<>
        <h2><b>Penawaran Saya</b></h2>
        <div className={styles.cardList}>
            <Link href='/candidate/offer-detail'>
                <OfferingCard />
            </Link>
        </div>
    </>)
}

OfferingList.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}