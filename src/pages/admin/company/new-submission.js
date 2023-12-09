import React from 'react'
import LayoutMain from "@/components/admin/layouts/main"
import CustomTable from "@/components/common/table"
import VisibilityIcon from '@mui/icons-material/Visibility'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { useRouter } from "next/router"
import TrueFalseModal from "@/components/common/true-false-modal"
import { axiosInstance } from 'src/utils/axios'
import { API_VERIF_COMPANY } from 'src/utils/api'
import { convertDate } from 'src/utils/convert-date'
import CustomAlert from '@/components/common/alert'
import { useDispatch, useSelector } from 'react-redux'
import { alertMessage, openAlert, setMessage, setOpenAlert, setSeverity, severity } from 'src/redux/common/alertSlice'
import { fetchUnverifList, unverifCompanyList } from 'src/redux/admin/companySlice'

const colList = [
    {
        id: 'full_name',
        label: 'Nama Perusahaan',
        render: (data) => <span>{data.full_name}</span>,
        width: 300
    },
    {
        id: 'username',
        label: 'Username',
        render: (data) => <span>{data.username}</span>,
        width: 180
    },
    {
        id: 'email',
        label: 'Email',
        render: (data) => <span>{data.email}</span>
    },
    {
        id: 'status_completed',
        label: 'Status Data',
        render: (data) => <span>{data.status_completed == true ? 'Lengkap' : 'Belum lengkap'}</span>
    },
    {
        id: 'company_detail.createdAt',
        label: 'Tanggal Mendaftar',
        render: (data) => <span>{convertDate(data.company_detail?.createdAt)}</span>
    },
]

export default function NewSubmission() {
    const router = useRouter()
    const dispatch = useDispatch()

    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)
    const alertSeverity = useSelector(severity)

    const [openModal, setOpenModal] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const [itemUname, setItemUname] = React.useState('')
    const companyList = useSelector(unverifCompanyList)

    const getCurrPage = (number) => {
        setPage(number)
    }

    const detailBtn = (username) => {
        console.log(username)
        router.push({
            pathname: '/admin/company/detail-verification/[username]',
            query: { username: username }
        })
    }

    const acceptBtn = (username) => {
        console.log(username)
        setItemUname(username)
        setOpenModal(true)
    }

    const verifyBtn = () => {
        if(itemUname != '') {
            axiosInstance.put(`${API_VERIF_COMPANY}/${itemUname}`, {
                status: true
            }).then((res) => {
                if(res) {
                    setOpenModal(false)
                    dispatch(fetchUnverifList())

                    dispatch(setOpenAlert(true))
                    dispatch(setMessage(res.data.message))
                    dispatch(setSeverity('success'))
                }
            }).catch((err) => { 
                setOpenModal(false)
                throw err 
            })
        }
    }

    React.useEffect(() => {
        dispatch(fetchUnverifList(page))
    }, [page])

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
                data={companyList.unverifData.data?.data}
                actionButton={actionBtn}
                rowsPerPage='10'
                getPage={getCurrPage}
                totalData={companyList.unverifData.data?.data.length}
            />
        </div>
        <TrueFalseModal 
            title='Apakah anda yakin untuk menerima pengajuan akun ini?'
            desc='Pastikan sudah mengecek informasi dengan benar.'
            open={openModal} 
            declineBtn={() => setOpenModal(false)} 
            acceptBtn={verifyBtn} 
        />
        <CustomAlert
            open={isOpenAlert} 
            severity={alertSeverity}
            text={alertMsg}
            duration={2800} 
            onClose={() => dispatch(setOpenAlert(false))} 
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