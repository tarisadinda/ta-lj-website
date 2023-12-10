import React, { useRef } from 'react'
import cn from 'classnames'
import BlueCard from '@/components/common/blue-card'
import LayoutMain from '@/components/admin/layouts/main'
import styles from '@/styles/pages/admin/company/AllCompany.module.scss'
import CustomTable from '@/components/common/table'
import CustomDropdown from '@/components/common/dropdown'
import { useRouter } from 'next/router'
import { axiosInstance } from 'src/utils/axios'
import { API_COMPANY, API_VERIF_COMPANY, API_USERS } from 'src/utils/api'
import { convertDate } from 'src/utils/convert-date'

const colNames = [
    {
        id: 'full_name',
        label: 'Nama Perusahaan',
        render: (data) => <span>{data.full_name}</span>,
        width: 300
    },
    {
        id: 'username',
        label: 'Username',
        render: (data) => <span>{data.username}</span>,
    },
    {
        id: 'email',
        label: 'Email',
        render: (data) => <span>{data.email}</span>
    },
    {
        id: 'createdAt',
        label: 'Tanggal Registrasi',
        render: (data) => <span>{convertDate(data.createdAt)}</span>
    },
]

const statusData = [
    {
        label: 'Semua',
        value: 'all'
    },
    {
        label: 'Terverifikasi',
        value: 'verif'
    },
    {
        label: 'Belum terverifikasi',
        value: 'unverif'
    },
]

export default function AllCompany() {
    const router = useRouter()

    const [status, setStatus] = React.useState('all')
    const [companyList, setCompanyList] = React.useState([])
    const [totalUnverif, setTotalUnverif] = React.useState(0)
    const [page, setPage] = React.useState(0)

    const getCurrPage = (number) => {
        setPage(number)
    }

    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

    const modalDelete = (id) => {
        console.log(id)
    }

    const modalEdit = (id) => {
        console.log(id)
    }
    
    const modalDetail = (id) => {
        router.push({
            pathname: '/admin/company/detail-company/[id]',
            query: { id: id }
        }, `/admin/company/detail-company/${id}`, { shallow: true })
    }

    const getListCompany = () => {
        axiosInstance.get(API_USERS, {
            params: {
                role_id: 2,
                size: 10, 
                page: page
            }
        }).then((res) => {
            console.log(res)
            setCompanyList(res.data.data.user.data)
        })
    }

    const getTotalUnverif = () => {
        axiosInstance.get(API_VERIF_COMPANY)
        .then((res) => { 
            setTotalUnverif(res.data.data.data.length)
        }).catch(err => {throw err})
    }

    React.useEffect(() => {
        getListCompany()
        getTotalUnverif()
    }, [])

    return(<>
        <div>
            <BlueCard className={styles.countCard}>
                <div className={styles.textWrap}>
                    <h2 className={cn(styles.count, 'm-0')}><b>{totalUnverif}</b></h2>
                    <p className='m-0'>Perusahaan Belum Terverifikasi</p>
                </div>
            </BlueCard>
            <div className='mt-4'>
                <div className='mb-2'>
                    <CustomDropdown value={status} onChange={handleStatus} data={statusData} />
                </div>
                <CustomTable 
                    idKey='id'
                    columns={colNames}
                    data={companyList}
                    deleteFunc={modalDelete}
                    editFunc={modalEdit}
                    detailFunc={modalDetail}
                    rowsPerPage='10'
                    totalData={companyList.length}
                    getPage={getCurrPage}
                />
            </div>
        </div>
    </>)
}

AllCompany.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}