import LayoutMain from "@/components/admin/layouts/main"
import cn from 'classnames'
import styles from '@/styles/pages/admin/company/DetailVerification.module.scss'
import { Avatar, Card, Chip } from '@mui/material'
import PlaceIcon from '@mui/icons-material/Place'
import Laptop from '@/public/laptop-work.png'
import Image from "next/image"
import Link from "next/link"
import { axiosInstance } from "src/utils/axios"
import { API_VERIF_COMPANY } from "src/utils/api"
import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { formatJsDate } from "src/utils/date-formatter"
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import CustomAlert from "@/components/common/alert"
import { useDispatch, useSelector } from "react-redux"
import { alertMessage, openAlert, setMessage, setOpenAlert, setSeverity, severity } from "src/redux/common/alertSlice"

export default function DetailVerification() {
    const router = useRouter()
    const dispatch = useDispatch()

    const pathUser = router.query.username
    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)
    const alertSeverity = useSelector(severity)
    const [data, setData] = React.useState()
    const [isVerified, setIsVerified] = React.useState(false)
    const [isClicked, setIsClicked] = React.useState(false)

    console.log(router.query.username)
    const verifyBtn = () => {
        axiosInstance.put(`${API_VERIF_COMPANY}/${pathUser}`, {
            status: true
        }).then((res) => {
            if(res) {
                setIsVerified(true)
                setIsClicked(true)
            }
        }).catch((err) => {
            dispatch(setOpenAlert(true))
            dispatch(setMessage(err.response.data.message))
            dispatch(setSeverity('error'))
        })
    }
    
    const declineBtn = () => {
        axiosInstance.put(`${API_VERIF_COMPANY}/${pathUser}`, {
            status: false
        }).then((res) => {
            if(res) {
                setIsVerified(false)
                setIsClicked(true)
            }
        }).catch((err) => {
            dispatch(setOpenAlert(true))
            dispatch(setMessage(err.response.data.message))
            dispatch(setSeverity('error'))
        })
    }

    const getDetail = () => {
        axiosInstance.get(API_VERIF_COMPANY + "/" + pathUser)
        .then((res) => {
            console.log(res)
            setData(res.data.data)
        }).catch((err) => {
            console.log(err)
            if(err.response.data.message == "User Company Tidak ada") {
                dispatch(setOpenAlert(true))
                dispatch(setMessage(err.response.data.message))
                dispatch(setSeverity('error'))

                router.push('/admin/company/new-submission')
            }
        })
    }

    useEffect(() => {
        if(pathUser) {
            getDetail()
        }
    }, [pathUser])

    return(<>
        <h3><b>Permintaan Verifikasi</b></h3>
        <Card className={styles.infoWrapper} variant="outlined">
            {data?.img.includes('/null') ? 
                <Avatar sx={{ width: 80, height: 80 }} /> :
                <Image src={`http://localhost/images/${data?.img}`} 
                    className={styles.logoCompany} 
                    width={150} 
                    height={150} 
                    alt="company-logo" 
                />
            }
            <div className="d-flex flex-column justify-content-around">
                <div>
                    <p className={styles.companyName}>{data?.full_name}</p>
                    <p className={styles.loc}>
                        <PlaceIcon />
                        Malang, Jawa Timur
                    </p>
                </div>
                <div className={styles.actionBtn}>
                    {isClicked ? 
                        isVerified ? 
                            <Chip 
                                icon={<CheckCircleIcon />} 
                                label="Perusahaan berhasil diverifikasi" 
                                color="success" 
                            /> :
                            <Chip 
                                icon={<CancelIcon />} 
                                label="Perusahaan ditolak" 
                                color="error" 
                            /> 
                        :
                        <>
                            <button onClick={verifyBtn} className={cn(styles.button, "btn btn-primary blue")}>Terima</button>
                            <button onClick={declineBtn} className={cn(styles.button, "btn btn-secondary blue")}>Tolak</button>
                        </>
                    }
                </div>
            </div>
        </Card>
        <div className="mt-3">
            <p><b>Tanggal mendaftar: {formatJsDate(data?.company_detail.createdAt)}</b></p>
            <div>
                <div className="row">
                    <p className="col-2"><b>Email</b></p>
                    <p className="col-6"><Link href='#'>{data?.email}</Link></p>
                </div>
                <div className="row">
                    <p className="col-2"><b>Nomor Telepon</b></p>
                    <p className="col-6">{data?.company_detail.phone_number}</p>
                </div>
            </div>
        </div>
        <CustomAlert
            open={isOpenAlert} 
            severity={alertSeverity}
            text={alertMsg}
            duration={2800} 
            onClose={() => dispatch(setOpenAlert(false))} 
        />
    </>)
}

DetailVerification.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}