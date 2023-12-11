import styles from "@/styles/components/company/search-employee/EmployeeCard.module.scss";
import { Avatar } from "@mui/material";
import CustomCard from "../card";
import Link from "next/link";

export default function EmployeeCard({ data }) {
  console.log(data);
  return (
    <>
      <Link href="/company/search-employee/detail">
        <CustomCard className={styles.wrapper}>
          <Avatar sx={{ width: 70, height: 70 }} />
          <div className={styles.infoEmployee}>
            <p>
              <b>{data?.full_name}</b>
            </p>
            <p className={styles.loc}>{data?.candidate_detail?.address}</p>
            <p>
              {data?.candidate_detail?.Skill?.map(
                (value, index) => `${value?.name}, `
              )}
            </p>
          </div>
        </CustomCard>
      </Link>
    </>
  );
}
