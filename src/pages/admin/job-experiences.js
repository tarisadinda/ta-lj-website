import LayoutMain from "@/components/admin/layouts/main";
import AddTimeModal from "@/components/admin/modals/add-time-exp";
import EditTimeModal from "@/components/admin/modals/edit-time-exp";
import CustomAlert from "@/components/common/alert";
import ConfirmDeleteModal from "@/components/common/confirm-delete";
import IconBtn from "@/components/common/icon-button";
import CustomTable from "@/components/common/table";
import SVGAdd from '@/public/icons/add.svg'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { alertMessage, openAlert, setMessage, setOpenAlert, setSeverity, severity } from "src/redux/common/alertSlice";
import { API_TIME_EXP } from "src/utils/api";
import { axiosInstance } from "src/utils/axios";

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

export default function JobExperience() {
    const dispatch = useDispatch()

    const isOpenAlert = useSelector(openAlert)
    const alertSeverity = useSelector(severity)
    const alertMsg = useSelector(alertMessage)

    const [askDelete, setAskDelete] = React.useState(false)
    const [openEditModal, setOpenEditModal] = React.useState(false)
    const [itemId, setItemId] = React.useState('')
    const [addTime, setAddTime] = React.useState(false)
    const [timeList, setTimeList] = React.useState([])
    
    const getTime = () => {
        axiosInstance.get(API_TIME_EXP)
        .then((res) => {
            console.log(res)
            setTimeList(res.data.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    React.useEffect(() => {
        getTime()
    }, [])

    const deleteModal = (id) => {
        setItemId(id)
        setAskDelete(true)
    }

    const editModal = (id) => {
        setItemId(id)
        setOpenEditModal(true)
    }

    const deleteItem = async() => {
        try {
            const res = await axiosInstance.delete(API_TIME_EXP + '/' + itemId, {
                data: {
                    status: false,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(res)

            if(res.status == 200) {
                dispatch(setOpenAlert(true))
                dispatch(setMessage('Data berhasil dihapus!'))
                dispatch(setSeverity('success'))
            }
        } catch(err) {
            console.log(err)
        } finally {
            setAskDelete(false)
        }
    }

    return(<>
        <h4><b>Kelola Pengalaman Kerja (Tahun)</b></h4>
        <div style={{ margin: '20px 0px'}}>
            <IconBtn
                title='Tahun' 
                startIcon={<SVGAdd />}
                onClick={() => setAddTime(!addTime)}
                className="btn btn-primary blue" 
            />
        </div>
        <div>
            <CustomTable
                columns={colList}
                data={timeList}
                idKey='id'
                deleteFunc={deleteModal}
                editFunc={editModal}
            />
        </div>
        <CustomAlert open={isOpenAlert} 
            severity={alertSeverity}
            text={alertMsg} 
            duration={2800} 
            onClose={() => { dispatch(setOpenAlert(false)), dispatch(setMessage('')) }} 
        />
        <AddTimeModal
            open={addTime}
            onClose={() => setAddTime(false)}
        />
        <ConfirmDeleteModal 
            open={askDelete} 
            title="Apakah anda ingin menghapus data ini?"
            desc="Data yang telah dihapus, tidak dapat dikembali lagi."
            delFunc={deleteItem} 
            onClose={() => { setAskDelete(false), setItemId('') }} 
        />
        <EditTimeModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            id={itemId}
        />
    </>)
}

JobExperience.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}