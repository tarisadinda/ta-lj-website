import { useEffect, useState } from "react";
import styles from "@/styles/pages/candidate/ApplicationDetail.module.scss";
import LayoutMain from "@/components/candidate/layouts/main";
import cn from 'classnames'
import Image from "next/image";
import CompanyImg from "public/images/company.jpg";
import { Divider } from "@mui/material";
import { CustomChip } from "@/components/common/chip";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useRouter } from "next/router";
import { axiosInstance } from "src/utils/axios";
import { chipApplyJob } from "src/utils/common";
import { formatDate } from "src/utils/date-formatter";
import TrueFalseModal from "@/components/common/true-false-modal";
import { API_CANDIDATE_JOB } from "src/utils/api";

export default function ApplicationDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [detailJob, setDetailJob] = useState({});
  const [openModal, setOpenModal] = useState(false)

  const withdrawBtn = () => {
    setOpenModal(true)
  }
  
  const verifyBtn = () => {
    axiosInstance({
      method: "put",
      url: `${API_CANDIDATE_JOB}/withdraw`,
      data: {
        status: true,
      },
      params: {
        candidate_job_id: id
      },
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })


    setOpenModal(false)
  }

  const getJobBySlug = () => {
    axiosInstance
      .get(`/candidateJob/detail/${id}`)
      .then((res) => {
        if (res) {
          const data = res?.data?.data;
          setDetailJob(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getJobBySlug();
  }, [id]);

  const url = detailJob?.CandidateDetail?.cv;
  const urlParts = url?.split("/"); // Memisahkan URL berdasarkan tanda '/'
  const lastString = urlParts?.[urlParts?.length - 1];

  return (
    <>
      <h3 className="mb-4">
        <b>Detail Lamaran</b>
      </h3>
      <div className={styles.jobTitle}>
        <Image
          alt="company-logo"
          src={detailJob?.job?.company_detail?.user?.img}
          width={100}
          height={100}
          className={styles.companyLogo}
        />
        <div>
          <h3>{detailJob?.job?.name}</h3>
          <p className="mb-0">
            {detailJob?.job?.company_detail?.user?.full_name}
          </p>
        </div>
      </div>
      <Divider
        sx={{ borderWidth: "1px", borderColor: "#919293", margin: "25px 0px" }}
      />
      <div className={styles.colGrid}>
        <div>
          <p className={styles.statusText}><b>Status Lamaran</b></p>
          <div className={styles.infoChip}>
            {detailJob?.withdraw == true && 
              chipApplyJob(detailJob?.withdraw) 
            }
            {
              chipApplyJob(detailJob?.status)
            }
          </div>
          <p className="mt-2 mb-4">
            Lamaran dikirim pada{" "}
            {formatDate(detailJob?.createdAt, "DD MMMM YYYY")}
          </p>
          <div>
            <p className="mb-1">
              <b>Nomor Telepon</b>
            </p>
            <p>{detailJob?.CandidateDetail?.phone_number}</p>
          </div>
          <div>
            <p className="mb-1">
              <b>Email</b>
            </p>
            <p>{detailJob?.CandidateDetail?.user?.email}</p>
          </div>
          <div>
            <p className="mb-1">
              <b>Curriculum Vitae/Resume</b>
            </p>
            <p>{lastString}</p>
          </div>
        </div>
        <div>
          <div>
            <p>
              <b>Informasi Pekerjaan</b>
            </p>
            <p>
              <AccessTimeFilledIcon /> {detailJob?.job?.career_level?.name}
            </p>
            <p className="d-flex col-gap-3">
              <LocationOnIcon />
              <span className={styles.workType}>
                <span>{detailJob?.job?.job_type_work?.name}</span>
                <span>{detailJob?.job?.company_detail?.address}</span>
              </span>
            </p>
          </div>
          {detailJob?.withdraw == false &&
            <div>
              <p className="mb-1">
                <b>Tarik Lamaran Kerja</b>
              </p>
              <button
                onClick={withdrawBtn} 
                className={cn(styles.withdrawBtn, "btn btn-primary red")}>
                Tarik Lamaran
              </button>
            </div>
          }
        </div>
      </div>
      <TrueFalseModal
        title='Apakah anda yakin untuk menarik lamaran kerja ini?'
        open={openModal} 
        declineBtn={() => setOpenModal(false)} 
        acceptBtn={verifyBtn} 
      />
    </>
  );
}

ApplicationDetail.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
