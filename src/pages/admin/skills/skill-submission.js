import React from 'react'
import CustomDropdown from "@/components/common/custom-dropdown"
import LayoutMain from "@/components/layouts/main"
import CustomTable from "@/components/common/table"
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useRouter } from 'next/router'

const statusData = [
    {
        label: 'Semua',
        value: 'all'
    },
    {
        label: 'Terverifikasi',
        value: 'verif'
    },
    {
        label: 'Belum terverifikasi',
        value: 'unverif'
    },
]

const dummyData = [
    {
        date: '10/9/2022',
        full_name: 'Christian Wijaya',
        email: 'christian_wijaya@gmail.com',
        skill: 'Mobile developer',
        status: 'Menunggu Konfirmasi'
    },
    {
        date: '14/9/2022',
        full_name: 'Andira',
        email: 'andira2001@gmail.com',
        skill: 'Mobile developer',
        status: 'Menunggu Konfirmasi'
    },
    {
        date: '5/10/2022',
        full_name: 'Riko Kurniawan',
        email: 'riko@gmail.com',
        skill: 'Web developer',
        status: 'Menunggu Konfirmasi'
    }
]

export default function SkillSubmission() {
    const router = useRouter()
    const [chooseStatus, setChooseStatus] = React.useState('all')

    const detailBtn = (id) => {
        console.log('Detail: ' + id)
        router.push('/skills/detail')
    }

    const colList = [
        {
            id: 'date',
            label: 'Tanggal Pengajuan',
            render: (data) => <span>{data.date}</span>
        },
        {
            id: 'full_name',
            label: 'Nama Lengkap',
            render: (data) => <span>{data.full_name}</span>
        },
        {
            id: 'email',
            label: 'Email',
            render: (data) => <span>{data.email}</span>
        },
        {
            id: 'skill',
            label: 'Keahlian',
            render: (data) => <span>{data.skill}</span>
        },
        {
            id: 'status',
            label: 'Status',
            render: (data) => <span>{data.status}</span>
        },
    ]

    const actionBtn = [
        {
            icon: <VisibilityIcon />,
            id: 'detail',
            function: (id) => detailBtn(id)
        },
    ]

    return(<>
        <h4><b>Daftar Pengajuan Keahlian</b></h4>
        <div className='mt-4 mb-2'>
            <CustomDropdown 
                value={chooseStatus} 
                data={statusData} 
                onChange={(e) => setChooseStatus(e.target.value)} 
            />
        </div>
        <div className="mt-3">
            <CustomTable 
                columns={colList}
                data={dummyData}
                actionButton={actionBtn}
            />
        </div>
    </>)
}

SkillSubmission.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}