import styles from "@/styles/components/candidate/home/Filter.module.scss";
import cn from "classnames";
import { Divider } from "@mui/material";

export default function Filter({ pagination, setPagination }) {
  const handleCheckboxChange = (e) => {
    const checkedValue = parseInt(e.target.value); // Mengubah nilai string menjadi angka
    const isChecked = e.target.checked;

    let updatedJobTypes = pagination?.career_levels?.slice(); // Duplicating the array

    // Menambah atau menghapus nilai tergantung pada apakah checkbox dicentang atau tidak
    if (isChecked) {
      updatedJobTypes?.push(checkedValue);
    } else {
      updatedJobTypes = updatedJobTypes?.filter(
        (value) => value !== checkedValue
      );
    }

    setPagination({ ...pagination, career_levels: updatedJobTypes });
  };

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
          <p>Waktu</p>
          <div className="form-check">
            <input
              name="time"
              className="form-check-input"
              type="checkbox"
              value={1}
              onChange={(e) => handleCheckboxChange(e)}
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              WFO
            </label>
          </div>
          <div className="form-check">
            <input
              name="time"
              className="form-check-input"
              type="checkbox"
              value={2}
              onChange={(e) => handleCheckboxChange(e)}
              id="flexCheckDefault1"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              WFH
            </label>
          </div>
          <div className="form-check">
            <input
              name="time"
              className="form-check-input"
              type="checkbox"
              value={3}
              id="flexCheckDefault1"
              onChange={(e) => handleCheckboxChange(e)}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault1">
              Hybrid
            </label>
          </div>
        </div>
        <div className={styles.category}>
          <p>Jenis Pekerjaan</p>
          <div className="form-check">
            <input
              name="jobType"
              className="form-check-input"
              type="radio"
              value={2}
              id="flexCheckDefault1"
              onChange={(e) =>
                setPagination({ ...pagination, career_levels: e.target.value })
              }
            />
            <label className="form-check-label" htmlFor="flexCheckDefault2">
              Full time
            </label>
          </div>
          <div className="form-check">
            <input
              name="jobType"
              className="form-check-input"
              type="radio"
              value={1}
              id="flexCheckDefault2"
              onChange={(e) =>
                setPagination({ ...pagination, career_levels: e.target.value })
              }
            />
            <label className="form-check-label" htmlFor="flexCheckDefault3">
              Part time
            </label>
          </div>
          <div className="form-check">
            <input
              name="jobType"
              className="form-check-input"
              type="radio"
              value={3}
              id="flexCheckDefault3"
              onChange={(e) =>
                setPagination({ ...pagination, career_levels: e.target.value })
              }
            />
            <label className="form-check-label" htmlFor="flexCheckDefault4">
              Kontrak
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
