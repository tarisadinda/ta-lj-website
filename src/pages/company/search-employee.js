import cn from 'classnames'
import SearchFilter from '@/components/dashboard/search-filter'
import SearchInput from '@/components/dashboard/search-input'
import LayoutMain from '@/components/layouts/main'
import EmployeeCard from '@/components/search-employee/employee-card'
import styles from '@/styles/pages/SearchEmployee.module.scss'

export default function SearchEmployee() {
    return(<>
        <p className='mb-2'>Tampilkan Berdasarkan</p>
        <div className={styles.colGrid}>
            <div className={styles.leftGrid}>
                <select className="form-select">
                    <option value="1">Semua Pelamar</option>
                    <option value="2">Pernah Melamar</option>
                </select>
                <div className='mt-3'>
                    <SearchFilter />
                </div>
            </div>
            <div className={styles.rightGrid}>
                <SearchInput />
                <div className={cn(styles.listEmployee, 'mt-3')}>
                    <EmployeeCard />
                    <EmployeeCard />
                </div>
            </div>
        </div>
    </>)
}

SearchEmployee.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}
