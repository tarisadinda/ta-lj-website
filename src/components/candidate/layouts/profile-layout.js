import cn from 'classnames'
import styles from '@/styles/components/candidate/layouts/ProfileLayout.module.scss'
import SideMenu from '@/components/candidate/side-menu'
import { Avatar, IconButton } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import SVGVerified from '@/public/icons/verified.svg'
import Navbar from '@/components/candidate/navbar'

export default function ProfileLayout({ children }) {
    const MenuData = [
        {
            label: 'Lamaran Saya',
            value: 1,
            path: '/candidate/application-list'
        },
        {
            label: 'Keahlian Saya',
            value: 2,
            path: '/candidate/my-skills'
        },
        {
            label: 'Penawaran',
            value: 3,
            path: '/candidate/offering-list'
        },
    ]

    return(<>
        <Navbar />
        <div 
            className='container'
            style={{
                paddingTop: '80px',
                marginBottom: '40px'
            }}
        >
            <div className={styles.profileName}>
                <div className={styles.avaWrap}>
                    <Avatar sx={{ width: 100, height: 100 }} />
                    <IconButton variant="contained" size="small" className={styles.editBtn}>
                        <BorderColorIcon className={styles.editIcon} fontSize="inherit" color="black" />
                    </IconButton>
                </div>
                <div>
                    <h4><b>Dio Putra, S.T</b></h4>
                    <p className={cn(styles.levelGroup, "mb-0")}>Level 2 <SVGVerified className={styles.verifIcon} /></p>
                </div>
            </div>
            <div className={styles.wrapper}>
                <SideMenu data={MenuData} />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </div>
    </>)
}