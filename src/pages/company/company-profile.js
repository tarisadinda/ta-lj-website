import CustomIconButton from "@/components/common/icon-button"
import styles from '@/styles/pages/company/CompanyProfile.module.scss'
import { Avatar } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import cn from 'classnames'
import { useRouter } from "next/router"
import LayoutMain from "@/components/company/layouts/main"
import { selectCompany } from "src/redux/common/companySlice"
import { useSelector } from "react-redux"

export default function CompanyProfile() {
    const router = useRouter()

    const company = useSelector(selectCompany); // Ambil data pengguna dari Redux store

    const editBtn = () => {
        router.push('/edit-company-profile')
    }

    return (<>
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
                        <span className="col-6">{company?.full_name}</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Email Perusahaan</label>
                        <span className="col-6">{company?.email}</span>
                    </div>
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Alamat Perusahaan</label>
                        <span className="col-6">{company?.compay_detail?.address}</span>
                    </div>about_company
                    <div className={cn(styles.inputGroup, 'row')}>
                        <label className="col-4">Tentang Perusahaan</label>
                        <span className="col-6">{company?.compay_detail?.about_company}</span>
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