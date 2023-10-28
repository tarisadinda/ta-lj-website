import cn from 'classnames'
import LayoutMain from "@/components/admin/layouts/main"
import styles from '@/styles/pages/admin/skills/DetailSkill.module.scss'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { Card, DialogContent } from '@mui/material'
import CustomDialog from '@/components/common/dialog'
import React from 'react'
import CustomDropdown from '@/components/common/dropdown'

const statusData = [
    {
        label: 'Menunggu Konfirmasi',
        value: '1'
    },
    {
        label: 'Proses Sertifikasi',
        value: '2'
    },
    {
        label: 'Selesai',
        value: '3'
    },
    {
        label: 'Gagal',
        value: '4'
    },
]

export default function DetailSkill() {
    const [openDialog, setOpenDialog] = React.useState(false)
    const [selectStatus, setSelectStatus] = React.useState('1')
    
    //menunggu konfirm, proses sertifikasi, selesai, gagal
    const handleDialog = () => {
        setOpenDialog(!openDialog)
    }

    const handleStatus = (e) => {
        setSelectStatus(e.target.value)
    }

    return(<>
        <div>
            <p className={styles.name}><b>Christian Wijaya</b></p>
            <h5 className={styles.silverText}>Sidoarjo, Jawa Timur</h5>
            <h5 className={styles.silverText}>christian_wijaya@gmail.com / 085235667809</h5>
            <div className={styles.infoSection}>
                <div className="row">
                    <div className="col-3"><b>Tanggal Pengajuan</b></div>
                    <div className="col-5">10/9/2022</div>
                </div>
                <div className="row">
                    <div className="col-3"><b>Kategori Keahlian</b></div>
                    <div className="col-5">Teknologi</div>
                </div>
                <div className="row">
                    <div className="col-3"><b>Bidang Keahlian</b></div>
                    <div className="col-5">Mobile Developer</div>
                </div>
                <div className="row">
                    <div className="col-3"><b>Level</b></div>
                    <div className="col-5">Level 1</div>
                </div>
                <div className="row">
                    <div className="col-3"><b>Keterangan</b></div>
                    <div className="col-5">Menunggu konfirmasi dari pihak penyedia sertifikasi</div>
                </div>
                <div className="row">
                    <div className="col-3"><b>Lampiran</b></div>
                </div>
            </div>
            <div className={styles.actionBtn}>
                <button className={cn(styles.fileBtn, "btn btn-primary blue")}>
                    <InsertDriveFileIcon />
                    <span className={styles.nameCertif}><b>Sertifikat Junior Mobile Developer</b></span>
                </button>
            </div>
            <Card variant="outlined" className={styles.cardStatus}>
                <div className='d-inline-flex gap-3'>
                    <p className='mb-0'><b>Status Pengajuan</b></p>
                    <p  className='mb-0'>Menunggu konfirmasi</p>
                </div>
                <div className={styles.updateBtn}>
                    <button className='btn btn-primary blue' onClick={handleDialog}><b>Perbarui</b></button>
                </div>
            </Card>
        </div>
        <CustomDialog 
            open={openDialog} 
            handleClose={() => setOpenDialog(false)}
            title='Edit Status Pengajuan'
        >
            <DialogContent dividers>
                <div className='d-flex flex-column'>
                    <span className='mb-3'>Status Pengajuan</span>
                    <CustomDropdown data={statusData} value={selectStatus} onChange={handleStatus} />
                </div>
                <div className={styles.action}>
                    <button className='btn btn-secondary blue'>Cancel</button>
                    <button className='btn btn-primary blue' onClick={handleDialog}>Update</button>
                </div>
            </DialogContent>
        </CustomDialog>
    </>)
}

DetailSkill.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}