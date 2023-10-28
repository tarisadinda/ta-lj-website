import React, { useState } from 'react'
import styles from '@/styles/pages/applicant-list/DetailApplicant.module.scss'
import cn from 'classnames'
import BlueCard from "@/components/common/blue-card"
import LayoutMain from "@/components/layouts/main"
import { Avatar, } from '@mui/material'
import { CustomChip } from '@/components/common/chip'
import CustomIconButton from '@/components/common/icon-button'
import EditIcon from '@mui/icons-material/Edit'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { useDispatch, useSelector } from 'react-redux'
import ModalEditStatus from '@/components/modal/edit-application-status'
import { openAlert, setOpenAlert } from 'src/redux/slices/alertSlice'

export default function DetailApplicant() {
    const dispatch = useDispatch()

    const seeAlert = useSelector(openAlert)

    const handleStatusModal = () => {
        dispatch(setOpenAlert(true))
    }

    console.log(seeAlert)
    return(<>
        <div className={styles.row}>
            <div>
                <h4><b>Informasi Pelamar</b></h4>
                <BlueCard className={styles.applicantInfo}>
                    <div className={styles.wrapper}>
                        <Avatar sx={{width: 100, height: 100}} />
                        <div className={styles.textWrap}>
                            <p>Budi Pranowo</p>
                            <p><b>Mobile developer - Level 2</b></p>
                            <p>budi@gmail.com</p>
                            <p>085300422156</p>
                        </div>
                    </div>
                    <div className={styles.btnSection}>
                        <button className={cn(styles.btnIcon, 'btn btn-primary blue')}>
                            <InsertDriveFileIcon />
                            CV - Budi Pranowo
                        </button>
                        <button className={cn(styles.btnIcon, 'btn btn-primary blue')}>
                            <InsertDriveFileIcon />
                            Sertifikat Junior Mobile Developer
                        </button>
                    </div>
                </BlueCard>
            </div>
            <div>
                <div className={styles.editStatus}>
                    <h4 className='mb-0'><b>Status Lamaran</b></h4>
                    <CustomIconButton onClick={handleStatusModal} icon={<EditIcon />} text='Ubah Status' />
                </div>
                <CustomChip label="Dalam Review" bgcolor='#F1C93A' />
            </div>
        </div>
        <div className='mt-5'>
            <h4><b>Informasi Posisi</b></h4>
            <p className={cn(styles.date, 'mb-2')}>Tanggal melamar: 5/10/2022</p>
            <BlueCard className={styles.positionInfo}>
                <p><b>Mobile developer </b></p>
                <p><b>Level 2</b></p>
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
