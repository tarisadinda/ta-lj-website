import CompanyCard from "@/components/candidate/application-list/company-card";
import ProfileLayout from "@/components/candidate/layouts/profile-layout";
import SideMenu from "@/components/candidate/side-menu";
import styles from "@/styles/pages/candidate/ApplicationList.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { axiosInstance } from "src/utils/axios";

export default function ApplicationList() {
  const [params, setParams] = useState({
    size: 10,
    page: 0,
    search: "",
    status: "",
    type_request: "candidate_propose",
  });
  const [listApply, setListApply] = useState([]);

  const getApplyJob = () => {
    axiosInstance
      .get(
        `/candidateJob?size=${params.size}&page=${params.page}&status=${params.status}&type_request=${params.type_request}`
      )
      .then((res) => {
        if (res) {
          const data = res?.data?.data?.data;
          setListApply(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getApplyJob();
  }, []);

  return (
    <>
      <h2>
        <b>Daftar Lamaran Saya</b>
      </h2>
      <div className={styles.cardList}>
        {listApply?.map((value, index) => (
          <Link key={index + 1} href="/candidate/application-detail">
            <CompanyCard data={value} />
          </Link>
        ))}
      </div>
    </>
  );
}

ApplicationList.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
