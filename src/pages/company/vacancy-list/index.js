import styles from "@/styles/pages/company/VacancyList.module.scss";
import cn from "classnames";
import BlueCard from "@/components/common/blue-card";
import LayoutMain from "@/components/company/layouts/main";
import CustomIconButton from "@/components/common/icon-button";
import AddIcon from "@mui/icons-material/Add";
import CustomTable from "@/components/common/table";
import { useRouter } from "next/router";
import IconBtn from "@/components/common/icon-button";
import SVGAdd from "@/public/icons/add.svg";
import { axiosInstance } from "src/utils/axios";
import { useEffect, useState } from "react";

const colNames = [
  {
    id: "position",
    label: "Posisi",
    render: (data) => <span>{data.position}</span>,
  },
  {
    id: "status",
    label: "Status",
    render: (data) => <span>{data.status}</span>,
  },
  {
    id: "applicantAccepted",
    label: "Pelamar Diterima",
    render: (data) => <span>{data.applicantAccepted}</span>,
  },
  {
    id: "entryApplication",
    label: "Lamaran Masuk",
    render: (data) => <span>{data.entryApplication}</span>,
  },
];

const dummyData = [
  {
    id: 1,
    position: "UI/UX Designer",
    status: "Buka",
    applicantAccepted: "-",
    entryApplication: "15",
  },
  {
    id: 2,
    position: "Mobile Developer",
    status: "Tutup",
    applicantAccepted: "3",
    entryApplication: "12",
  },
];

export default function VacancyList() {
  const router = useRouter();

  const [pagination, setPagination] = useState({
    size: 10,
    page: 0,
    search: "",
  });
  const [listJob, setListJob] = useState({});
  const [job, setJob] = useState({
    totalJob: null,
    openJob: null
  })

  const getAllJobs = () => {
    axiosInstance
      .get(`/jobs?size=${pagination.size}&page=${pagination.page}`)
      .then((res) => {
        if (res) {
          const data = res?.data?.data;
          setJob({...job, totalJob: data?.pagination?.total, openJob: data?.data?.map((value) => value.status)})
          setListJob(
            data?.data.map((value) => {
              return {
                id: value.id,
                position: value.name,
                status: true ? "Buka" : "Tutup",
              };
            })
          );
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllJobs();
  }, []);

  const detailBtn = (id) => {
    console.log(id);
    router.push(`/company/vacancy-list/${id}`);
  };

  const newJobVacancy = () => {
    router.push("/company/add-job-vacancy");
  };

  const deleteJob = (id) => {
    console.log(id);
  };

  const editJob = (id) => {
    router.push("/edit-job-vacancy");
    console.log(id);
  };

  return (
    <>
      <div className={styles.listCard}>
        <BlueCard className={styles.text}>
          <h2>
            <b>{job?.openJob?.length}</b>
          </h2>
          <span>Lowongan dibuka</span>
        </BlueCard>
        <BlueCard className={styles.text}>
          <h2>
            <b>{job?.totalJob}</b>
          </h2>
          <span>Total lowongan</span>
        </BlueCard>
      </div>
      <div className="mt-4">
        <IconBtn
          title="Lowongan Baru"
          startIcon={<SVGAdd />}
          onClick={newJobVacancy}
          className="btn btn-primary blue"
        />
        <div className="mt-3">
          <CustomTable
            columns={colNames}
            idKey="id"
            data={listJob}
            deleteFunc={deleteJob}
            detailFunc={detailBtn}
            editFunc={editJob}
          />
        </div>
      </div>
    </>
  );
}

VacancyList.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
