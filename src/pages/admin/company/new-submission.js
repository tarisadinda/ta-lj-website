import React from 'react'
import LayoutMain from "@/components/layouts/main"
import CustomTable from "@/components/common/table"
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { useRouter } from "next/router"
import TrueFalseModal from "@/components/modals/true-false-modal"

const colList = [
    {
        id: 'company_name',
        label: 'Nama Perusahaan',
        render: (data) => <span>{data.company_name}</span>
    },
    {
        id: 'address',
        label: 'Alamat',
        render: (data) => <span>{data.address}</span>
    },
    {
        id: 'date',
        label: 'Tanggal Mendaftar',
        render: (data) => <span>{data.date}</span>
    },
    {
        id: 'status',
        label: 'Status',
        render: (data) => <span>{data.status}</span>
    },
]

const dummyData = [
    {
        id: 1,
        company_name: 'PT Indonesia Sejahtera',
        address: 'Titan Center | Jl. Boulevard Bintaro Blok B7/B1 No. 5 Bintaro Jaya Sektor 7, South Tangerang, Banten, Indonesia',
        date: '10/9/2022',
        status: 'Belum Terverifikasi'
    },
]

export default function NewSubmission() {
    const router = useRouter()

    const [openModal, setOpenModal] = React.useState(false)

    const detailBtn = (id) => {
        router.push('/company/detail-verification')
    }

    const acceptBtn = (id) => {
        setOpenModal(!openModal)
    }
    const actionBtn = [
        {
            icon: <VisibilityIcon />,
            id: 'detail',
            function: (id) => detailBtn(id)
        },
        {
            icon: <CheckIcon />,
            id: 'accept',
            function: (id) => acceptBtn(id)
        },
        {
            icon: <ClearIcon />,
            id: 'decline',
        },
    ]

    return(<>
        <h4><b>Akun Perusahaan yang Belum Diverifikasi</b></h4>
        <div className="mt-3">
            <CustomTable 
                columns={colList}
                data={dummyData}
                actionButton={actionBtn}
            />
        </div>
        <TrueFalseModal 
            title='Apakah anda yakin untuk menerima pengajuan akun ini?'
            desc='Pastikan sudah mengecek informasi dengan benar.'
            open={openModal} 
            onClose={acceptBtn} 
            acceptBtn={acceptBtn} 
        />
    </>)
}

NewSubmission.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}