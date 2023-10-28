import LayoutMain from "@/components/admin/layouts/main"
import styles from '@/styles/pages/admin/employee/Detail.module.scss'
import Avatar from '@mui/material/Avatar'
import Pic from '@/public/profilepic.jpg'

export default function NewAccountList() {
    return(<>
        <div className="d-inline-flex align-items-center gap-3">
            <Avatar
                alt="Profile picture"
                src={Pic}
                sx={{ width: 100, height: 100 }}
            />
            <div>
                <h3><b>Christian Wijaya</b></h3>
                <p className={styles.role}>Mobile developer</p>
            </div>
        </div>
        <div className={styles.tableSection}>
            <div className='row'>
                <div className="col-3"><b>Tanggal Membuat Akun</b></div>
                <div className="col-5">10 September 2022</div>
            </div>
            <div className='row'>
                <div className="col-3"><b>Email</b></div>
                <div className="col-5">christian_wijaya@gmail.com</div>
            </div>
            <div className='row'>
                <div className="col-3"><b>Nomor Telepon</b></div>
                <div className="col-5">085300455210</div>
            </div>
            <div className='row'>
                <div className="col-3"><b>Alamat</b></div>
                <div className="col-5">Perumahan Sentosa Mandiri Blok C3-12</div>
            </div>
            <div className='row'>
                <div className="col-3"><b>Kota/Kabupaten</b></div>
                <div className="col-5">Sidoarjo</div>
            </div>
            <div className='row'>
                <div className="col-3"><b>Deskripsi Diri</b></div>
                <div className="col-5">-</div>
            </div>
        </div> 
    </>)
}

NewAccountList.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}