import LayoutMain from "@/components/candidate/layouts/main";
import styles from "@/styles/pages/candidate/OfferDetail.module.scss";
import { Card } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { axiosInstance } from "src/utils/axios";
import { API_CANDIDATE_JOB, API_JOBS } from "src/utils/api";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function OfferDetail() {
    const router = useRouter()
    const slugJob = router.query.slug

    const [dataCompany, setDataCompany] = React.useState()

    console.log(slugJob)
    const getDetailJob = () => {
        axiosInstance.get(`${API_JOBS}/slug/${slugJob}`)
        .then((res) => {
            console.log(res)
            setDataCompany(res.data.data)
        })
        .catch((err) => console.log(err))
    }

    console.log(dataCompany)
    useEffect(() => {
        getDetailJob()
    }, [slugJob])

    const submitBtn = () => {
        const formData = {
            status: 'accepted',
            type_request: 'given_offer'
        }

        axiosInstance.post(`${API_CANDIDATE_JOB}/acceptOffers`, formData, {
            params: {
                candidate_job_id: dataCompany.id
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err))
    }

    const declineBtn = () =>{
        const formData = {
            status: 'rejected',
            type_request: 'given_offer'
        }

        axiosInstance.post(`${API_CANDIDATE_JOB}/acceptOffers`, formData, {
            params: {
                candidate_job_id: dataCompany.id
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => console.log(err))
    }

    return (
        <>
            <div>
            <h2>
                <b>Detail Penawaran</b>
            </h2>
            <Card variant="outlined" className={styles.card}>
                <div>
                <p className={styles.company}>{dataCompany?.company_detail.user.full_name}</p>
                <p className={styles.role}>{dataCompany?.name}</p>
                <div className={styles.loc}>
                    <PlaceIcon />
                    <span>{dataCompany?.company_detail.address}</span>
                </div>
                </div>
                <div className={styles.action}>
                <button onClick={submitBtn} className="btn btn-primary blue">Terima Tawaran</button>
                <button onClick={declineBtn} className="btn btn-danger red">Tolak Tawaran</button>
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
                {/* <div>
                    <p className="mb-1">
                    <b>Surat Penawaran</b>
                    </p>
                    <p>
                    Selamat pagi, saya perwaklilan dari PT Aruni Indonesia tertarik dengan kualifikasi dan pengalaman yang anda miliki sehingga kami
                    ingin memberikan penawaran anda sebagai Web developer di
                    perusahaan kami. Apabila anda tertarik silahkan menghubungi
                    nomor berikut 085-203144567 untuk mendapatkan arahan
                    selanjutnya. Terima kasih.
                    </p>
                </div> */}
                </div>
            </div>
            </div>
        </>
    );
}

OfferDetail.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
