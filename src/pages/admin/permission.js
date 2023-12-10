import LayoutMain from "@/components/admin/layouts/main"
import AddPermissionModal from "@/components/admin/modals/add-permission"
import EditPermissionModal from "@/components/admin/modals/edit-permission"
import CustomAlert from "@/components/common/alert"
import IconBtn from "@/components/common/icon-button"
import CustomTable from "@/components/common/table"
import SVGAdd from '@/public/icons/add.svg'
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRolePermission, rolePermissionList } from "src/redux/admin/permissionSlice"
import { alertMessage, openAlert, setOpenAlert, severity } from "src/redux/common/alertSlice"

const colList = [
    {
        id: 'name',
        label: 'Nama Role',
        render: (data) => <span>{data.name}</span>
    },
    {
        id: 'description',
        label: 'Deskripsi',
        render: (data) => <span>{data.description}</span>,
        width: 250
    },
    {
        id: 'permission_list',
        label: 'Daftar Hak Akses',
        render: (data) => <span>{
                data.permission.length == 0 ? 'Hak akses belum diatur' : 
                data.permission.map((item) => item?.access + ', ')}
            </span>,
        width: 400
    },
]

export default function Permission() {
    const dispatch = useDispatch()

    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)
    const alertSeverity = useSelector(severity)
    const tempPermissionsList = useSelector(rolePermissionList)

    const permissionsList = tempPermissionsList.permissionData.data?.filter((item) => item.permission.length != 0)
    const [newPermission, setNewPermission] = React.useState(false)
    const [openEditModal, setOpenEditModal] = React.useState(false)
    const [selectId, setSelectid] = React.useState(0)

    React.useEffect(() => {
        dispatch(fetchRolePermission())
    }, [])

    const editModal = (id) => {
        setSelectid(id)
        setOpenEditModal(true)
        // console.log('edit')
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
            rowsPerPage='10'
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
        <CustomAlert 
            open={isOpenAlert} 
            severity={alertSeverity}
            text={alertMsg}
            duration={2800} 
            onClose={() => dispatch(setOpenAlert(false))} 
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