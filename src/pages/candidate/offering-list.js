import ProfileLayout from "@/components/candidate/layouts/profile-layout";
import OfferingCard from "@/components/candidate/offering/offering-card";
import CustomAlert from "@/components/common/alert";
import styles from "@/styles/pages/candidate/OfferingList.module.scss";
import { getCookie, getCookies } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { axiosInstance } from "src/utils/axios";

export default function OfferingList() {
  const [params, setParams] = useState({
    size: 10,
    page: 0,
    search: "",
    status: "",
    type_request: "given_offer",
  });
  const [listApply, setListApply] = useState([]);
  const [listJob, setListJob] = useState([]);
  const cookieUser = getCookie("user");
  const user = !!cookieUser && JSON.parse(cookieUser);
  const userSkill = user?.candidate_detail?.skill?.map(
    (value) => value?.combination_candidate_skills?.skill_id
  );
  const skillIds = userSkill?.map((skillId) => `skill=${skillId}`).join("&");

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

  const getRecomendationJob = () => {
    axiosInstance
      .get(`/jobs/recommendation?size=${3}&${skillIds}`)
      .then((res) => {
        if (res) {
          const data = res?.data?.data?.data;
          setListJob(data);
        }
      })
      .catch((err) => console.log(err));
  };

  
  useEffect(() => {
    getApplyJob();
    getRecomendationJob();
  }, []);

  return (
    <>
      <h2>
        <b>Penawaran Saya</b>
      </h2>
      <div className={styles.cardList}>
        <p>Lowongan kerja yang cocok dengan keahlian anda</p>
        {listJob?.map((value, index) => (
          <OfferingCard key={index} isRecomendation={true} data={value} />
        ))}
        <p>Daftar Perusahaan yang menawarkan pekerjaan</p>
        {listApply?.map((value, index) => (
          <Link key={index} href="/candidate/offer-detail">
            <OfferingCard data={value} />
          </Link>
        ))}
      </div>

    </>
  );
}

OfferingList.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
