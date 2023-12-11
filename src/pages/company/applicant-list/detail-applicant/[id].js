import React, { useState } from 'react'
import styles from '@/styles/pages/company/applicant-list/DetailApplicant.module.scss'
import cn from 'classnames'
import BlueCard from "@/components/common/blue-card"
import LayoutMain from "@/components/company/layouts/main"
import { Avatar, } from '@mui/material'
import { CustomChip } from '@/components/common/chip'
import CustomIconButton from '@/components/common/icon-button'
import EditIcon from '@mui/icons-material/Edit'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { useDispatch, useSelector } from 'react-redux'
import ModalEditStatus from '@/components/company/modal/edit-application-status'
import { openAlert, setOpenAlert } from 'src/redux/common/alertSlice'
import { useRouter } from 'next/router'
import { axiosInstance } from 'src/utils/axios'
import { API_CANDIDATE_JOB } from 'src/utils/api'

export default function DetailApplicant() {
    const dispatch = useDispatch()
    const router = useRouter()

    const userId = router.query.id

    const seeAlert = useSelector(openAlert)
    const [userData, setUserData] = React.useState('')

    const handleStatusModal = () => {
        dispatch(setOpenAlert(true))
    }

    const getDetailApplicant = () => {
        if(userId != undefined) {
            axiosInstance.get(`${API_CANDIDATE_JOB}/detail/${userId}`)
            .then((res) => {
                console.log(res)
                setUserData(res.data.data)
            }).catch((err) => console.log(err))
        }
    }

    React.useEffect(() => {
        getDetailApplicant()
    }, [])

    console.log(userData)
    return(<>
        <div className={styles.row}>
            <div>
                <h4><b>Informasi Pelamar</b></h4>
                <BlueCard className={styles.applicantInfo}>
                    <div className={styles.wrapper}>
                        <Avatar sx={{width: 100, height: 100}} src={userData.CandidateDetail?.user.img} />
                        <div className={styles.textWrap}>
                            <p><b>{userData.CandidateDetail?.user.full_name}</b></p>
                            <p>{userData.CandidateDetail?.phone_number}</p>
                        </div>
                    </div>
                    <div className={styles.btnSection}>
                        <button className={cn(styles.btnIcon, 'btn btn-primary blue')}>
                            <InsertDriveFileIcon />
                            CV - {userData.CandidateDetail?.cv.split('/').pop()}
                        </button>
                    </div>
                </BlueCard>
            </div>
            <div>
                <div className={styles.editStatus}>
                    <h4 className='mb-0'><b>Status Lamaran</b></h4>
                    <CustomIconButton 
                        onClick={handleStatusModal} 
                        icon={<EditIcon />} 
                        title='Ubah Status' 
                        className='btn btn-secondary blue'
                    />
                </div>
                <CustomChip label="Dalam Review" bgcolor='#F1C93A' />
            </div>
        </div>
        <div className='mt-5'>
            <h4><b>Informasi Posisi</b></h4>
            <p className={cn(styles.date, 'mb-2')}>Tanggal melamar: 5/10/2022</p>
            <BlueCard className={styles.positionInfo}>
                <p><b>{userData.job?.name}</b></p>
                <p>Teknologi</p>
                <p>Fulltime - WFO</p>
            </BlueCard>
        </div>
        <ModalEditStatus open={seeAlert} handleClose={() => dispatch(setOpenModal(false))} />
    </>)
}

DetailApplicant.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}
