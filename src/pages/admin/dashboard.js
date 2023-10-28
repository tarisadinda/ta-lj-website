import SummaryCard from "@/components/admin/dashboard/summary-card"
import LayoutMain from "@/components/admin/layouts/main"
import styles from '@/styles/pages/admin/Dashboard.module.scss'

export default function Dashboard() {
    return(<>
        <h3><b>Overview</b></h3>
        <div>
            <div>
                <p className="mt-3 mb-2"><b>Pendaftar Baru</b></p>
                <SummaryCard 
                    totalCount='23'
                    companyCount='5'
                    employeeCount='18'
                />
            </div>
            <div className={styles.rowTwo}>
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
            </div>
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