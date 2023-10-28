import styles from '@/styles/components/admin/dashboard/SummaryCard.module.scss'
import { Card } from '@mui/material'

export default function SummaryCard(props) {
    const { totalCount, companyCount, employeeCount } = props
    
    return(<>
        <Card variant="outlined" className={styles.cardWrap}>
            <p className={styles.count}><b>Total Akun: {totalCount}</b></p>
            <p>{companyCount} Akun Perusahaan</p>
            <p>{employeeCount} Akun Pekerja</p>
        </Card>
    </>)
}