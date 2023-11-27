import LayoutMain from "@/components/admin/layouts/main"
import AddPermissionModal from "@/components/admin/modals/add-permission"
import EditPermissionModal from "@/components/admin/modals/edit-permission"
import IconBtn from "@/components/common/icon-button"
import CustomTable from "@/components/common/table"
import SVGAdd from '@/public/icons/add.svg'
import React from "react"
import { API_ROLE_PERMISSION } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const colList = [
    {
        id: 'name',
        label: 'Nama Role',
        render: (data) => <span>{data.name}</span>
    },
    {
        id: 'description',
        label: 'Deskripsi',
        render: (data) => <span>{data.description}</span>
    },
    {
        id: 'permission_list',
        label: 'Daftar Hak Akses',
        render: (data) => <span>{
                data.permission.length == 0 ? 'Hak akses belum diatur' : 
                data.permission.map((item) => item?.access + ', ')}
            </span>
    },
]

export default function Permission() {
    const [permissionsList,setPermissionList] = React.useState([])
    const [newPermission, setNewPermission] = React.useState(false)
    const [openEditModal, setOpenEditModal] = React.useState(false)
    const [selectId, setSelectid] = React.useState(0)

    const getList = () => {
        axiosInstance.get(API_ROLE_PERMISSION)
        .then((res) => {
            setPermissionList(res.data.data)
        })
    }

    console.log(permissionsList)
    React.useEffect(() => {
        getList()
    }, [])

    const editModal = (id) => {
        setSelectid(id)
        setOpenEditModal(true)
        console.log('edit')
    }

    return(<>
        <h4><b>Kelola Hak Akses Pengguna</b></h4>
        <div style={{ margin: '20px 0px'}}>
            <IconBtn 
                title='Akses Pengguna' 
                startIcon={<SVGAdd />}
                onClick={() => setNewPermission(!newPermission)}
                className="btn btn-primary blue" 
            />
        </div>
        <CustomTable
            columns={colList}
            idKey="id"
            data={permissionsList}
            editFunc={editModal}
        />
        <AddPermissionModal
            open={newPermission}
            onClose={() => setNewPermission(false)}
        />
        <EditPermissionModal
            open={openEditModal}
            id={selectId}
            onClose={() => setOpenEditModal(false)}
        />
    </>)
}

Permission.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}