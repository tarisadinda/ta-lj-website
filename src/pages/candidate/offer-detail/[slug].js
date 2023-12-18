import LayoutMain from "@/components/candidate/layouts/main";
import styles from "@/styles/pages/candidate/OfferDetail.module.scss";
import { Card } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { axiosInstance } from "src/utils/axios";
import { API_CANDIDATE_JOB, API_JOBS } from "src/utils/api";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import CustomAlert from "@/components/common/alert";

export default function OfferDetail() {
  const router = useRouter();
  const slugJob = router.query.slug;

  const [dataCompany, setDataCompany] = React.useState();
  const [alert, setAlert] = React.useState({
    success: false,
    error: false,
  });
  const [errorMsg, setErrorMsg] = React.useState("")
  const user = useSelector(selectUser);
  const dataUserFromToken = getCookie("user");
  const dataUser = dataUserFromToken && JSON?.parse(dataUserFromToken);

  const [userData, setUserData] = React.useState({})

  const getDetailJob = () => {
    axiosInstance
      .get(`${API_JOBS}/slug/${slugJob}`)
      .then((res) => {
        console.log(res);
        setDataCompany(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDetailJob();
    setUserData(dataUser)
  }, [slugJob, user]);

  const submitBtn = () => {
    const formData = {
      status: "accepted",
      type_request: "given_offer",
    };

    axiosInstance
      .post(`${API_CANDIDATE_JOB}/acceptOffers`, formData, {
        params: {
          candidate_job_id: userData?.id,
        },
      })
      .then((res) => {
        setAlert({ ...alert, success: true });
      })
      .catch((err) => {
        setAlert({ ...alert, error: true });
        setErrorMsg(err?.response?.data?.message)
      });
  };

  const declineBtn = () => {
    const formData = {
      status: "rejected",
      type_request: "given_offer",
    };

    axiosInstance
      .post(`${API_CANDIDATE_JOB}/acceptOffers`, formData, {
        params: {
          candidate_job_id: userData?.id,
        },
      })
      .then((res) => {
        setAlert({ ...alert, success: true });
      })
      .catch((err) => {
        setAlert({ ...alert, error: true });
        setErrorMsg(err?.response?.data?.message)
      });
  };

  return (
    <>
      <div>
        <h2>
          <b>Detail Penawaran</b>
        </h2>
        <Card variant="outlined" className={styles.card}>
          <div>
            <p className={styles.company}>
              {dataCompany?.company_detail.user.full_name}
            </p>
            <p className={styles.role}>{dataCompany?.name}</p>
            <div className={styles.loc}>
              <PlaceIcon />
              <span>{dataCompany?.company_detail.address}</span>
            </div>
          </div>
          <div className={styles.action}>
            <button onClick={submitBtn} className="btn btn-primary blue">
              Terima Tawaran
            </button>
            <button onClick={declineBtn} className="btn btn-danger red">
              Tolak Tawaran
            </button>
          </div>
        </Card>
        <div className={styles.colGrid}>
          <div>
            <div>
              <p className="mb-1">
                <b>Deskripsi Pekerjaan</b>
              </p>
              <p>{dataCompany?.description}</p>
            </div>
            <div>
              <p className="mb-1">
                <b>Kualifikasi</b>
              </p>
              <p>{dataCompany?.qualification?.name}</p>
            </div>
            <div className={styles.colFlex}>
              <div>
                <p className="mb-1">
                  <b>Jenis Pekerjaan</b>
                </p>
                <p>{dataCompany?.career_level?.name}</p>
              </div>
              <div>
                <p className="mb-1">
                  <b>Metode Kerja</b>
                </p>
                <p>{dataCompany?.job_type_work?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CustomAlert
        open={alert.success}
        severity={"success"}
        text={"berhasil update profile"}
        duration={2000}
        onClose={() => setAlert({ ...alert, success: false })}
      />
      <CustomAlert
        open={alert.error}
        severity={"error"}
        text={errorMsg}
        duration={2000}
        onClose={() => setAlert({ ...alert, error: false })}
      />
    </>
  );
}

OfferDetail.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
