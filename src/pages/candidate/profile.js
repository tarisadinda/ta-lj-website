import cn from 'classnames'
import styles from '@/styles/pages/candidate/Profile.module.scss'
import { Avatar, Card, IconButton } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import { useRouter } from "next/router"
import Link from "next/link"
import ProfileLayout from "@/components/candidate/layouts/profile-layout"

export default function Profile() {
    const router = useRouter()

    const editInfo = () => {
        router.push('/edit-profile')
    }
    
    return(<>
        <Card variant="outlined" className={styles.infoCard}>
            <div>
                <div className={styles.editGroup}>
                    <b>NRP</b>
                    <div className={styles.group}>
                        <button className={cn(styles.skillBtn, "btn")} onClick={editInfo}>
                            <BorderColorIcon fontSize="small" className={styles.editIcon} />
                            <span>Edit Informasi</span>
                        </button>
                    </div>
                </div>
                <p>3511900056602</p>
            </div>
            <div>
                <b>Email</b>
                <p>dioputra@gmail.com</p>
            </div>
            <div>
                <b>Nomor Handphone</b>
                <p>085203476772</p>
            </div>
            <div>
                <b>Alamat</b>
            </div>
            <div>
                <b>Detail</b>
                <p>Perumahan Sentosa Mandiri Blok C3-12</p>
            </div>
            <div>
                <b>Kota/Kabupaten</b>
                <p>Surabaya, Jawa Timur</p>
            </div>
            <div className={styles.skillSection}>
                <div className={styles.editGroup}>
                    <b>Keahlian</b>
                    <div className={styles.group}>
                        <button className={cn(styles.skillBtn, "btn")}>
                            <BorderColorIcon fontSize="small" className={styles.editIcon} />
                            <span>Edit Keahlian</span>
                        </button>
                    </div>
                </div>
                <div className={styles.skillList}>
                    <Link href='/my-skill-detail'>
                        <Card variant="outline" className={styles.boxWrap}>
                            <div className={styles.textBtn}>
                                <div className={styles.group}>
                                    <b>Mobile Developer</b>
                                    <span>Level 1</span>
                                </div>
                                <NavigateNextIcon />
                            </div>
                        </Card>
                    </Link>
                    <Card variant="outline" className={styles.boxWrap}>
                        <div className={styles.textBtn}>
                            <div className={styles.group}>
                                <b>Mobile Developer</b>
                                <span>Level 1</span>
                            </div>
                            <NavigateNextIcon />
                        </div>
                    </Card>
                </div>
            </div>
        </Card>
    </>)
}

Profile.getLayout = function getLayout(page) {
    return (
        <ProfileLayout>
            {page}
        </ProfileLayout>
    )
}