import React from 'react'
import LayoutMain from "@/components/admin/layouts/main"
import IconBtn from "@/components/common/icon-button"
import CustomTable from "@/components/common/table"
import { useDispatch, useSelector } from "react-redux"
import SVGAdd from '@/public/icons/add.svg'
import { API_CAREER_LEVEL } from 'src/utils/api'
import { axiosInstance } from 'src/utils/axios'
import { convertDate } from 'src/utils/convert-date'
import AddLevelModal from '@/components/admin/modals/add-career-level'
import { alertMessage, openAlert, setMessage, setOpenAlert, setSeverity, severity } from 'src/redux/common/alertSlice'
import CustomAlert from '@/components/common/alert'
import ConfirmDeleteModal from '@/components/common/confirm-delete'
import EditCareerLevel from '@/components/admin/modals/edit-career-level'
import { careerLevelData, fetchCareerLevel } from 'src/redux/admin/careerLevelSlice'

const colList = [
    {
        id: 'name',
        label: 'Nama',
        render: (data) => <span>{data.name}</span>,
        width: 200
    },
    {
        id: 'slug',
        label: 'Slug',
        render: (data) => <span>{data.slug}</span>,
        width: 150
    },
    {
        id: 'description',
        label: 'Deskripsi',
        render: (data) => <span>{data.description}</span>,
        width: 300
    },
    {
        id: 'updatedAt',
        label: 'Tanggal Dibuat',
        render: (data) => <span>{convertDate(data.updatedAt)}</span>
    },
    {
        id: 'status',
        label: 'Status',
        render: (data) => <span>{data.status == true ? 'Aktif' : 'Non-aktif'}</span>,
        width: 120
    },
]

export default function CareerLevel() {
    const dispatch = useDispatch()

    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)
    const alertSeverity = useSelector(severity)

    const [addLevel, setAddLevel] = React.useState(false)
    const [openEditModal, setOpenEditModal] = React.useState(false)
    const [askDelete, setAskDelete] = React.useState(false)
    const [itemId, setItemId] = React.useState(false)
    const [page, setPage] = React.useState(0)
    const levelList = useSelector(careerLevelData)

    const getCurrPage = (p) => {
        setPage(p)
    }

    const deleteModal = (id) => {
        setItemId(id)
        setAskDelete(true)
    }

    const editModal = (id) => {
        setItemId(id)
        setOpenEditModal(true)
    }

    React.useEffect(() => {
        dispatch(fetchCareerLevel(page))
    }, [page])

    const deleteItem = () => {
        if(itemId != '') {
            axiosInstance.delete(API_QUALIFICATION + '/' + itemId, {
                data: {
                    status: false,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                setAskDelete(false)

                if(res.status == 200) {
                    setItemId('')

                    dispatch(setOpenAlert(true))
                    dispatch(setMessage('Data berhasil dihapus'))
                    dispatch(setSeverity('success'))
                } else {
                    setItemId('')
                }
            }).catch((err) => {
                if(err) {
                    setAskDelete(false)
                }
            })
        }
    }

    return(<>
        <h4><b>Kelola Kategori Kerja</b></h4>
        <div style={{ margin: '20px 0px'}}>
            <IconBtn 
                title='Kategori Kerja' 
                startIcon={<SVGAdd />}
                onClick={() => setAddLevel(!addLevel)}
                className="btn btn-primary blue" 
            />
        </div>
        <div>
            <CustomTable
                columns={colList}
                data={levelList.levels ? levelList.levels?.data?.data : []}
                idKey='id'
                deleteFunc={deleteModal}
                editFunc={editModal}
                getPage={getCurrPage}
                rowsPerPage='5'
                totalData={levelList.levels?.data?.pagination.total}
            />
        </div>
        <AddLevelModal
            open={addLevel}
            onClose={() =>  setAddLevel(!addLevel)}
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
        <EditCareerLevel
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            id={itemId}
        />
    </>)
}

CareerLevel.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}