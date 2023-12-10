import styles from "@/styles/pages/company/Dashboard.module.scss";
import LayoutMain from "@/components/company/layouts/main";
import { Alert, AlertTitle, Avatar, Collapse } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CustomCard from "@/components/common/card";
import { axiosInstance } from "src/utils/axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCompany, setCompany } from "src/redux/common/companySlice";
import { setCookie } from "cookies-next";
import { API_COMPANY_PROFILE } from "src/utils/api";
import Link from "next/link";

export default function Dashboard() {
  const dispatch = useDispatch();
  const company = useSelector(selectCompany);

  const [pagination, setPagination] = useState({
    size: 10,
    page: 0,
    search: "",
  });

  const getProfileCompany = () => {
    axiosInstance.get(API_COMPANY_PROFILE).then((res) => {
      if (res) {
        const data = res?.data?.data;
        const cookieData = {
          username: data?.username,
          email: data?.email,
          full_name: data?.full_name,
          img: data?.img,
          company_detail: {
            id: data?.company_detail?.id,
            user_id: data?.company_detail?.user_id,
            address: data?.company_detail?.address,
            about_company: data?.company_detail?.about_company,
            phone_number: data?.company_detail.phone_number,
            status_disband: data?.company_detail?.status_disband,
            status_verif: data?.company_detail?.status_verif,
            status_completed: data?.company_detail?.status_completed,
            createdAt: data?.company_detail?.createdAt,
            updateAt: data?.company_detail?.updateAt,
          },
        }

        dispatch(
          setCompany({
            username: data?.username,
            email: data?.email,
            full_name: data?.full_name,
            img: data?.img,
            company_detail: {
              id: data?.company_detail?.id,
              user_id: data?.company_detail?.user_id,
              address: data?.company_detail?.address,
              about_company: data?.company_detail?.about_company,
              phone_number: data?.company_detail.phone_number,
              status_disband: data?.company_detail?.status_disband,
              status_verif: data?.company_detail?.status_verif,
              status_completed: data?.company_detail?.status_completed,
              createdAt: data?.company_detail?.createdAt,
              updateAt: data?.company_detail?.updateAt,
            },
          })
        );

        setCookie(
          "company_detail",
          JSON.stringify(cookieData)
        )
      }
    });
  };

  const getAllJobs = () => {
    axiosInstance
      .get(
        `/jobs?size=${pagination.size}&page=${pagination.page}&search=${pagination.search}`
      )
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfileCompany();
    getAllJobs();
  }, []);

  useEffect(() => {
    setCookie(
      "company_detail",
      JSON.stringify(company)
    )
  }, [company])

  return (
    <>
      {company.company_detail.status_completed == true ? <></> :
        <Collapse in={true} sx={{ marginBottom: '20px' }}>
          <Alert severity="warning"> 
              <AlertTitle>Info</AlertTitle>
              Silahkan lengkapi profil anda untuk bisa membuat lowongan pekerjaan.{" "}<strong><Link href='/company/edit-company-profile' style={{ textDecoration: 'underline' }}>Lengkapi sekarang.</Link></strong>
          </Alert>
        </Collapse>
      }
      <CustomCard className={styles.card}>
        <Avatar sx={{ bgcolor: "#FFC68E" }}>
          <WorkIcon />
        </Avatar>
        <p className="mb-0">5 Lowongan kerja di buka</p>
      </CustomCard>
      <CustomCard className={styles.cardStatistic}>
        <Avatar sx={{ bgcolor: "#FFC68E" }}>
          <PeopleAltIcon />
        </Avatar>
        <div className={styles.details}>
          <h4>
            <b>Statistik Pendaftar</b>
          </h4>
          <p>Review : 10 Pelamar</p>
          <p>Seleksi : 3 Pelamar</p>
          <p>Ditolak : 8 Pelamar</p>
        </div>
      </CustomCard>
    </>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
