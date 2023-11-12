import LayoutMain from "@/components/admin/layouts/main"
import AddRoleModal from "@/components/admin/modals/add-role"
import CustomAlert from "@/components/common/alert"
import ConfirmDeleteModal from "@/components/common/confirm-delete"
import IconBtn from "@/components/common/icon-button"
import CustomTable from "@/components/common/table"
import SVGAdd from '@/public/icons/add.svg'
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { alertMessage, openAlert, setOpenAlert, severity } from "src/redux/common/alertSlice"
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
]

export default function Role() {
    const dispatch = useDispatch()

    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)
    const alertSeverity = useSelector(severity)

    const [addRole, setAddRole] = React.useState(false)
    const [askDelete, setAskDelete] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState('')
    const [roles, setRoles] = React.useState([])

    const deleteModal = (id) => {
        setDeleteId(id)
        setAskDelete(true)
    }

    const deleteItem = () => {
        console.log('tes')
        if(deleteId !== '') {
            axiosInstance.delete(API_ROLE + '/' + deleteId)
            .then((res) => {
                setAskDelete(false)

                if(res.status === 200) {
                    setRoles(roles.filter((data) => {return data.id !== deleteId}))

                    setDeleteId('')
                }
            })
        }
    }

    const getRoles = () => {
        axiosInstance.get(API_ROLE)
        .then((res) => {
            console.log(res)
            setRoles(res.data)
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        getRoles()
    }, [])

    return(<>
        <h4><b>Kelola Role</b></h4>
        <div className="mt-3 mb-2">
            <IconBtn 
                title='Tambah Role' 
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
                // editFunc={editModal}
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
            onClose={() => { setAskDelete(false), setDeleteId('') }} 
        />
        <CustomAlert
            open={isOpenAlert} 
            severity={alertSeverity}
            text={alertMsg}
            duration={3000} 
            onClose={() => dispatch(setOpenAlert(false))} 
        />
    </>)
}

Role.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}