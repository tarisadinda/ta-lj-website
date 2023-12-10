import CountingCard from "@/components/company/dashboard/counting-card"
import LayoutMain from "@/components/company/layouts/main"
import CustomTable from "@/components/common/table"
import { useRouter } from "next/router"
import ConfirmDeleteModal from "@/components/common/confirm-delete"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { candidateAppliedList, fetchCandidateApplied } from "src/redux/company/candidateSlice"
import { convertDate } from "src/utils/convert-date"

const colNames = [
    {
        id: 'full_name',
        label: 'Nama Pelamar',
        render: (data) => <span>{data.full_name}</span>
    },
    {
        id: 'job_name',
        label: 'Posisi',
        render: (data) => <span>{data.job_name}</span>
    },
    {
        id: 'createdAt',
        label: 'Tgl Melamar',
        render: (data) => <span>{convertDate(data.createdAt)}</span>
    },
    {
        id: 'status',
        label: 'Status',
        render: (data) => <span>{data.status == 'processed' ? 'Dalam review' :
            data.status == 'accepted' ? 'Diterima' : 'Ditolak'}</span>
    },
]

export default function ApplicantList() {
    const router = useRouter()
    const dispatch = useDispatch()

    const [isDeleteModal, setIsDeleteModal] = React.useState(false)
    const appliedList = useSelector(candidateAppliedList)
    const dataApplied = appliedList.candidateList.data?.data.map((item) => ({
            id: item.id,
            full_name: item.CandidateDetail.user.full_name,
            createdAt: item.createdAt,
            job_name: item.job.name,
            status: item.status
    }))
    const [page, setPage] = React.useState(0)

    console.log(appliedList)
    console.log(dataApplied)
    const getCurrPage = (number) => {
        setPage(number)
    }

    const detailData = (id) => {
        router.push('/company/applicant-list/detail-applicant')
    }

    const deleteData = (id) => {
        console.log(id)
        setIsDeleteModal(true)
    }

    const actionDelete = () => {
        console.log('get api delete')
        setIsDeleteModal(false)
    }

    useEffect(() => {
        dispatch(fetchCandidateApplied())
    }, [])

    return(<>
        <div className="d-flex gap-3 mb-5">
            <CountingCard total='12' title='Pelamar baru untuk direview' />
            <CountingCard total='4' title='Pelamar dalam tahap seleksi' />
            <CountingCard total='2' title='Pelamar yang direach' />
        </div>
        <div>
            <CustomTable 
                columns={colNames}
                data={dataApplied}
                idKey='id'
                rowsPerPage='10'
                totalData={dataApplied?.length}
                getPage={getCurrPage}
                detailFunc={detailData}
                deleteFunc={deleteData}
            />
        </div>
        <ConfirmDeleteModal
            open={isDeleteModal}
            onClose={() => setIsDeleteModal(false)}
            title='Apakah anda yakin untuk menghapus data pelamar ini?'
            delFunc={actionDelete}
        />
    </>)
}

ApplicantList.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}
