import SummaryCard from "@/components/admin/dashboard/summary-card"
import LayoutMain from "@/components/admin/layouts/main"
import styles from '@/styles/pages/admin/Dashboard.module.scss'
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUserList, userListData } from "src/redux/common/userListSlice"
import { API_USERS } from "src/utils/api"
import { axiosInstance } from "src/utils/axios"

export default function Dashboard() {
    const dispatch = useDispatch()

    const dataAccount = useSelector(userListData)
    const totalAccount = dataAccount.userList.data?.user.pagination.total
    const [countCompany, setCountCompany] = React.useState(0)
    const [countCandidate, setCountCandidate] = React.useState(0)
    
    const companiesList = () => {
        axiosInstance.get(API_USERS, {
            params: {
                role_id: 2
            }
        })
        .then((res) => {
            console.log(res)
            setCountCompany(res.data.data.user.pagination.total)
        }).catch((err) => {
            console.log(err)
        })
    }

    const candidateList = () => {
        axiosInstance.get(API_USERS, {
            params: {
                role_id: 3
            }
        }).then((res) => {
            console.log(res)
            setCountCandidate(res.data.data.user.pagination.total)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        dispatch(fetchUserList({
            page: '',
            size: '',
            role_id: ''
        }))

        companiesList()
        candidateList()
    }, [])

    return(<>
        <h3><b>Overview</b></h3>
        <div>
            <div>
                <p className="mt-3 mb-2"><b>Total Pengguna</b></p>
                <SummaryCard 
                    totalCount={totalAccount}
                    companyCount={countCompany}
                    employeeCount={countCandidate}
                />
            </div>
            {/* <div className={styles.rowTwo}>
                <div>
                    <p className="mt-3 mb-2"><b>Akun Terverifikasi</b></p>
                    <SummaryCard 
                        totalCount='10'
                        companyCount='2'
                        employeeCount='8'
                    />
                </div>
                <div>
                    <p className="mt-3 mb-2"><b>Akun Belum Terverifikasi</b></p>
                    <SummaryCard 
                        totalCount='13'
                        companyCount='3'
                        employeeCount='10'
                    />
                </div>
            </div> */}
        </div>
    </>)
}

Dashboard.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}