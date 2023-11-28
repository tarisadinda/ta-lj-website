import React, { useEffect, useState } from "react";
import Filter from "@/components/candidate/home/filter";
import JobCard from "@/components/candidate/home/job-card";
import LayoutMain from "@/components/candidate/layouts/main";
import SearchInput from "@/components/candidate/search-input";
import styles from "@/styles/pages/candidate/Home.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "src/redux/common/userSlice";
import { axiosInstance } from "src/utils/axios";
import { setCookie } from "cookies-next";

export default function Home() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  setCookie("user", user)

  const [isLoading, setIsLoading] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [pagination, setPagination] = useState({
    size: 10,
    page: 0,
    search: "",
    career_levels: [],
    job_type_works: null,
  });

  const getProfile = () => {
    axiosInstance
      .get("/candidateDetail")
      .then((res) => {
        setIsLoading(true);

        if (res) {
          const data = res?.data?.data;
          dispatch(
            setUser({
              username: data?.username,
              full_name: data?.full_name,
              img: data?.img,
              email: data?.email,
              candidate_detail: {
                address: data?.candidate_detail?.address,
                createdAt: data?.candidate_detail?.createdAt,
                cv: data?.candidate_detail?.cv,
                id: data?.candidate_detail?.id,
                description: data?.candidate_detail?.description,
                phone_number: data?.candidate_detail?.phone_number,
                updatedAt: data?.candidate_detail?.updatedAt,
                user_id: data?.candidate_detail?.user_id,
                skill: data?.candidate_detail?.Skill,
              },
            })
          );
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getJobs = () => {
    axiosInstance
      .get(`/jobs`, {
        params: {
          size: pagination.size,
          page: pagination.page,
          search: pagination.search,
          career_levels: pagination.career_levels,
          job_type_works:
            pagination.job_type_works !== null ? pagination.job_type_works : "",
        },
      })
      .then((res) => {
        const data = res?.data?.data?.data;
        if (res) {
          setJobList(data);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getJobs();
  }, [pagination]);

  const onSearchJob = () => {
    if (pagination.search === "") {
      getJobs();
    } else {
      getJobs();
    }
  };

  useEffect(() => {
    if (!isLoading) {
      getProfile();
    }
  }, []);

  return (
    <>
      <div>
        <p className={styles.title}>Temukan Lowongan Terdekat dari Lokasimu!</p>
        <div className={styles.searchSection}>
          <SearchInput
            value={pagination.search}
            onChange={(e) =>
              setPagination({ ...pagination, search: e.target.value })
            }
            onClick={onSearchJob}
          />
        </div>
        <div className={styles.mainContent}>
          <Filter pagination={pagination} setPagination={setPagination} />
          <div className={styles.jobList}>
            {jobList &&
              jobList?.map((value, index) => (
                <JobCard data={value} key={index + 1} />
              ))}
            {jobList.length === 0 && (
              <p className={styles.title}>Tidak ada Job List</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
