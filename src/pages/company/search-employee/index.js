import cn from "classnames";
import SearchFilter from "@/components/company/dashboard/search-filter";
import SearchInput from "@/components/company/dashboard/search-input";
import LayoutMain from "@/components/company/layouts/main";
import EmployeeCard from "@/components/company/search-employee/employee-card";
import styles from "@/styles/pages/company/SearchEmployee.module.scss";
import { axiosInstance } from "src/utils/axios";
import { useEffect, useState } from "react";

export default function SearchEmployee() {
  const [candidate, setCandidate] = useState([]);
  const [isFilter, setIsFilter] = useState(true);
  const [pagination, setPagination] = useState({
    size: 10,
    page: 0,
    search: "",
    skill: [],
  });

  const getAllCandidate = () => {
    axiosInstance
      .get(`/candidates`, {
        params: {
          size: pagination.size,
          page: pagination.page,
          search: pagination.search,
          skill: pagination.skill,
        },
      })
      .then((res) => {
        const data = res?.data?.data?.data;
        if (res) {
          setCandidate(data);
        }
      })
      .catch((err) => console.log(err));
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
    getAllCandidate();
    getAllJobs()
  }, []);

  const onSearchCandidate = () => {
    if (pagination.search === "") {
      getAllCandidate();
    } else {
      getAllCandidate();
    }
  };

  return (
    <>
      <p className="mb-2">Tampilkan Berdasarkan</p>
      <div className={styles.colGrid}>
        <div className={styles.leftGrid}>
          <select
            onChange={() => setIsFilter(false)}
            className="form-select mb-3"
          >
            <option value="1">Sma/Smk</option>
            <option value="2">Diploma 3</option>
            <option value="2">Strata 1</option>
          </select>
          {isFilter && (
            <>
              <select disabled className="form-select">
                <option value="1">Sma/Smk</option>
                <option value="2">Diploma 3</option>
                <option value="2">Strata 1</option>
              </select>
              <select placeholder="pilih skill" className="form-select mt-3">
                <option value="1">php</option>
                <option value="2">Laravel</option>
                <option value="2">Js</option>
              </select>
            </>
          )}
        </div>

        <div className={styles.rightGrid}>
          <SearchInput
            value={pagination.search}
            onChange={(e) =>
              setPagination({ ...pagination, search: e.target.value })
            }
            onClick={onSearchCandidate}
          />
          <div className={cn(styles.listEmployee, "mt-3")}>
            {candidate.map((value, index) => (
              <EmployeeCard key={index} data={value} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

SearchEmployee.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
