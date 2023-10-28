import styles from '@/styles/components/candidate/home/JobCard.module.scss'
import cn from 'classnames'
import Image from 'next/image'
import CompanyImg from 'public/images/company.jpg'
import { Chip } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { useRouter } from 'next/router'

export default function JobCard() {
    const router = useRouter()

    const applyBtn = () => {
        router.push('/about-vacancy')
    }

    return (<>
        <div>
            <div className={cn(styles.cardWrap, 'card')}>
                <div className={styles.row}>
                    <div className={styles.imgWrap}>
                        <Image 
                            src={CompanyImg} 
                            alt="company-img"
                            width={60}
                            height={60}
                            className={styles.logoCompany}
                        />
                    </div>
                    <div className={styles.companyName}>
                        <b>Mobile Developer</b>
                        <p>PT Metanesia Indonesia</p>
                    </div>
                </div>
                <div className={styles.companyTerms}>
                    <Chip 
                        sx={{
                            backgroundColor: '#458AEB',
                            color: '#F5F6FB'
                        }}
                        label="Full Time"
                    />
                    <Chip 
                        sx={{
                            backgroundColor: '#458AEB',
                            color: '#F5F6FB'
                        }}
                        label="WFO"
                    />
                </div>
                <div className={styles.textIcon}>
                    <LocationOnIcon />
                    <span>Gambir, Jakarta Pusat</span>
                </div>
                <div className={styles.textIcon}>
                    <AccountBalanceWalletIcon />
                    <span>Rp 4.000.000 - Rp 5.000.000</span>
                </div>
                <div className={styles.btnWrap}>
                    <button onClick={applyBtn} className={cn(styles.applyBtn, 'btn-primary blue')}>Lamar</button>
                </div>
            </div>
        </div>
    </>)
}