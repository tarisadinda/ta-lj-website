import LayoutMain from "@/components/admin/layouts/main"
import CustomTable from "@/components/common/table"
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { API_CANDIDATE, API_USERS } from "src/utils/api"
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
        id: 'createdAt',
        label: 'Tanggal Mendaftar',
        render: (data) => <span>{convertDate(data.createdAt)}</span>
    },
]

export default function NewAccountList() {
    const router = useRouter()

    const [page, setPage] = useState(0)
    const [users, setUsers] = useState([])

    const getUserList = () => {
        axiosInstance.get(API_USERS, {
            params: {
                size: 10,
                page: page,
                role_id: 3
            }
        }).then((res) => {
            console.log(res.data.data.user.data)
            setUsers(res.data.data.user.data)
        }).catch((err) => console.log(err))
    }

    useEffect(() => {
        getUserList()
    }, [])

    console.log(users)

    const detailData = (id) => {
        router.push({
            pathname: '/admin/employee/[id]',
            query: { id: id }
        }, `/admin/employee/${id}`, { shallow: true })
    }

    return(<>
        <h4><b>Kelola Kandidat</b></h4>
        <div className="mt-3">
            <CustomTable 
                idKey="id"
                columns={colNames}
                data={users}
                rowsPerPage='10'
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