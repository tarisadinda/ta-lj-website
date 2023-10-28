import CustomIconButton from "@/components/common/icon-button"
import styles from '@/styles/pages/CompanyProfile.module.scss'
import LayoutMain from "@/components/layouts/main"
import { Avatar } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import cn from 'classnames'
import { useRouter } from "next/router"

export default function CompanyProfile() {
    const router = useRouter()

    const editBtn = () => {
        router.push('/edit-company-profile')
    }

    return(<>
        <div>
            <h3><b>Profil Perusahaan</b></h3>
            <div className={styles.profileCol}>
                <div className={styles.avaSection}>
                    <Avatar sx={{ width: 120, height: 120 }} />
                    <CustomIconButton 
                        text="Edit Profil"
                        onClick={editBtn}
                        icon={<EditIcon />}
                        className={cn(styles.editBtn, "btn btn-primary blue")}
                    />
                </div>
                <div className={styles.dataSection}>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Nama Perusahaan</label>
                        <span className="col-6">PT Metanesia</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Email Perusahaan</label>
                        <span className="col-6">metanesiacompany@gmail.com</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Alamat Perusahaan</label>
                        <span className="col-6">Jl Boulevard Timur No 88 RT5/RW2 Kelapa Gading Timur North Jakarta</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Tentang Perusahaan</label>
                        <span className="col-6">PT Metanesia Indonesia is a member of Dexagroup, one of Indonesia's largest ethical pharmaceutical company that engage in digital area. Aligning with technology advancement, PT Global Urban Esensial reaches the society wider, answering the society's needs for easier access to digital, and to be a leader in pharmaceutical business.</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Kategori Perusahaan</label>
                        <span className="col-6">Kesehatan</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Website</label>
                        <span className="col-6">metanesia.com</span>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

CompanyProfile.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}