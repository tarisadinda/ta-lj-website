import cn from 'classnames'
import styles from '@/styles/components/candidate/offering/OfferingCard.module.scss'
import { Card } from "@mui/material"
import CompanyImg from 'public/images/company.jpg'
import Image from "next/image"
import PlaceIcon from '@mui/icons-material/Place'
import { CustomChip } from '@/components/common/chip'

export default function OfferingCard({data}) {
    return(<>
        <Card variant="outlined"
            sx={{ width: '100%', padding: '25px', borderRadius: '10px' }}
            className={styles.cardWrap}
        >
            <div className={styles.textLeft}>
                <Image 
                    alt="company-img"
                    src={data?.job?.company_detail?.user?.img}
                    width={100}
                    height={100}
                    className={styles.logoCompany}
                />
                <div>
                    <p className={styles.role}><b>{data?.job?.name}</b></p>
                    <p className='mb-0'>{data?.job?.company_detail?.user?.full_name}</p>
                    <div className={styles.loc}>
                        <PlaceIcon />
                        <span>Malang, Jawa Timur</span>
                    </div>
                </div>
            </div>
            <CustomChip label="Detail" bgcolor='#000' />
        </Card>
    </>)
}