import LayoutMain from '@/components/layouts/main'
import cn from 'classnames'
import styles from '@/styles/pages/vacancy-list/VacancyDetail.module.scss'
import { CustomChip } from '@/components/common/chip'
import CustomTable from '@/components/common/table'
import React from 'react'
import { useRouter } from 'next/router'

const colNames = [
    {
        id: 'name',
        label: 'Nama Pelamar',
        render: (data) => <span>{data.name}</span>
    },
    {
        id: 'skill',
        label: 'Keahlian',
        render: (data) => <span>{data.skill}</span>
    },
    {
        id: 'date',
        label: 'Tgl Melamar',
        render: (data) => <span>{data.date}</span>
    },
    {
        id: 'status',
        label: 'Status',
        render: (data) => <span>{data.status}</span>
    },
]

const dummyData = [
    {
        id: 1,
        name: 'Carissa Febrianti',
        skill: 'Level 1',
        date: '27/09/2022',
        status: 'Dalam review'
    },
    {
        id: 2,
        name: 'Budi Pranowo',
        skill: 'Level 2',
        date: '27/09/2022',
        status: 'Dalam review'
    },
]

export default function VacancyDetail() {
    const router = useRouter()
    
    const detailBtn = () => {
        router.push('/applicant-list/detail-applicant')
    } 

    return(<>
        <div>
            <div className={cn(styles.groupRole, 'mb-2')}>
                <h3 className='mb-0'><b>UI/UX Designer - Level 1</b></h3>
                <CustomChip label="Lowongan Dibuka" bgcolor='#1C55FF'  />
            </div>
            <p className={cn(styles.date, 'mb-0')}>Lowongan dibuka: 4 September 2022</p>
            <p className={cn(styles.date, 'mb-0')}>Lowongan ditutup: 10 Oktober 2022</p>
        </div>
        <div className='mt-4'>
            <p className='mb-2'>Teknologi</p>
            <p><b>15 Lamaran masuk</b></p>
        </div>
        <div>
            <CustomTable 
                columns={colNames}
                data={dummyData}
                detailFunc={detailBtn}
            />
        </div>
    </>)
}


VacancyDetail.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}