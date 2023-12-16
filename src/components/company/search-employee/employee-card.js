import styles from "@/styles/components/company/search-employee/EmployeeCard.module.scss";
import { Avatar, Chip } from "@mui/material";
import CustomCard from "../card";
import Link from "next/link";
import EllipsisText from "@/components/common/ellipsis-text";

export default function EmployeeCard({ data }) {
  console.log(data);
  return (
    <>
      <Link href={`/company/search-employee/${data?.id}`}>
        <CustomCard className={styles.wrapper}>
          <Avatar sx={{ width: 70, height: 70 }} />
          <div className={styles.infoEmployee}>
            <p>
              <b>{data?.full_name}</b>
            </p>
            {/* <p className={styles.loc}>
              {data?.candidate_detail?.address}</p> */}
            <EllipsisText 
              text={data?.candidate_detail?.address}
              maxLines={1}
            />
            {/* <p>
              {data?.candidate_detail?.Skill?.map(
                (value, index) => `${value?.name}, `
              )}
            </p> */}
            <EllipsisText 
              text={
                data?.candidate_detail?.Skill?.map(
                  (value, index) => `${value?.name}, `
                )
              } 
              maxLines={2}
            />
            <Chip label="primary" color="primary" />
          </div>
        </CustomCard>
      </Link>
    </>
  );
}
