import Image from 'next/image'
import styles from '@/styles/components/candidate/application-list/company-card.module.scss'
import cn from 'classnames'
import { CustomChip } from '@/components/common/chip'

export default function CompanyCard() {
    return(<>
        <div className={cn(styles.companyCard, 'card')}>
            <div className={styles.infoCompany}>
                {/* <div className={styles.logoImg}>
                    <span>Logo Perusahaan</span>
                </div> */}
                <Image 
                    src="https://i.ibb.co/DfT5d3f/pexels-pixabay-269077.jpg" 
                    width={120} 
                    height={120} 
                    alt="Company picture"
                    className={styles.imgCompany}
                />
                <div>
                    <b>Mobile Developer</b>
                    <p>PT Metanesia Indonesia</p>
                    <span className={styles.lastApplied}>Lamaran dikirim pada 10 Oktober 2022</span>
                </div>
            </div>
            <CustomChip label='Dalam Review' bgcolor='#F98817' />
        </div>
    </>)
}