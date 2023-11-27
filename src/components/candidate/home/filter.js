import styles from '@/styles/components/candidate/home/Filter.module.scss'
import cn from 'classnames'
import { Divider } from '@mui/material';

export default function Filter() {
    return (<>
        <div className={cn(styles.filterWrap, 'card')}>
            <b>Filter Pencarian</b>
            <Divider 
                sx={{
                    'opacity': '1'
                }}
            />
            <div className={styles.category}>
                <p>Waktu</p>
                <div className="form-check">
                    <input name='time' checked className="form-check-input" type="radio" value="" id="flexCheckDefault" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Semua
                    </label>
                </div>
                <div className="form-check">
                    <input name='time' className="form-check-input" type="radio" value="" id="flexCheckDefault1" />
                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                        Terbaru
                    </label>
                </div>
            </div>
            <div className={styles.category}>
                <p>Jenis Pekerjaan</p>
                <div className="form-check">
                    <input name='jobType' className="form-check-input" type="radio" value="" id="flexCheckDefault2" />
                    <label className="form-check-label" htmlFor="flexCheckDefault2">
                        Full time
                    </label>
                </div>
                <div className="form-check">
                    <input name='jobType' className="form-check-input" type="radio" value="" id="flexCheckDefault3" />
                    <label className="form-check-label" htmlFor="flexCheckDefault3">
                        Part time
                    </label>
                </div>
                <div className="form-check">
                    <input name='jobType' className="form-check-input" type="radio" value="" id="flexCheckDefault4" />
                    <label className="form-check-label" htmlFor="flexCheckDefault4">
                        Kontrak
                    </label>
                </div>
            </div>
        </div>
    </>)
}