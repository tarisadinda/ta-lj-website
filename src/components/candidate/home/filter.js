import styles from "@/styles/components/candidate/home/Filter.module.scss";
import cn from "classnames";
import { Divider } from "@mui/material";
import { careerLevelData, fetchCareerLevel } from "src/redux/admin/careerLevelSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobType, jobTypeData } from "src/redux/admin/jobTypeSlice";

export default function Filter({ pagination, setPagination }) {
  const dispatch = useDispatch()

  const tempLevel = useSelector(careerLevelData)
  const careerLevel = tempLevel?.levels.data?.data
  const filteredLevel = careerLevel?.filter((item) => item.status == true)

  const tempJobType = useSelector(jobTypeData)
  const jobTypeList = tempJobType.jobType?.data?.data

  console.log(jobTypeList)
  const handleCheckboxChange = (e) => {
    const checkedValue = e.target.value; // Mengubah nilai string menjadi angka
    const isChecked = e.target.checked;

    console.log(checkedValue)
    let updatedJobTypes = pagination?.job_type_works?.slice(); // Duplicating the array

    // Menambah atau menghapus nilai tergantung pada apakah checkbox dicentang atau tidak
    if (isChecked) {
      updatedJobTypes?.push(checkedValue);
    } else {
      updatedJobTypes = updatedJobTypes?.filter(
        (value) => value !== checkedValue
      );
    }

    console.log(updatedJobTypes)
    setPagination({ ...pagination, job_type_works: updatedJobTypes });
  };

  React.useEffect(() => {
    dispatch(fetchCareerLevel())
    dispatch(fetchJobType())
  }, [])

  return (
    <>
      <div className={cn(styles.filterWrap, "card")}>
        <b>Filter Pencarian</b>
        <Divider
          sx={{
            opacity: "1",
          }}
        />
        <div className={styles.category}>
          <p>Tipe Pekerjaan</p>
          {jobTypeList?.map((item, index) => (
            <div className="form-check">
              <input
                name="time"
                className="form-check-input"
                type="checkbox"
                value={item.id}
                onChange={(e) => handleCheckboxChange(e)}
                id={`type-${item.id}`}
              />
              <label className="form-check-label" htmlFor={`type-${item.id}`}>
                {item.name}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.category}>
          <p>Level Pekerjaan</p>
          {filteredLevel?.map((item, index) => (
            <div className="form-check">
              <input
                name="jobType"
                className="form-check-input"
                type="radio"
                value={item.id}
                id={index}
                onChange={(e) =>
                  setPagination({ ...pagination, career_levels: e.target.value })
                }
              />
              <label className="form-check-label" htmlFor={index}>
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
