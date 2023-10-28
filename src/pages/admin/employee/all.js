import LayoutMain from "@/components/layouts/main"
import CustomTable from "@/components/common/table"
import VisibilityIcon from '@mui/icons-material/Visibility'
import { useRouter } from "next/router"

const colNames = [
    {
        id: 'name',
        label: 'Nama Lengkap',
        render: (data) => <span>{data.name}</span>
    },
    {
        id: 'email',
        label: 'Email',
        render: (data) => <span>{data.email}</span>
    },
    {
        id: 'date',
        label: 'Tanggal Mendaftar',
        render: (data) => <span>{data.date}</span>
    },
    {
        id: 'skill',
        label: 'Keahlian',
        render: (data) => <span>{data.skill}</span>
    },
]

const dummyData = [
    {
        id: 1,
        name: 'Christian Wijaya',
        email: 'christian_wijaya@gmail.com',
        date: '10/9/2022',
        skill: 'Mobile developer'
    },
    {
        id: 2,
        name: 'Nila Kartika Sari',
        email: 'nila123@gmail.com',
        date: '10/9/2022',
        skill: '-'
    },
    {
        id: 3,
        name: 'Andira',
        email: 'andira2001@gmail.com',
        date: '14/9/2022',
        skill: '-'
    }
]

export default function NewAccountList() {
    const router = useRouter()

    const detailBtn = (id) => {
        console.log(id)
        router.push('/employee/detail')
    }

    const actionBtn = [
        {
            icon: <VisibilityIcon />,
            id: 'detail',
            function: (id) => detailBtn(id)
        }
    ]

    return(<>
        <h4><b>Daftar Pengguna</b></h4>
        <div className="mt-3">
            <CustomTable 
                columns={colNames}
                data={dummyData}
                actionButton={actionBtn}
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