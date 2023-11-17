import LayoutMain from "@/components/admin/layouts/main"
import IconBtn from "@/components/common/icon-button"
import CustomTable from "@/components/common/table"
import SVGAdd from '@/public/icons/add.svg'

const colList = [
    {
        id: 'name',
        label: 'Nama Role',
        render: (data) => <span>{data.name}</span>
    },
    {
        id: 'description',
        label: 'Deskripsi',
        render: (data) => <span>{data.description}</span>
    },
    {
        id: 'permission_list',
        label: 'Daftar Permission',
        render: (data) => <span>{data.permission_list}</span>
    },
]

export default function Permission() {
    return(<>
        <h4><b>Kelola Hak Akses Pengguna</b></h4>
        <div style={{ margin: '20px 0px'}}>
            <IconBtn 
                title='Tambah Penghasilan' 
                startIcon={<SVGAdd />}
                onClick={() => setIsAddSalary(!isAddSalary)}
                className="btn btn-primary blue" 
            />
        </div>
        <CustomTable
            columns={colList}
            data={permissionsList}
        />
    </>)
}

Permission.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}