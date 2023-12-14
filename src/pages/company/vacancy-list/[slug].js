import LayoutMain from "@/components/company/layouts/main";
import cn from "classnames";
import styles from "@/styles/pages/company/vacancy-list/VacancyDetail.module.scss";
import { CustomChip } from "@/components/common/chip";
import CustomTable from "@/components/common/table";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "src/utils/axios";
import { API_JOBS } from "src/utils/api";
import { formatDate } from "src/utils/date-formatter";
import { convertDate } from "src/utils/convert-date";

const colNames = [
  {
    id: "name",
    label: "Nama Pelamar",
    render: (data) => <span>{data.full_name}</span>,
  },
  {
    id: "date",
    label: "Tgl Melamar",
    render: (data) => <span>{convertDate(data.createdAt)}</span>,
  },
  {
    id: "status",
    label: "Status",
    render: (data) => (
      <span>
        {data.status == "processed"
          ? "Dalam review"
          : data.status == "accepted"
          ? "Diterima"
          : "Ditolak"}
      </span>
    ),
  },
];

export default function VacancyDetail() {
  const router = useRouter();
  const { slug } = router.query;

  const [jobVacancy, setJobVacancy] = useState();
  const [candidateList, setCandidateList] = useState([]);

  const detailBtn = (id) => {
    router.push(`/company/applicant-list/detail-applicant/${id}`);
  };

  const getCandidateList = () => {
    axiosInstance
      .get(`/candidateJob/listCandidate/${jobVacancy?.id}`)
      .then((res) => {
        if (res) {
          const data = res?.data?.data?.data;
          setCandidateList(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axiosInstance
      .get(`${API_JOBS}/slug/${slug}`)
      .then((res) => {
        console.log(res);
        setJobVacancy(res.data.data);
      })
      .catch((err) => console.log(err));
    getCandidateList();
  }, [slug, jobVacancy?.id]);

  const newCandidateList = candidateList?.map((item) => ({
    id: item?.id,
    full_name: item?.CandidateDetail?.user?.full_name,
    createdAt: item?.createdAt,
    job_name: item?.job?.name,
    status: item?.status,
  }));

  console.log(newCandidateList);

  return (
    <>
      <div>
        <div className={cn(styles.groupRole, "mb-2")}>
          <h3 className="mb-0">
            <b>{jobVacancy?.name}</b>
          </h3>
          {jobVacancy?.status === true ? (
            <CustomChip label="Lowongan Dibuka" bgcolor="#1C55FF" />
          ) : (
            <CustomChip label="Lowongan Ditutup" bgcolor="#B10F0F" />
          )}
        </div>
        <p className={cn(styles.date, "mb-0")}>
          Lowongan dibuka: {formatDate(jobVacancy?.start_date, "DD MMMM YYYY")}
        </p>
        <p className={cn(styles.date, "mb-0")}>
          Lowongan ditutup: {formatDate(jobVacancy?.end_date, "DD MMMM YYYY")}
        </p>
      </div>
      <div className="mt-4">
        <p>
          <b>15 Lamaran masuk</b>
        </p>
      </div>
      <div>
        <CustomTable
          columns={colNames}
          data={newCandidateList}
          detailFunc={detailBtn}
        />
      </div>
    </>
  );
}

VacancyDetail.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
