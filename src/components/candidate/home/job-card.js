import styles from '@/styles/components/candidate/home/JobCard.module.scss'
import cn from 'classnames'
import Image from 'next/image'
import CompanyImg from 'public/images/company.jpg'
import { Chip } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { useRouter } from 'next/router'
import { formatRupiah } from 'src/utils/formatRupiah'
import { formatDate } from 'src/utils/date-formatter'
import React from 'react'
import EllipsisText from '@/components/common/ellipsis-text'

export default function JobCard({data, key}) {
    const router = useRouter()

    const applyBtn = () => {
        router.push(`/candidate/job/${data?.slug}`)
    }

    console.log(data)
    return (<>
        <div key={key}>
            <div className={cn(styles.cardWrap, 'card')}>
                <div>
                    <div className={styles.row}>
                        <div className={styles.imgWrap}>
                            <Image 
                                src={data?.company_detail?.user?.img ? data?.company_detail?.user?.img : CompanyImg} 
                                alt="company-img"
                                width={60}
                                height={60}
                                className={styles.logoCompany}
                            />
                        </div>
                        <div className={styles.companyName}>
                            <b>{data?.name}</b>
                            <p>{data?.company_detail?.user?.full_name}</p>
                        </div>
                    </div>
                    <div className={styles.companyTerms}>
                        <Chip 
                            sx={{
                                backgroundColor: '#458AEB',
                                color: '#F5F6FB'
                            }}
                            label={data?.career_level?.name}
                        />
                        <Chip 
                            sx={{
                                backgroundColor: '#458AEB',
                                color: '#F5F6FB'
                            }}
                            label={data?.job_type_work?.name}
                        />
                    </div>
                    <div className={styles.textIcon}>
                        <LocationOnIcon />
                        <EllipsisText maxLines={2} text={data?.company_detail?.address} />
                    </div>
                    <div className={styles.textIcon}>
                        <AccountBalanceWalletIcon />
                        <span>{formatRupiah(data?.salary_min)} - {formatRupiah(data?.salary_max)}</span>
                    </div>
                </div>
                <div className={styles.btnWrap}>
                    <span className='form-text'>{formatDate(data.createdAt)}</span>
                    <button onClick={applyBtn} className={cn(styles.applyBtn, 'btn-primary blue')}>Lamar</button>
                </div>
            </div>
        </div>
    </>)
}