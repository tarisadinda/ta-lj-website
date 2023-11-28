import LayoutMain from "@/components/admin/layouts/main";
import AddTimeModal from "@/components/admin/modals/add-time-exp";
import IconBtn from "@/components/common/icon-button";
import CustomTable from "@/components/common/table";
import SVGAdd from '@/public/icons/add.svg'
import React from "react";
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
    const [time, setTime] = React.useState([])
    const [addTime, setaddTime] = React.useState(false)
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

    return(<>
        <h4><b>Daftar Pengalaman Kerja (Tahun)</b></h4>
        <div style={{ margin: '20px 0px'}}>
            <IconBtn
                title='Tahun' 
                startIcon={<SVGAdd />}
                onClick={() => setaddTime(!addTime)}
                className="btn btn-primary blue" 
            />
        </div>
        <div>
            <CustomTable
                columns={colList}
                data={timeList}
                idKey='id'
                // deleteFunc={deleteModal}
                // editFunc={editModal}
            />
        </div>
        <AddTimeModal
            open={addTime}
            onClose={() => setaddTime(false)}
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