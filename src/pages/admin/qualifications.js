import React, { useRef, useState } from 'react'
import IconBtn from "@/components/common/icon-button"
import LayoutMain from "@/components/admin/layouts/main"
import SVGAdd from '@/public/icons/add.svg'
import CustomTable from '@/components/common/table'
import { axiosInstance } from 'src/utils/axios'
import { API_QUALIFICATION, API_SALARY } from 'src/utils/api'
import { convertDate } from 'src/utils/convert-date'
import { useDispatch, useSelector } from 'react-redux'
import { alertMessage, openAlert, setOpenAlert, severity } from 'src/redux/common/alertSlice'
import CustomAlert from '@/components/common/alert'
import ConfirmDeleteModal from '@/components/common/confirm-delete'
import AddQualificationModal from '@/components/admin/modals/add-qualification'
import EditQualificationModal from '@/components/admin/modals/edit-qualification'

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

export default function Payroll() {
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
    const [qualification, setQualification] = useState([])

    const getQualifications = () => {
        axiosInstance.get(API_QUALIFICATION)
        .then((res) => {
            console.log(res.data.data.data)
            setQualification(res.data.data.data)
        }).catch((err) => console.log(err))
    }

    console.log(qualification)
    React.useEffect(() => {
        if (effectRan.current === false) {
            getQualifications()

            return () => {
                effectRan.current === true
            }
        }
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
        if(deleteId !== '') {
        console.log(deleteId)
            axiosInstance.delete(API_QUALIFICATION + '/' + deleteId)
            .then((res) => {
                console.log(res)
                setAskDelete(false)

                if(res.status === 200) {
                    setQualification(qualification.filter((item) => {
                        return item.id !== deleteId
                    }))

                    setDeleteId('')
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
        <h4><b>Daftar Kualifikasi Pekerjaan</b></h4>
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
                data={qualification}
                idKey='id'
                deleteFunc={deleteModal}
                editFunc={editModal}
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
            duration={3000} 
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

Payroll.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}