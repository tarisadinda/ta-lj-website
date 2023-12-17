import styles from "@/styles/pages/company/search-employee/Detail.module.scss";
import cn from "classnames";
import CustomCard from "@/components/common/card";
import LayoutMain from "@/components/company/layouts/main";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import { axiosInstance } from "src/utils/axios";
import { useEffect, useState } from "react";
import CustomAlert from "@/components/common/alert";
import Link from "next/link";

export default function SearchEmployeeDetail() {
  const router = useRouter();
  const [user, setUser] = useState({});
  const [offer, setOffer] = useState(false);
  const [description, setDescription] = useState("");
  const [listJob, setListJob] = useState([]);
  const [jobId, setJobId] = useState(null);
  const [alert, setAlert] = useState({
    success: false,
    error: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const { id } = router.query;

  const getCandidateDetail = () => {
    axiosInstance
      .get(`/users/${id}`)
      .then((res) => {
        const data = res?.data?.data?.user;
        setUser(data);
      })
      .catch((err) => console.log(err));
  };

  const getAllJobs = () => {
    axiosInstance
      .get(`/jobs?size=10&page=0`)
      .then((res) => {
        const data = res?.data?.data?.data;
        setListJob(data);
      })
      .catch((err) => console.log(err));
  };

  const newListJob = listJob?.map((item) => ({
    key: item?.id,
    value: item?.name,
  }));

  console.log(jobId)
  const giveOffer = () => {
    axiosInstance
      .post(`/candidateJob/givenOffer?candidate_id=${user.candidate_detail?.id}&job_id=${jobId}`, {
        description: description,
      })
      .then((res) => {
        setAlert({ ...alert, success: true });
        setAlert({ ...alert, error: false });

        setTimeout(() => {
          router.push("/company/search-employee");
        }, 1500);
      })
      .catch((err) => {
        setAlert({ ...alert, success: false });
        setAlert({ ...alert, error: true });
        setErrorMessage(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    getCandidateDetail();
    getAllJobs();
  }, [id]);

  console.log(user)
  return (
    <>
      <CustomCard className={styles.wrapCard}>
        <div className={styles.avaInfo}>
          <Avatar sx={{ width: 110, height: 110 }} src={user?.img} />
          <div className={styles.textInfo}>
            <h4 className={styles.name}>
              <b>{user?.full_name}</b>
            </h4>
            <p className={styles.loc}>{user?.candidate_detail?.address}</p>
          </div>
        </div>
        {!offer && (
          <button
            className={cn(styles.offerBtn, "btn btn-primary blue")}
            onClick={() => setOffer(true)}
          >
            Beri Tawaran
          </button>
        )}
      </CustomCard>
      {offer ? (
        <>
          <div className={styles.detailCard}>
            <div>
              <label className="mb-3 mt-3">Posisi</label>
              <select
                placeholder="pilih skill"
                className="form-select"
                onChange={(e) => setJobId(e.target.value)}
              >
                <option selected disabled>
                  Posisi yang ditawarkan
                </option>
                {newListJob?.map((value) => (
                  <option value={value.key}>{value.value}</option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="mb-3">Surat Penawaran</label>
              <textarea
                value={description}
                className={cn(styles.letter, "form-control")}
                placeholder="Tulis surat penawaran untuk kandidat"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <button
                className={cn(styles.offerBtn, "btn btn-secondary blue")}
                onClick={() => setOffer(false)}
              >
                Batal
              </button>
              <button
                style={{ marginLeft: 30 }}
                className={cn(styles.offerBtn, "btn btn-primary blue")}
                onClick={giveOffer}
              >
                Kirim
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.detailCard}>
            <div className={cn(styles.detail, "mt-4")}>
              <div>
                <p>
                  <b>Email</b>
                </p>
                <p>{user?.email}</p>
              </div>
              <div>
                <p>
                  <b>Nomor Handphone</b>
                </p>
                <p>{user?.candidate_detail?.phone_number}</p>
              </div>
            </div>
            <div className={styles.detail}>
              <div>
                <p>
                  <b>Deskripsi diri</b>
                </p>
                <p>{user?.candidate_detail?.description}</p>
              </div>
              <div>
                <p>
                  <b>Curriculum Vitae/Resume</b>
                </p>
                {
                  user?.candidate_detail?.cv.match("/null") == null ?
                  <>
                    <span>Belum mengunggah CV</span>
                  </> :
                  <Link className={styles.pdf} href={user?.candidate_detail?.cv} target="_blank">
                    <p>{user?.candidate_detail?.cv.split('/').pop()}</p>
                  </Link>                  
                }
              </div>
            </div>
          </div>
        </>
      )}
      <CustomAlert
        open={alert.success}
        onClose={() => setAlert({ ...alert, success: false })}
        severity={"success"}
        text="Berhasil Memberi Tawaran"
        duration={1500}
      />
      <CustomAlert
        open={alert.error}
        onClose={() => setAlert({ ...alert, error: false })}
        severity={"error"}
        text={errorMessage}
        duration={1500}
      />
    </>
  );
}

SearchEmployeeDetail.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
