import React, { useRef, useState } from 'react'
import styles from '@/styles/pages/admin/Payroll.module.scss'
import IconBtn from "@/components/common/icon-button"
import LayoutMain from "@/components/admin/layouts/main"
import SVGAdd from '@/public/icons/add.svg'
import CustomTable from '@/components/common/table'
import AddSalaryModal from '@/components/admin/modals/add-salary'
import { axiosInstance } from 'src/utils/axios'
import { API_SALARY } from 'src/utils/api'
import { convertDate } from 'src/utils/convert-date'
import { useDispatch, useSelector } from 'react-redux'
import { alertMessage, openAlert, setOpenAlert } from 'src/redux/common/alertSlice'
import CustomAlert from '@/components/common/alert'
import ConfirmDeleteModal from '@/components/common/confirm-delete'

const colList = [
    {
        id: 'nominal',
        label: 'Nominal Gaji',
        render: (data) => <span>{data.nominal}</span>
    },
    // {
    //     id: 'salary_flag',
    //     label: 'Flag Item',
    //     render: (data) => <span>{data.salary_flag}</span>
    // },
    // {
    //     id: 'createdAt',
    //     label: 'Tanggal Dibuat',
    //     render: (data) => <span>{convertDate(data.createdAt)}</span>
    // },
]

export default function Payroll() {
    const dispatch = useDispatch()

    const effectRan = useRef(false)

    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)

    const [isAddSalary, setIsAddSalary] = useState(false)
    const [askDelete, setAskDelete] = React.useState(false)
    const [deleteId, setDeleteId] = React.useState('')
    const [salaryList, setSalaryList] = useState([])

    const getSalary = () => {
        axiosInstance.get(API_SALARY)
        .then((res) => {
            console.log(res)
            setSalaryList(res.data)
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        if (effectRan.current === false) {
            getSalary()

            return () => {
                effectRan.current === true
            }
        }
    }, [])

    const deleteSalary = (id) => {
        setDeleteId(id)
        setAskDelete(true)
    }

    const deleteItem = () => {
        if(deleteId !== '') {
            axiosInstance.delete(API_SALARY + '/' + deleteId)
            .then((res) => {
                console.log(res)
                setAskDelete(false)

                if(res.status === 200) {
                    setSalaryList(salaryList.filter((data) => {
                        return data.id !== deleteId
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

    return(<>
        <h4><b>Penghasilan</b></h4>
        <div style={{ margin: '20px 0px'}}>
            <IconBtn 
                title='Tambah Penghasilan' 
                startIcon={<SVGAdd />}
                onClick={() => setIsAddSalary(!isAddSalary)}
                className="btn btn-primary blue" 
            />
        </div>
        <div>
            <p className={styles.tableName}>Daftar Penghasilan</p>
            <CustomTable
                columns={colList}
                data={salaryList}
                idKey='id'
                deleteData={true}
                editData={true}
                deleteFunc={deleteSalary}
            />
        </div>
        <AddSalaryModal open={isAddSalary} onClose={() => setIsAddSalary(false)} />
        <CustomAlert 
            open={isOpenAlert} 
            severity="success" 
            text={alertMsg}
            duration={3500} 
            onClose={() => dispatch(setOpenAlert(false))} 
        />
        <ConfirmDeleteModal
            open={askDelete} 
            delFunc={deleteItem} 
            onClose={() => { setAskDelete(false), setDeleteId('') }} 
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