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
import { useDispatch } from "react-redux";

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

export default function VacancyList() {
  const router = useRouter();
  const dispatch = useDispatch()

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
                slug: value.slug,
                applicantAccepted: "-",
                entryApplication: "-"
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

  const detailBtn = (slug) => {
    router.push({
      pathname: '/company/vacancy-list/[slug]',
      query: { slug: slug }
    });
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
            idKey="slug"
            data={listJob}
            rowsPerPage='10'
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
