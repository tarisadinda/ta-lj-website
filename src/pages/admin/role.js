import LayoutMain from "@/components/admin/layouts/main"
import AddRoleModal from "@/components/admin/modals/add-role"
import EditRoleModal from "@/components/admin/modals/edit-role"
import CustomAlert from "@/components/common/alert"
import ConfirmDeleteModal from "@/components/common/confirm-delete"
import IconBtn from "@/components/common/icon-button"
import CustomTable from "@/components/common/table"
import SVGAdd from '@/public/icons/add.svg'
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { alertMessage, openAlert, setMessage, setOpenAlert, setSeverity, severity } from "src/redux/common/alertSlice"
import { API_ROLE } from "src/utils/api"
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
        id: 'status',
        label: 'Status',
        render: (data) => <span>{data.status == true ? 'Aktif' : 'Non-aktif'}</span>
    },
]

export default function Role() {
    const dispatch = useDispatch()

    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)
    const alertSeverity = useSelector(severity)

    const [addRole, setAddRole] = React.useState(false)
    const [askDelete, setAskDelete] = React.useState(false)
    const [askEdit, setAskEdit] = React.useState(false)
    const [itemId, setItemId] = React.useState('')
    const [roles, setRoles] = React.useState([])

    const deleteModal = (id) => {
        setItemId(id)
        setAskDelete(true)
    }

    const editModal = (id) => {
        setItemId(id)
        setAskEdit(true)
    }

    const deleteItem = () => {
        if(itemId !== '') {
            axiosInstance.delete(API_ROLE + '/' + itemId, {
                data: {
                    status: false,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                if(res.status === 200) {
                    setItemId('')
                    setAskDelete(false)

                    dispatch(setOpenAlert(true))
                    dispatch(setMessage('Data berhasil dihapus'))
                    dispatch(setSeverity('success'))
                }
            }).catch(err => {
                console.log(err)
                if(err.response.status == 400) {
                    setAskDelete(false)

                    dispatch(setOpenAlert(true))
                    dispatch(setMessage(err.response.data.message))
                    dispatch(setSeverity('error'))
                }
            })
        }
    }

    const getRoles = () => {
        axiosInstance.get(API_ROLE)
        .then((res) => {
            setRoles(res.data.data.data)
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        getRoles()
    }, [])

    return(<>
        <h4><b>Kelola Role</b></h4>
        <div className="mt-3 mb-2">
            <IconBtn 
                title='Role' 
                startIcon={<SVGAdd />}
                onClick={() => setAddRole(true)}
                className="btn btn-primary blue" 
            />
        </div>
        <div>
            <CustomTable
                columns={colList}
                data={roles}
                idKey='id'
                deleteFunc={deleteModal}
                editFunc={editModal}
                rowsPerPage='10'
            />
        </div>
        <AddRoleModal
            open={addRole}
            onClose={() => setAddRole(false)}
        />
        <ConfirmDeleteModal
            open={askDelete} 
            delFunc={deleteItem} 
            title="Apakah anda ingin menghapus data ini?"
            desc="Data yang telah dihapus, tidak dapat dikembali lagi."
            onClose={() => { setAskDelete(false), setItemId('') }} 
        />
        <CustomAlert
            open={isOpenAlert} 
            severity={alertSeverity}
            text={alertMsg}
            duration={3000} 
            onClose={() => dispatch(setOpenAlert(false))} 
        />
        <EditRoleModal id={itemId} open={askEdit} onClose={() => setAskEdit(false)} />
    </>)
}

Role.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}