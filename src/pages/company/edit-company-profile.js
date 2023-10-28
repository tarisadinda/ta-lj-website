import LayoutMain from "@/components/layouts/main"
import styles from '@/styles/pages/EditCompanyProfile.module.scss'
import { Avatar } from "@mui/material"
import cn from 'classnames'
import { useRouter } from "next/router"

export default function CompanyEditForm() {
    const router = useRouter()

    const cancelBtn = (e) => {
        e.preventDefault()

        router.back()
    }
    
    return(<>
        <div>
            <h3><b>Edit Profil Perusahaan</b></h3>
            <div className={styles.avaSection}>
                <Avatar sx={{ width: 150, height: 150 }} />
                <div className={styles.btnList}>
                    <button className={cn(styles.actionBtn, "btn btn-primary blue")}>Ubah Foto Profil</button>
                    <button className={cn(styles.actionBtn, "btn btn-secondary blue")}>Hapus Foto Profil</button>
                </div>
            </div>
            <div className={styles.formSection}>
                <form>
                    <div className={styles.inputGroup}>
                        <label>Nama Perusahaan</label>
                        <input type="text" placeholder="Masukkan nama perusahaan" className="form-control" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Email Perusahaan</label>
                        <input type="email" placeholder="Masukkan email perusahaan" className="form-control" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Alamat Perusahaan</label>
                        <textarea placeholder="Masukkan alamat perusahaan" className="form-control" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Tentang Perusahaan</label>
                        <textarea placeholder="Deskripsikan perusahaan anda" className="form-control" />
                    </div>
                    <div className={styles.inputGroup}>
                        <label>Kategori Perusahaan</label>
                        <select className="form-select">
                            <option value="1">1</option>
                            <option value="1">2</option>
                            <option value="1">3</option>
                            <option value="1">4</option>
                        </select>
                    </div>
                    <div className={styles.formBtn}>
                        <button onClick={cancelBtn} className="btn btn-secondary blue">Batal</button>
                        <button className="btn btn-primary blue">Perbarui Profil</button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}

CompanyEditForm.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}