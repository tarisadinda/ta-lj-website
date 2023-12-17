import styles from "@/styles/components/company/search-employee/EmployeeCard.module.scss";
import { Avatar, Chip } from "@mui/material";
import CustomCard from "../card";
import Link from "next/link";
import EllipsisText from "@/components/common/ellipsis-text";
import React from "react";

export default function EmployeeCard({ data }) {
  const selectedSkill = data?.candidate_detail?.Skill.length > 3 ? 
    (data?.candidate_detail?.Skill.slice(0, 3)) : 'null'
  const countRestTag = data?.candidate_detail?.Skill.length - 3 > 0 ? (data?.candidate_detail?.Skill.length - 3) : '0'

  console.log(data);
  console.log(selectedSkill)
  console.log(countRestTag)

  return (
    <>
      <Link href={`/company/search-employee/${data?.id}`}>
        <CustomCard className={styles.wrapper}>
          <Avatar sx={{ width: 70, height: 70 }} />
          <div className={styles.infoEmployee}>
            <div>
              <p>
                <b>{data?.full_name}</b>
              </p>
              <EllipsisText 
                text={data?.candidate_detail?.address}
                maxLines={1}
              />
            </div>
            <div className={styles.tagList}>
              {data?.candidate_detail?.Skill?.length > 3 ?
                <>
                  {selectedSkill != "null" && selectedSkill?.map((item, index) => (
                    <Chip key={index} label={item.name} color="primary" />
                  ))}
                  <Chip label={`+${countRestTag} skill more`} color="primary" />
                </> :
                data?.candidate_detail?.Skill?.map((item, index) => (
                  <Chip key={index} label={item.name} color="primary" />
                ))
              }
            </div>
          </div>
        </CustomCard>
      </Link>
    </>
  );
}
