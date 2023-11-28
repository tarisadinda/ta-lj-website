import LayoutMain from "@/components/admin/layouts/main"
import IconBtn from "@/components/common/icon-button"
import CustomTable from "@/components/common/table"
import SVGAdd from '@/public/icons/add.svg'
import React from "react"
import { API_SKILL } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

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

export default function Skills() {
    const [addSkill, setAddSkill] = React.useState(false)
    const [dataList, setDataList] = React.useState([])

    const getSkill = () => {
        axiosInstance.get(API_SKILL)
        .then((res) => {
            console.log(res)
            setDataList(res.data.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    React.useEffect(() => {
        getSkill()
    }, [])

    console.log(dataList)
    return(<>
        <h4><b>Daftar Keahlian</b></h4>
        <div style={{ margin: '20px 0px'}}>
            <IconBtn 
                title='Keahlian' 
                startIcon={<SVGAdd />}
                onClick={() => setAddSkill(!addSkill)}
                className="btn btn-primary blue" 
            />
        </div>
        <div>
            <CustomTable
                columns={colList}
                data={dataList}
                idKey='id'
                // deleteFunc={deleteModal}
                // editFunc={editModal}
            />
        </div>
    </>)
}

Skills.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}