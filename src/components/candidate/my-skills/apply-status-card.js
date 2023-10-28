import { Card } from "@mui/material";
import { CustomChip } from "@/components/common/chip";

export default function ApplyStatusCard() {
    return(<>
        <Card
            variant="outlined"
            sx={{ padding: '20px', borderRadius: '10px', 
                display: 'flex', alignItems: 'center', 
                justifyContent: 'space-between', width: '600px' }}
        >
            <div>
                <p className="mb-1"><b>UI/UX Designer - Level 1</b></p>
                <p className="mb-0">Diajukan tanggal 12 Desember 2022</p>
                <span style={{ fontSize: '12px' }}>Penilaian Offline</span>
            </div>
            <CustomChip label='Proses Sertifikasi' bgcolor='#458AEB' />
        </Card>
    </>)
}