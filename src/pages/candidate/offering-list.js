import ProfileLayout from "@/components/candidate/layouts/profile-layout";
import OfferingCard from "@/components/candidate/offering/offering-card";
import cn from 'classnames'
import CustomAlert from "@/components/common/alert";
import styles from "@/styles/pages/candidate/OfferingList.module.scss";
import { Alert, AlertTitle } from "@mui/material";
import { getCookie, getCookies } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { axiosInstance } from "src/utils/axios";
import { API_CANDIDATE_JOB, API_JOBS } from "src/utils/api";

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

  const getOffering = () => {
    axiosInstance
      .get(`${API_CANDIDATE_JOB}`, {
        params: {
          size: 10,
          page: 0,
          type_request: "given_offer"
        }
      }).then((res) => {
        console.log(res)
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
    getOffering();
    getRecomendationJob();
  }, []);

  console.log(listApply)
  return (
    <>
      <h2>
        <b>Penawaran Saya</b>
      </h2>
      <div className={styles.cardList}>
        <p className="mb-1"><b>Lowongan kerja yang cocok dengan keahlian anda</b></p>
        {listJob.length == 0? 
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            Belum ada lowongan yang sesuai dengan keahlian anda. Silahkan lengkap daftar keahlian anda untuk bisa mendapatkan rekomendasi lowongan kerja.
          </Alert> :
          listJob?.map((value, index) => (
            <OfferingCard key={index} isRecomendation={true} data={value} />
          ))
        }
        <p className="mb-1"><b>Daftar Perusahaan yang menawarkan pekerjaan</b></p>
        {listApply.length > 0 ?
          listApply?.map((value, index) => (
            <Link key={index} href={`/candidate/offer-detail/${value.id}`}>
              <OfferingCard data={value} />
            </Link>
          )) : 
          <div className={cn(styles.noJob, "card")}>
            <p className={styles.noList}>Belum ada tawaran pekerjaan</p>
          </div>
        }
      </div>
    </>
  );
}

OfferingList.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
