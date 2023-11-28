import React from 'react'
import LayoutMain from "@/components/admin/layouts/main"
import IconBtn from "@/components/common/icon-button"
import CustomTable from "@/components/common/table"
import { useDispatch } from "react-redux"
import SVGAdd from '@/public/icons/add.svg'
import { API_CAREER_LEVEL } from 'src/utils/api'
import { axiosInstance } from 'src/utils/axios'
import { convertDate } from 'src/utils/convert-date'
import AddLevelModal from '@/components/admin/modals/add-career-level'

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
        id: 'updatedAt',
        label: 'Tanggal Dibuat',
        render: (data) => <span>{convertDate(data.updatedAt)}</span>
    },
    {
        id: 'status',
        label: 'Status',
        render: (data) => <span>{data.status == true ? 'Aktif' : 'Non-aktif'}</span>
    },
]

export default function CareerLevel() {
    const dispatch = useDispatch()

    const [addLevel, setAddLevel] = React.useState(false)
    const [levelList, setLevelList] = React.useState([])

    const getCareelLevel = () => {
        axiosInstance.get(API_CAREER_LEVEL)
        .then((res) => {
            console.log(res)
            setLevelList(res.data.data.data)
        }).catch((err) => console.log(err))
    }

    React.useEffect(() => {
        getCareelLevel()
    }, [])

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
                data={levelList}
                idKey='id'
                // deleteFunc={deleteModal}
                // editFunc={editModal}
            />
        </div>
        <AddLevelModal
            open={addLevel}
            onClose={() =>  setAddLevel(!addLevel)}
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