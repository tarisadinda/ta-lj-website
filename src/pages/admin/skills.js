import LayoutMain from "@/components/admin/layouts/main"
import AddSkillModal from "@/components/admin/modals/add-skill"
import EditSkillModal from "@/components/admin/modals/edit-skill"
import CustomAlert from "@/components/common/alert"
import ConfirmDeleteModal from "@/components/common/confirm-delete"
import IconBtn from "@/components/common/icon-button"
import CustomTable from "@/components/common/table"
import SVGAdd from '@/public/icons/add.svg'
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { alertMessage, openAlert, setMessage, setOpenAlert, setSeverity, severity } from "src/redux/common/alertSlice"
import { API_SKILL } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

const colList = [
    {
        id: 'name',
        label: 'Nama',
        render: (data) => <span>{data.name}</span>
    },
    {
        id: 'slug',
        label: 'Slug',
        render: (data) => <span>{data.slug}</span>
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

export default function Skills() {
    const dispatch = useDispatch()

    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)
    const alertSeverity = useSelector(severity)

    const [addSkill, setAddSkill] = React.useState(false)
    const [editSkill, setEditSkill] = React.useState(false)
    const [askDelete, setAskDelete] = React.useState(false)
    const [dataList, setDataList] = React.useState([])
    const [itemId, setItemId] = React.useState('')

    const getSkill = () => {
        axiosInstance.get(API_SKILL)
        .then((res) => {
            console.log(res)
            setDataList(res.data.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    React.useEffect(() => {
        getSkill()
    }, [])

    const editModal = (id) => {
        setItemId(id)
        setEditSkill(true)
    }

    const deleteModal = (id) => {
        setItemId(id)
        setAskDelete(true)
    }

    const deleteItem = () => {
        if(itemId !== '') {
            axiosInstance.delete(API_SKILL + '/' + itemId, {
                data: {
                    status: false,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                setAskDelete(false)

                if(res.status === 200) {
                    setItemId('')
                    dispatch(setOpenAlert(true))
                    dispatch(setMessage('Data berhasil dihapus!'))
                    dispatch(setSeverity('success'))
                }
            }).catch((err) => console.log(err))
        }
    }

    console.log(itemId)
    return(<>
        <h4><b>Daftar Keahlian</b></h4>
        <div style={{ margin: '20px 0px'}}>
            <IconBtn 
                title='Keahlian' 
                startIcon={<SVGAdd />}
                onClick={() => setAddSkill(!addSkill)}
                className="btn btn-primary blue" 
            />
        </div>
        <div>
            <CustomTable
                columns={colList}
                data={dataList}
                idKey='id'
                deleteFunc={deleteModal}
                editFunc={editModal}
            />
        </div>
        <EditSkillModal
            id={itemId}
            open={editSkill}
            onClose={() => setEditSkill(false)}
        />
        <CustomAlert
            open={isOpenAlert}
            severity={alertSeverity}
            text={alertMsg}
            duration={2800} 
            onClose={() => dispatch(setOpenAlert(false))} 
        />
        <ConfirmDeleteModal
            open={askDelete}
            delFunc={deleteItem} 
            title="Apakah anda ingin menghapus data ini?"
            desc="Data yang telah dihapus, tidak dapat dikembali lagi."
            onClose={() => { setAskDelete(false), setItemId('') }} 
        />
        <AddSkillModal
            open={addSkill}
            onClose={() => setAddSkill(false)}
        /> 
    </>)
}

Skills.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}