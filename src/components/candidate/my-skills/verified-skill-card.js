import cn from 'classnames'
import styles from '@/styles/components/candidate/my-skills/VerifiedSkillCard.module.scss'
import { Card } from "@mui/material"
import VerifiedIcon from '@mui/icons-material/Verified'

export default function VerifiedSkillCard() {
    return(<>
        <Card 
            variant="outlined" 
            sx={{ padding: '20px', borderRadius: '10px', 
                display: 'flex', alignItems: 'center', 
                justifyContent: 'space-between', width: '600px' }}
        >
            <div className={styles.text}>
                <p className='d-flex align-items-center justify-content-start gap-2'>
                    <span>Level 1</span>
                    <VerifiedIcon />
                </p>
                <p><b>Mobile Developer</b></p>
            </div>
            <button className={cn(styles.detailBtn,'btn btn-secondary blue')}> 
                <b>Detail</b>
            </button>
        </Card>
    </>)
}