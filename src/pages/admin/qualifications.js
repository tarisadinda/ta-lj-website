import React, { useRef, useState } from 'react'
import IconBtn from "@/components/common/icon-button"
import LayoutMain from "@/components/admin/layouts/main"
import SVGAdd from '@/public/icons/add.svg'
import CustomTable from '@/components/common/table'
import { axiosInstance } from 'src/utils/axios'
import { API_QUALIFICATION } from 'src/utils/api'
import { convertDate } from 'src/utils/convert-date'
import { useDispatch, useSelector } from 'react-redux'
import { alertMessage, openAlert, setMessage, setOpenAlert, setSeverity, severity } from 'src/redux/common/alertSlice'
import CustomAlert from '@/components/common/alert'
import ConfirmDeleteModal from '@/components/common/confirm-delete'
import AddQualificationModal from '@/components/admin/modals/add-qualification'
import EditQualificationModal from '@/components/admin/modals/edit-qualification'
import { fetchQualification, qualificationData } from 'src/redux/admin/qualificationSlice'

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
        render: (data) => <span>{data.description}</span>,
        width: 300
    },
    {
        id: 'status',
        label: 'Status',
        render: (data) => <span>{data.status == true ? 'Aktif' : 'Non-aktif'}</span>,
        width: 150
    },
]

export default function Qualification() {
    const dispatch = useDispatch()

    const effectRan = useRef(false)

    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)
    const alertSeverity = useSelector(severity)

    const [isAddQualification, setIsAddQualification] = useState(false)
    const [askDelete, setAskDelete] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState('')
    const [editId, setEditId] = React.useState('')
    const [openEditModal, setOpenEditModal] = React.useState(false)
    const qualification = useSelector(qualificationData)
    const [page, setPage] = React.useState(0)

    const getCurrPage = (number) => {
        setPage(number)
    }

    React.useEffect(() => {
        dispatch(fetchQualification())
    }, [])

    const deleteModal = (id) => {
        setDeleteId(id)
        setAskDelete(true)
    }

    const editModal = (id) => {
        setEditId(id)
        setOpenEditModal(true)
    }
    
    const deleteItem = () => {
        if(deleteId != '') {
            axiosInstance.delete(API_QUALIFICATION + '/' + deleteId, {
                data: {
                    status: false,
                },
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((res) => {
                setAskDelete(false)

                if(res.status == 200) {
                    setDeleteId('')

                    dispatch(setOpenAlert(true))
                    dispatch(setMessage('Data berhasil dihapus'))
                    dispatch(setSeverity('success'))
                } else {
                    setDeleteId('')
                }
            }).catch((err) => {
                if(err) {
                    setAskDelete(false)
                }
            })
        }
    }

    return(<>
        <h4><b>Kelola Kualifikasi Pekerjaan</b></h4>
        <div style={{ margin: '20px 0px'}}>
            <IconBtn 
                title='Kualifikasi' 
                startIcon={<SVGAdd />}
                onClick={() => setIsAddQualification(!isAddQualification)}
                className="btn btn-primary blue" 
            />
        </div>
        <div>
            <CustomTable
                columns={colList}
                data={qualification.qualification.data?.data}
                idKey='id'
                deleteFunc={deleteModal}
                editFunc={editModal}
                rowsPerPage='10'
                totalData={qualification.qualification.data?.data.length}
                getPage={getCurrPage}
            />
        </div>
        <AddQualificationModal
            open={isAddQualification}
            onClose={() => setIsAddQualification(false)}
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
            onClose={() => { setAskDelete(false), setDeleteId('') }} 
        />
        <EditQualificationModal
            open={openEditModal}
            onClose={() => setOpenEditModal(false)}
            id={editId}
        />
    </>)
}

Qualification.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}