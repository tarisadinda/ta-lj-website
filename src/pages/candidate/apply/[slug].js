import cn from "classnames";
import { Avatar } from "@mui/material";
import styles from "@/styles/pages/candidate/ApplyJob.module.scss";
import LayoutMain from "@/components/candidate/layouts/main";
import Link from "next/link";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import React, { useEffect, useState } from "react";
import SubmitApplication from "@/components/candidate/apply-job/submit-application";
import CustomAlert from "@/components/common/alert";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { axiosInstance } from "src/utils/axios";
import { selectUser } from "src/redux/common/userSlice";
import { formatJsDate } from "src/utils/date-formatter";

export default function ApplyJob() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const type = "candidate_propose";
  const { slug } = router.query;

  const [clickSend, setClickSend] = useState(false);
  const [editApplication, setEditApplication] = useState(false);
  const [detailApply, setDetailApply] = useState({});
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")

  const modalEdit = () => {
    setEditApplication(true);
  };

  const applyJob = () => {
    const data = {
      description,
      type_request: type,
    };
    axiosInstance
      .post(`/candidateJob/applyJob/${slug}`, data)
      .then((res) => {
        if (res) {
          setClickSend(true);

          setAlert(true);
          router.push("/candidate/application");
        } else {
          setClickSend(false);
          setError(true);
        }
      })
      .catch((err) => {
        setErrorMessage(err?.response?.data?.message)
        setError(true)});
  };

  const getJobBySlug = () => {
    axiosInstance
      .get(`/jobs/slug/${slug}`)
      .then((res) => {
        if (res) {
          const data = res?.data?.data;
          setDetailApply(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getJobBySlug();
  }, [slug]);

  return (
    <>
      <div className={cn(styles.companyCard, "card")}>
        <div className={styles.companyInfo}>
          <Avatar variant="rounded" sx={{ width: 120, height: 120 }} />
          <div>
            <h3>
              <b>{detailApply?.name}</b>
            </h3>
            <h5 className={styles.compName}>
              {detailApply?.company_detail?.user?.full_name}
            </h5>
            <p className={styles.loc}>{detailApply?.company_detail?.address}</p>
          </div>
        </div>
      </div>
      <div className={styles.formSection}>
        <b className={styles.headline}>Form Pengajuan Lamaran</b>
        <div className={styles.cardApply}>
          <div className={styles.textDetail}>
            <div className={styles.group}>
              <button
                onClick={modalEdit}
                className={cn(styles.skillBtn, "btn")}
              >
                <BorderColorIcon fontSize="small" className={styles.editIcon} />
                <span>Edit Informasi</span>
              </button>
            </div>
          </div>
          <div className={styles.textDetail}>
            <p className="mb-2">
              <b>Curriculum Vitae/Resume</b>
            </p>
            <Link href="#" className={styles.fileCV}>
              {user?.candidate_detail?.cv}
            </Link>
            <span>
              Diupload pada{" "}
              {formatJsDate(user?.candidate_detail?.createdAt, "DD MMMM YYYY")}
            </span>
            <span>
              <b>Upload file dalam format PDF maks 5MB.</b>
            </span>
          </div>
          <div className={styles.textDetail}>
            <p className="mb-2">
              <b>Email</b>
            </p>
            <p className="mb-0">{user?.email}</p>
          </div>
          <div className={styles.textDetail}>
            <p className="mb-2">
              <b>Nomor Telepon</b>
            </p>
            <p className="mb-0">{user?.candidate_detail?.phone_number}</p>
          </div>
          <button onClick={applyJob} className="btn btn-primary blue">
            Kirim Lamaran
          </button>
          <button
            onClick={() => router.back()}
            className="btn btn-secondary blue"
          >
            Batal
          </button>
        </div>
      </div>
      <SubmitApplication
        open={editApplication}
        onClose={() => setEditApplication(false)}
        data={user}
        setDescription={setDescription}
        description={description}
      />
      <CustomAlert
        open={alert}
        severity={"success"}
        text={"Lamaran Berhasil Dikirim!"}
        duration={1500}
        onClose={() => setAlert(false)}
      />
      <CustomAlert
        open={error}
        severity={"error"}
        text={errorMessage ? errorMessage : "Lamaran Gagal Dikirim!"}
        duration={1500}
        onClose={() => setError(false)}
      />
    </>
  );
}

ApplyJob.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
