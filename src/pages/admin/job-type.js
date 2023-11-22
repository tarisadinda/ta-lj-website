import React, { useRef } from 'react'
import styles from '@/styles/pages/admin/JobType.module.scss'
import SVGAdd from '@/public/icons/add.svg'
import CustomTable from '@/components/common/table'
import LayoutMain from '@/components/admin/layouts/main'
import IconBtn from '@/components/common/icon-button'
import AddCategoryModal from '@/components/admin/modals/add-category'
import { axiosInstance } from 'src/utils/axios'
import { convertDate } from 'src/utils/convert-date'
import { API_ADD_CAT, API_JOB_TYPE } from 'src/utils/api'
import ConfirmDeleteModal from '@/components/common/confirm-delete'
import CustomAlert from '@/components/common/alert'
import { useDispatch, useSelector } from 'react-redux'
import { alertMessage, openAlert, setMessage, setOpenAlert, severity } from 'src/redux/common/alertSlice'
import EditCategoryModal from '@/components/admin/modals/edit-category'
import { openModal, setOpenModal } from 'src/redux/common/modalSlice'

const colList = [
    {
        id: 'name',
        label: 'Tipe Kerja',
        render: (data) => <span>{data.name}</span>
    },
    {
        id: 'description',
        label: 'Deskripsi',
        render: (data) => <span>{data.description}</span>
    },
    {
        id: 'slug',
        label: 'Slug',
        render: (data) => <span>{data.slug}</span>
    },
    {
        id: 'updatedAt',
        label: 'Tanggal Dibuat',
        render: (data) => <span>{convertDate(data.updatedAt)}</span>
    },
]

export default function JobType() {
    const dispatch = useDispatch()
    const effectRan = useRef(false)

    const isOpenAlert = useSelector(openAlert)
    const alertSeverity = useSelector(severity)
    const alertMsg = useSelector(alertMessage)
    const isEditModal = useSelector(openModal)

    const [openCatModal, setOpenCatModal] = React.useState(false)
    const [askDelete, setAskDelete] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState('')
    const [editCatId, setEditCatId] = React.useState('')
    const [categoryList, setCategoryList] = React.useState([])

    const getJobTypeList = () => {
        axiosInstance.get(API_JOB_TYPE)
        .then((res) => {
            console.log(res)
            setCategoryList(res.data.data)
        }).catch((err) => {})
    }

    console.log(categoryList)
    React.useEffect(() => {
        getJobTypeList()
    }, [])

    const deleteItem = () => {
        if(deleteId !== '') {
            axiosInstance.delete(API_ADD_CAT + '/' + deleteId)
            .then((res) => {
                console.log(res)
                setAskDelete(false)

                if(res.status === 200) {
                    setCategoryList(categoryList.filter((category) => {
                        return category.id !== deleteId
                    }))

                    setDeleteId('')
                } else {
                    setDeleteId('')
                }
                // dispatch(setMessage(res.data.message))
                // dispatch(setOpenAlert(true))
            }).catch((err) => {})
        }
    }

    const modalDelete = (id) => {
        setDeleteId(id)
        setAskDelete(true)
    }

    const modalEdit = (id) => {
        dispatch(setOpenModal(true))

        if(id) {
            setEditCatId(id)
        }
    }
    
    return(<>
        <h4><b>Tipe Pekerjaan</b></h4>
        <div className={styles.addBtn}>
            <IconBtn 
                title='Tambah Tipe Kerja' 
                startIcon={<SVGAdd />}
                onClick={() => setOpenCatModal(!openCatModal)}
                className="btn btn-primary blue" 
            />
        </div>        
        <CustomTable 
            columns={colList}
            data={categoryList.data}
            idKey='id'
            deleteFunc={modalDelete}
            editFunc={modalEdit}
        />
        <AddCategoryModal open={openCatModal} onClose={() => setOpenCatModal(false)} />
        <ConfirmDeleteModal 
            open={askDelete} 
            title="Apakah anda ingin menghapus data ini?"
            desc="Data yang telah dihapus, tidak dapat dikembali lagi."
            delFunc={deleteItem} 
            onClose={() => { setAskDelete(false), setDeleteId('') }} 
        />
        <CustomAlert open={isOpenAlert} 
            severity={alertSeverity}
            text={alertMsg} 
            duration={3500} 
            onClose={() => { dispatch(setOpenAlert(false)), dispatch(setMessage('')) }} 
        />
        <EditCategoryModal 
            id={editCatId} 
            open={isEditModal} 
            onClose={() => { dispatch(setOpenModal(false)); setEditCatId('') }} 
        />
    </>)
}

JobType.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}