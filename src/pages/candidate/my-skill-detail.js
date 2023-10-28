
import LayoutMain from "@/components/candidate/layouts/main"
import cn from 'classnames'
import styles from '@/styles/pages/candidate/MySkillDetail.module.scss'
import { Card } from "@mui/material"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import IconWithButton from "@/components/common/icon-button"
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'

export default function MySkillDetail() {
    return(<>
        <h3 className="mb-4"><b>Detail Keahlian</b></h3>
        <Card variant="outlined"
            sx={{ padding: '35px', borderRadius: '10px' }}
        >
            <h5><b>Mobile Developer</b></h5>
            <p>Level 1</p>
            <p>Penilaian <i>Online</i></p>
            <div>
                <p className="mb-0">Tanggal Pelatihan/Unggah Dokumen Sertifikasi</p>
                <span><CalendarMonthIcon /> <b>25 September 2022</b></span>
            </div>
            <p className="my-2">Tanggal Verifikasi Diberikan : <b>12 November 2022</b></p>
            <div>
                <p>Lampiran</p>
                <IconWithButton className={cn(styles.fileBtn, 'btn btn-primary blue')}>
                    <InsertDriveFileIcon />
                    <span><b>Sertifikat Junior Mobile Developer</b></span>
                </IconWithButton>
            </div>
        </Card>
    </>)
}

MySkillDetail.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}