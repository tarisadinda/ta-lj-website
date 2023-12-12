import cn from "classnames";
import styles from "@/styles/components/candidate/offering/OfferingCard.module.scss";
import { Card } from "@mui/material";
import Image from "next/image";
import PlaceIcon from "@mui/icons-material/Place";
import { CustomChip } from "@/components/common/chip";
import CustomAlert from "@/components/common/alert";
import { useState } from "react";
import { axiosInstance } from "src/utils/axios";

export default function OfferingCard({ data, isRecomendation, onClick }) {
  const [openAlert, setOpenAlert] = useState(false);
  const [error, setError] = useState(false);
  const [clickSend, setClickSend] = useState(false);
  const type = "candidate_propose";

  const applyJob = () => {
    const dataUser = {
      description: data?.description,
      type_request: type,
    };
    axiosInstance
      .post(`/candidateJob/applyJob/${data?.slug}`, dataUser)
      .then((res) => {
        if (res.status === 201) {
          setOpenAlert(true); // Tampilkan alert ketika respons 201 diterima
          setClickSend(true);
        } else {
          setOpenAlert(false); // Tutup alert jika respons bukan 201
          setClickSend(false);
          setError(true); // Set error jika respons bukan 201
        }
      })
      .catch((err) => {
        setOpenAlert(false); // Tutup alert jika terjadi error
        setClickSend(false);
        setError(true); // Set error jika terjadi error
      });
  };

  return (
    <>
      <Card
        variant="outlined"
        sx={{ width: "100%", padding: "25px", borderRadius: "10px" }}
        className={styles.cardWrap}
      >
        <div className={styles.textLeft}>
          <Image
            alt="company-img"
            src={
              data?.company_detail?.user?.img ||
              data?.job?.company_detail?.user?.img
            }
            width={100}
            height={100}
            className={styles.logoCompany}
          />
          <div>
            <p className={styles.role}>
              <b>{data?.name || data?.job?.name}</b>
            </p>
            <p className="mb-0">
              {data?.company_detail?.user?.full_name ||
                data?.job?.company_detail?.user?.full_name}
            </p>
            <div className={styles.loc}>
              <PlaceIcon />
              <span>
                {data?.company_detail?.address ||
                  data?.job?.company_detail?.address}
              </span>
            </div>
          </div>
        </div>
        <CustomChip
          disabled={clickSend}
          onClick={applyJob}
          label={
            isRecomendation ? (clickSend ? "Sudah Dilamar" : "Lamar") : "Detail"
          }
          bgcolor={isRecomendation ? "green" : "blue"}
        />

        <CustomAlert
          open={openAlert}
          severity={"success"}
          text={"Lamaran berhasil dikirim!"}
          duration={1500}
          onClose={() => {
            setOpenAlert(false);
          }}
        />
        <CustomAlert
          open={error}
          severity={"error"}
          text={"Lamaran Gagal dikirim!"}
          duration={1500}
          onClose={() => {
            setError(false);
          }}
        />
      </Card>
    </>
  );
}
