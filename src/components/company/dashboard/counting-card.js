import styles from '@/styles/components/dashboard/CountingCard.module.scss'
import cn from 'classnames'

export default function CountingCard({title, total}) {
    return(<>
        <div className={cn(styles.wrapper, 'card')}>
            <h1 className='m-0'><b>{total}</b></h1>
            <p className={cn(styles.labelCount, 'm-0')}>{title}</p>
        </div>
    </>)
}