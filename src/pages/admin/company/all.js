import React, { useRef } from 'react'
import cn from 'classnames'
import BlueCard from '@/components/common/blue-card'
import LayoutMain from '@/components/admin/layouts/main'
import styles from '@/styles/pages/admin/company/AllCompany.module.scss'
import CustomTable from '@/components/common/table'
import CustomDropdown from '@/components/common/dropdown'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete'
import { useRouter } from 'next/router'
import { axiosInstance } from 'src/utils/axios'
import { API_COMPANY } from 'src/utils/api'

const dummyData = [
    {
        id: 1,
        name: 'PT Metanesia Indonesia',
        logo: 'logo.jpg',
        address: 'Titan Center | Jl. Boulevard Bintaro Blok B7/B1 No. 5 Bintaro Jaya Sektor 7, South Tangerang, Banten, Indonesia',
        status: 'Terverifikasi'
    },
    {
        id: 2,
        name: 'PT Metanesia Indonesia',
        logo: 'logo.jpg',
        address: 'Titan Center | Jl. Boulevard Bintaro Blok B7/B1 No. 5 Bintaro Jaya Sektor 7, South Tangerang, Banten, Indonesia',
        status: 'Terverifikasi'
    },
    {
        id: 3,
        name: 'PT Metanesia Indonesia',
        logo: 'logo.jpg',
        address: 'Titan Center | Jl. Boulevard Bintaro Blok B7/B1 No. 5 Bintaro Jaya Sektor 7, South Tangerang, Banten, Indonesia',
        status: 'Terverifikasi'
    },
    {
        id: 4,
        name: 'PT Metanesia Indonesia',
        logo: 'logo.jpg',
        address: 'Titan Center | Jl. Boulevard Bintaro Blok B7/B1 No. 5 Bintaro Jaya Sektor 7, South Tangerang, Banten, Indonesia',
        status: 'Terverifikasi'
    },
]

const colNames = [
    {
        id: 'name',
        label: 'Nama',
        render: (data) => <span>{data.name}</span>
    },
    {
        id: 'email',
        label: 'Email',
        render: (data) => <span>{data.email}</span>
    },
    {
        id: 'status',
        label: 'Status',
        render: (data) => <span>{data.status}</span>
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
    const effectRan = useRef(false)

    const [status, setStatus] = React.useState('all')
    const [companyList, setCompanyList] = React.useState([])

    const handleStatus = (e) => {
        setStatus(e.target.value)
    }

    const detailBtn = (id) => {
        console.log('Detail: ' + id)
        router.push('/admin/company/detail-company')
    }
    
    const actionBtn = [
        {
            icon: <EditIcon />,
            id: 'edit'
        },
        {
            icon: <DeleteIcon />,
            id: 'delete'
        },
        {
            icon: <VisibilityIcon />,
            id: 'detail',
            function: (id) => detailBtn(id)
        },
    ]

    const getListCompany = () => {
        axiosInstance.get(API_COMPANY)
        .then((res) => {
            console.log(res.data)
            setCompanyList(res.data)
            res.data.map((item) => {
                setCompanyList((prevData) => [
                    ...prevData,
                    {
                        name: item.name,
                        email: item.email,
                        status: item.status
                    }
                ])
            })
        })
    }

    console.log(companyList)

    React.useEffect(() => {
        if (effectRan.current === false) {
            getListCompany()  
  
            return () => {
              effectRan.current === true
            }
          }
    }, [])

    return(<>
        <div>
            <BlueCard className={styles.countCard}>
                <div className={styles.textWrap}>
                    <h2 className={cn(styles.count, 'm-0')}><b>4</b></h2>
                    <p className='m-0'>Perusahaan Belum Terverifikasi</p>
                </div>
            </BlueCard>
            <div className='mt-4'>
                <div className='mb-2'>
                    <CustomDropdown value={status} onChange={handleStatus} data={statusData} />
                </div>
                <CustomTable 
                    columns={colNames}
                    data={companyList}
                    actionButton={actionBtn}
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