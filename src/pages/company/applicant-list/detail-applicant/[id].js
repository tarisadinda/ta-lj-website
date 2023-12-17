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
import { useRouter } from 'next/router'
import { candidateDetailData, fetchDetailCandidate } from 'src/redux/company/candidateDetailSlice'
import Link from 'next/link'
import LaunchIcon from '@mui/icons-material/Launch'

export default function DetailApplicant() {
    const dispatch = useDispatch()
    const router = useRouter()

    const userId = router.query.id

    // const [userData, setUserData] = React.useState('')
    const tempData = useSelector(candidateDetailData)
    const userData = tempData.dataCandidate.data
    const [editStatus, setEditStatus] = React.useState(false)

    const handleStatusModal = () => {
        setEditStatus(true)
    }

    console.log(userId)

    React.useEffect(() => {
        dispatch(fetchDetailCandidate(userId))
    }, [userId])

    console.log(userData)
    return(<>
        <div className={styles.row}>
            <div>
                <h4><b>Informasi Pelamar</b></h4>
                <BlueCard className={styles.applicantInfo}>
                    <div className={styles.wrapper}>
                        <Avatar sx={{width: 100, height: 100}} src={userData?.CandidateDetail?.user.img} />
                        <div className={styles.textWrap}>
                            <p><b>{userData?.CandidateDetail?.user.full_name}</b></p>
                            <p>{userData?.CandidateDetail?.phone_number}</p>
                        </div>
                    </div>
                    <div className={styles.btnSection}>
                        <Link href={userData != undefined? userData?.CandidateDetail?.cv : ""} target='_blank'>
                            <button className={cn(styles.btnIcon, 'btn btn-primary blue')}>
                                <div className={styles.leftSide}>
                                    <InsertDriveFileIcon />
                                    <span>CV - {userData?.CandidateDetail?.cv.split('/').pop()}</span>
                                </div>
                                <LaunchIcon sx={{ fontSize: 15 }} />
                            </button>
                        </Link>
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
                {userData?.status == "accepted" ? 
                    <CustomChip label="Diterima" bgcolor='#17AD47' /> :
                    userData?.status == "processed" ?
                    <CustomChip label="Dalam Review" bgcolor='#F1C93A' /> :
                    <CustomChip label="Ditolak" bgcolor='#D41C1D' />
                }
            </div>
        </div>
        <div className='mt-5'>
            <h4><b>Informasi Posisi</b></h4>
            <p className={cn(styles.date, 'mb-2')}>Tanggal melamar: 5/10/2022</p>
            <BlueCard className={styles.positionInfo}>
                <p><b>{userData?.job?.name}</b></p>
                <p>{userData?.job?.career_level.name} - {userData?.job?.job_type_work.name}</p>
            </BlueCard>
        </div>
        <ModalEditStatus id={userId} open={editStatus} handleClose={() => setEditStatus(false)} />
    </>)
}

DetailApplicant.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}
