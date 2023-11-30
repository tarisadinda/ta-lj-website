import React from 'react'
import LayoutMain from "@/components/admin/layouts/main"
import CustomTable from "@/components/common/table"
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { useRouter } from "next/router"
import TrueFalseModal from "@/components/common/true-false-modal"
import { axiosInstance } from 'src/utils/axios'
import { API_UNVERIF_COMPANY } from 'src/utils/api'
import { convertDate } from 'src/utils/convert-date'

const colList = [
    {
        id: 'full_name',
        label: 'Nama Perusahaan',
        render: (data) => <span>{data.full_name}</span>
    },
    {
        id: 'email',
        label: 'Email',
        render: (data) => <span>{data.email}</span>
    },
    {
        id: 'company_detail.address',
        label: 'Alamat',
        render: (data) => <span>{data.company_detail?.address}</span>
    },
    {
        id: 'company_detail.createdAt',
        label: 'Tanggal Mendaftar',
        render: (data) => <span>{convertDate(data.company_detail?.createdAt)}</span>
    },
]

export default function NewSubmission() {
    const router = useRouter()

    const [openModal, setOpenModal] = React.useState(false)
    const [companyList, setCompanyList] = React.useState([])

    const detailBtn = (username) => {
        console.log(username)
        router.push({
            pathname: '/admin/company/detail-verification/[username]',
            query: { username: username }
        })
    }

    const getCompanyList = () => {
        axiosInstance.get(API_UNVERIF_COMPANY)
        .then((res) => {
            console.log(res)
            setCompanyList(res.data.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const acceptBtn = (username) => {
        console.log(username)
        // setOpenModal(!openModal)
    }

    React.useEffect(() => {
        getCompanyList()
    }, [])

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
    ]

    return(<>
        <h4><b>Akun Perusahaan yang Belum Diverifikasi</b></h4>
        <div className="mt-3">
            <CustomTable 
                idKey='username'
                columns={colList}
                data={companyList}
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