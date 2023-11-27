import ProfileLayout from "@/components/candidate/layouts/profile-layout";
import OfferingCard from "@/components/candidate/offering/offering-card";
import styles from "@/styles/pages/candidate/OfferingList.module.scss";
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
        <b>Penawaran Saya</b>
      </h2>
      <div className={styles.cardList}>
      {listApply?.map((value, index) => (
        <Link href="/candidate/offer-detail">
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
