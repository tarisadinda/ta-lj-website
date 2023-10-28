import LayoutMain from "@/components/candidate/layouts/main"
import styles from '@/styles/pages/candidate/OfferDetail.module.scss'
import { Card } from "@mui/material"
import PlaceIcon from '@mui/icons-material/Place'

export default function OfferDetail() {
    return(<>
        <div>
            <h2><b>Detail Penawaran</b></h2>
            <Card variant="outlined" className={styles.card}>
                <div>
                    <p className={styles.company}>PT Aruni Indonesia</p>
                    <p className={styles.role}>Web Developer</p>
                    <div className={styles.loc}>
                        <PlaceIcon />
                        <span>Malang, Jawa Timur</span>
                    </div>
                </div>
                <div className={styles.action}>
                    <button className="btn btn-primary blue">Terima Tawaran</button>
                    <button className="btn btn-danger red">Tolak Tawaran</button>
                </div>
            </Card>
        </div>
    </>)
}

OfferDetail.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}