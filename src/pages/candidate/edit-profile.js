import LayoutMain from "@/components/candidate/layouts/main"
import cn from 'classnames'
import styles from '@/styles/pages/candidate/EditProfile.module.scss'
import { Avatar, Card, IconButton, } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useRouter } from "next/router"

export default function EditProfil() {
    const router = useRouter()

    const cancelBtn = (e) => {
        e.preventDefault()
        router.push('/profile')
    }

    return(<>
        <h3 className={styles.profileText}><b>Edit Profil</b></h3>
        <div className={styles.avaRow}>
            <Avatar sx={{ width: 150, height: 150 }} />
            <div className={styles.groupBtn}>
                <button className="btn btn-primary blue">Ubah Foto Profil</button>
                <button className="btn btn-secondary blue">Hapus Foto Profil</button>
            </div>
        </div>
        <div className={styles.formSection}>
            <form>
                <div className={styles.inputGroup}>
                    <label>Nama Lengkap</label>
                    <input type="text" className="form-control" placeholder="Dio Putra, S.T." />
                </div>
                <div className={styles.inputGroup}>
                    <label>NRP</label>
                    <input type="text" className="form-control" placeholder="3511900056602" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="@dio_putra" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Email</label>
                    <input type="text" className="form-control" placeholder="dioputra@gmail.com" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Nomor Handphone</label>
                    <input type="text" className="form-control" placeholder="085203476772" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Alamat (opsional)</label>
                    <input type="text" className="form-control" placeholder="Perumahan Sentosa Mandiri Blok C3-12" />
                </div>
                <div className={styles.inputGroup}>
                    <label>Deskripsi diri (opsional)</label>
                    <textarea type="text" className="form-control" placeholder="Saya adalah lulusan mahasiswa teknik. Saya merupakan orang yang pekerja keras dan dapat bekerja dalam tim." />
                </div>
                <div className={styles.inputGroup}>
                    <label>Curriculum Vitae/Resume</label>
                    <Card 
                        variant="outline" 
                        sx={{
                            width: '350px'
                        }}
                    >
                        <div className={styles.cardGroup}>
                            <p>CV - Dio Putra.pdf</p>
                            <IconButton size="small">
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </div>
                    </Card>
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={cancelBtn} className={cn(styles.cancelBtn, "btn btn-secondary blue")}>Batal</button>
                    <button className={cn(styles.updateBtn, "btn btn-primary blue")}>Perbarui Profil</button>
                </div>
            </form>
        </div>
    </>)
}

EditProfil.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}