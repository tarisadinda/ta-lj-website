import cn from "classnames";
import SearchFilter from "@/components/company/dashboard/search-filter";
import SearchInput from "@/components/company/dashboard/search-input";
import LayoutMain from "@/components/company/layouts/main";
import EmployeeCard from "@/components/company/search-employee/employee-card";
import styles from "@/styles/pages/company/SearchEmployee.module.scss";

export default function SearchEmployee() {
  return (
    <>
      <p className="mb-2">Tampilkan Berdasarkan</p>
      <div className={styles.colGrid}>
        <div className={styles.leftGrid}>
          <select className="form-select">
            <option value="1">Sma/Smk</option>
            <option value="2">Diploma 3</option>
            <option value="2">Strata 1</option>
          </select>
          <select placeholder="pilih skill" className="form-select mt-3">
            <option value="1">php</option>
            <option value="2">Laravel</option>
            <option value="2">Js</option>
          </select>
        </div>

        <div className={styles.rightGrid}>
          <SearchInput />
          <div className={cn(styles.listEmployee, "mt-3")}>
            <EmployeeCard />
            <EmployeeCard />
          </div>
        </div>
      </div>
    </>
  );
}

SearchEmployee.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
