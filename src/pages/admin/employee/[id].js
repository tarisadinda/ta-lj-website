import LayoutMain from "@/components/admin/layouts/main"
import styles from '@/styles/pages/admin/employee/Detail.module.scss'
import Avatar from '@mui/material/Avatar'
import { useRouter } from "next/router"
import React from "react"
import { API_USERS } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

export default function NewAccountList() {
    const router = useRouter()
    const id = router.query.id

    const [data, setData] = React.useState()

    const getData = () => {
        axiosInstance.get(`${API_USERS}/${id}`)
        .then((res) => {
            console.log(res)
            setData(res.data.data.user)
        }).catch((err) => {
            console.log(err)
        })
    }

    console.log(data)
    React.useEffect(() => {
        getData()
    }, [id])

    return(<>
        <div className="d-inline-flex align-items-center gap-3">
            <Avatar
                alt="Profile picture"
                src={data?.img ? data?.img : ""}
                sx={{ width: 100, height: 100 }}
            />
            <div>
                <h3><b>{data?.full_name}</b></h3>
                <p className={styles.role}>Mobile developer</p>
            </div>
        </div>
        <div className={styles.tableSection}>
            <div className='row'>
                <div className="col-3"><b>Tanggal Membuat Akun</b></div>
                <div className="col-5">10 September 2022</div>
            </div>
            <div className='row'>
                <div className="col-3"><b>Email</b></div>
                <div className="col-5">{data?.email}</div>
            </div>
            <div className='row'>
                <div className="col-3"><b>Nomor Telepon</b></div>
                <div className="col-5">{data?.candidate_detail == null ? "-" : data?.candidate_detail?.phone_number}</div>
            </div>
            <div className='row'>
                <div className="col-3"><b>Alamat</b></div>
                <div className="col-5">{data?.candidate_detail == null ? "-" : data?.candidate_detail?.address}</div>
            </div>
            <div className='row'>
                <div className="col-3"><b>Deskripsi Diri</b></div>
                <div className="col-5">{data?.candidate_detail == null ? "-" : data.candidate_detail.description}</div>
            </div>
        </div> 
    </>)
}

NewAccountList.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}