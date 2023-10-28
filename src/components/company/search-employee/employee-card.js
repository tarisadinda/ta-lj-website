import styles from '@/styles/components/search-employee/EmployeeCard.module.scss'
import { Avatar } from "@mui/material";
import CustomCard from "../card";
import Link from 'next/link';

export default function EmployeeCard() {
    return (<>
        <Link href='/search-employee/detail'>
            <CustomCard className={styles.wrapper}>
                <Avatar sx={{ width: 70, height: 70 }} />
                <div className={styles.infoEmployee}>
                    <p><b>Budi Santoso</b></p>
                    <p className={styles.loc}>Surabaya, Jawa Timur</p>
                    <p>Web Developer | Level 1</p>
                </div>
            </CustomCard>
        </Link>
    </>)
}