import styles from '@/styles/components/candidate/my-application/ApplicationCard.module.scss'
import { Card } from "@mui/material"
import Image from "next/image"
import CompanyImg from 'public/images/company.jpg'
import { CustomChip } from '@/components/common/chip'

export default function ApplicationCard() {
    return(<>
        <Card className={styles.cardWrapper} variant="outlined" sx={{ width: '100%', padding: '25px', borderRadius: '10px' }}>
            <div className={styles.groupText}>
                <Image 
                    alt="company-img"
                    src={CompanyImg}
                    width={100}
                    height={100}
                    className={styles.logoCompany}
                />
                <div className={styles.text}>
                    <p><b>Mobile Developer</b></p>
                    <p>PT Metanesia Indonesia</p>
                    <p className={styles.appliedDate}>Lamaran dikirim pada 10 Oktober 2022</p>
                </div>
            </div>
            <div>
                <CustomChip label='Dalam Review' bgcolor='#458AEB' />
            </div>
        </Card>
    </>)
}