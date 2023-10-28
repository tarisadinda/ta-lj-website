import cn from 'classnames'
import IconWithButton from "@/components/common/icon-button"
import LayoutMain from "@/components/candidate/layouts/main"
import styles from '@/styles/pages/candidate/ApplySkillDetail.module.scss'
import { Card } from "@mui/material"
import BadgeIcon from '@mui/icons-material/Badge'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

export default function ApplySkillDetail() {
    return(<>
        <h3 className="mb-4"><b>Detail Pengajuan</b></h3>
        <div className={styles.gridWrapper}>
            <div>
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: '10px',
                        padding: '20px',
                        border: '1px solid #1C55FF'
                    }}
                >
                    <h4>UI/UX Designer</h4>
                    <p className="mb-2">Level 1</p>
                    <p className={styles.category}>Kategori Teknologi</p>
                    <p className="mb-2 mt-4"><b>Keterangan: </b>menunggu konfirmasi dari pihak penyedia sertifikasi</p>
                    <p className="mb-0">Tanggal pengajuan: 12 Desember 2022</p>
                    <div className='mt-4'>
                        <p className="mb-2"><b>Lampiran</b></p>
                        <IconWithButton className={cn(styles.fileBtn, 'btn btn-primary blue')}>
                            <InsertDriveFileIcon />
                            <span><b>Sertifikat Junior Mobile Developer</b></span>
                        </IconWithButton>
                    </div>
                </Card>
            </div>
            <div>
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: '10px',
                        padding: '20px',
                        border: '1px solid #1C55FF'
                    }}
                >
                    <p className='mb-2 d-flex align-items-center gap-2'>
                        <BadgeIcon />
                        <span><b>Informasi Peserta</b></span>
                    </p>
                    <p className='mb-1'>Dio Putra</p>
                    <p className='mb-1'>dioputra@gmail.com</p>
                    <p className='mb-0'>085203476772</p>
                </Card>
                <Card
                    variant="outlined"
                    sx={{
                        borderRadius: '10px',
                        padding: '20px',
                        marginTop: '20px'
                    }}
                >
                    <p className='mb-1'><b>Status Pengajuan</b></p>
                    <p>Proses Sertifikasi</p>
                    <p className='mt-3 mb-1'><b>Lokasi Pelatihan/Sertifikasi</b></p>
                    <p className='mb-1'>Online/Offline</p>
                    <p className='mb-1'>Zoom/Balai Pelatihan Jawa Timur</p>
                </Card>
            </div>
        </div>
    </>)
}

ApplySkillDetail.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}