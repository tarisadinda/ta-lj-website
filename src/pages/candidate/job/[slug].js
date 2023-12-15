import cn from "classnames";
import styles from "@/styles/pages/candidate/AboutVacancy.module.scss";
import Avatar from "@mui/material/Avatar";
import LayoutMain from "@/components/candidate/layouts/main";
import { Tabs, Tab, Card } from "@mui/material";
import React, { useEffect, useState } from "react";
import CompanyDetail from "@/components/candidate/about-vacancy/company-detail";
import VacancyDetail from "@/components/candidate/about-vacancy/vacancy-detail";
import { useRouter } from "next/router";
import { axiosInstance } from "src/utils/axios";

export default function AboutVacancy() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(0);
  const [detailJob, setDetailJob] = useState({})

  const { slug } = router.query;

  const getJobBySlug = () => {
    axiosInstance.get(`/jobs/slug/${slug}`).then((res) => {
        if(res) {
            const data = res?.data?.data
            setDetailJob(data)
        }
    }).catch((err) => console.log(err))
  }

  const handleTab = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const applyBtn = () => {
    router.push(`/candidate/apply/${slug}`);
  };

  useEffect(() => {
    getJobBySlug()
  }, [slug])

  return (
    <>
      <div className={cn(styles.companyCard, "card")}>
        <div className={styles.companyInfo}>
          <Avatar 
            src={detailJob?.company_detail?.user?.img} 
            variant="rounded" 
            sx={{ width: 120, height: 120 }} 
            className={styles.companyImg}
          />
          <div>
            <h3>{detailJob?.name}</h3>
            <h5 className={styles.compName}>{detailJob?.company_detail?.user?.full_name}</h5>
            <p className={styles.loc}>{detailJob?.company_detail?.address}</p>
            <button
              className={cn(styles.applyBtn, "btn-primary blue")}
              onClick={applyBtn}
            >
              Lamar Sekarang
            </button>
          </div>
        </div>
      </div>
      <div className={styles.actionBtn}>
        {/* <button className={cn(styles.jobBtn, 'btn btn-primary blue')}>
                Tentang Pekerjaan
            </button>
            <button className={cn(styles.companyBtn, 'btn btn-secondary blue')}>
                Tentang Perusahaan
            </button> */}
        <Tabs value={selectedTab} onChange={handleTab}>
          <Tab
            label="Tentang Pekerjaan"
            sx={{
              textTransform: "capitalize",
            }}
          />
          <Tab
            label="Tentang Perusahaan"
            sx={{
              textTransform: "capitalize",
            }}
          />
        </Tabs>
      </div>
      {selectedTab === 0 ? <VacancyDetail data={detailJob} /> : <CompanyDetail data={detailJob} />}
    </>
  );
}

AboutVacancy.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
