import LayoutMain from "@/components/admin/layouts/main"
import CustomTable from "@/components/common/table"
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { API_CANDIDATE } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"
import { convertDate } from "src/utils/convert-date"

const colNames = [
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
        id: 'candidate_detail.createdAt',
        label: 'Tanggal Mendaftar',
        render: (data) => <span>{convertDate(data.candidate_detail?.createdAt)}</span>
    },
]

export default function NewAccountList() {
    const router = useRouter()

    const [users, setUsers] = useState([])

    const getUserList = () => {
        axiosInstance.get(API_CANDIDATE)
        .then((res) => {
            setUsers(res.data.data.data)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getUserList()
    }, [])

    const detailData = () => {
        router.push('/admin/employee/detail')
    }

    return(<>
        <h4><b>Kelola Kandidat</b></h4>
        <div className="mt-3">
            <CustomTable 
                columns={colNames}
                data={users}
                detailFunc={detailData}
            />
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