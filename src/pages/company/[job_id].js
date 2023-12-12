import styles from "@/styles/pages/company/AddJobVacancy.module.scss";
import cn from "classnames";
import CustomCard from "@/components/common/card";
import LayoutMain from "@/components/company/layouts/main";
import WorkIcon from "@mui/icons-material/Work";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance } from "src/utils/axios";
import { API_JOB_TYPE } from "src/utils/api";

export default function JobVacancyEditForm() {
  const router = useRouter();

  const { job_id } = router.query;
  const [job, setJob] = useState({
    name: "",
    description: "",
    salary_max: 0,
    salary_min: 0,
    start_date: "",
    end_date: "",
    time_experiences_id: "",
    career_level_id: "",
    qualification_id: "",
    job_type_work_id: "",
    skill: [],
  });

  const getDetailJob = () => {
    axiosInstance
      .get(`/candidateJob/detail/${job_id}`)
      .then((res) => {
        const data = res?.data?.data;
        setJob({
          name: data?.job?.name,
          description: data?.job?.description,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDetailJob();
  }, [job_id]);

  return (
    <>
      <CustomCard sx={{ padding: "30px", width: "100%" }}>
        <h4 className="d-flex justify-content-center mb-5">
          <b>Edit Lowongan Kerja</b>
        </h4>
        <div className="row">
          <div className="col">
            <label className="form-label">Posisi</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tuliskan posisi yang dibutuhkan"
              value={job?.name}
              onChange={(e) => setJob({ ...job, name: e.target.value })}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label className="form-label">Deskripsi Pekerjaan</label>
            <textarea
              type="text"
              className={cn(styles.textareaHeight, "form-control")}
              placeholder="Tulis deskripsi pekerjaan"
              value={job?.description}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label className="form-label">Kualifikasi</label>
            <select
              name="qualification_id"
              className={cn(styles.selectWidth, "form-select")}
            >
              <option selected disabled>
                Pilih kualifikasi
              </option>
              {/* {filteredQualifications.map((item, index) => (
                <option value={item.id}>{item.name}</option>
              ))} */}
            </select>
          </div>
        </div>
        <div className="row mt-3 ">
          <div className="col">
            <label className="form-label">Gaji</label>
            <div className={styles.salary}>
              <input
                type="text"
                className="form-control"
                placeholder="Gaji minimal"
                name="salary_min"
              />
              <div className="mx-3">-</div>
              <input
                type="text"
                className="form-control"
                placeholder="Gaji maksimal"
                name="salary_max"
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label className="form-label">Lama Pengalaman Kerja</label>
            <select className={cn(styles.selectWidth, "form-select")}>
              <option selected disabled>
                Pilih tahun
              </option>
              <option value="1">Kurang dari setahun</option>
              <option value="2">1 - 3 tahun</option>
              <option value="3">4 - 6 tahun</option>
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label className="form-label">Jenis Pekerjaan</label>
            <div className={styles.optionRow}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadio"
                  id="exampleRadios3"
                  value="option3"
                />
                <label className="form-check-label" htmlFor="exampleRadios3">
                  Full time
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="exampleRadio"
                  id="exampleRadios4"
                  value="option4"
                />
                <label className="form-check-label" htmlFor="exampleRadios4">
                  Part time
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label className="form-label">Metode Kerja</label>
            <div className={styles.optionRow}>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="workMethod"
                  id="method1"
                  value="option3"
                />
                <label className="form-check-label" htmlFor="method1">
                  Work from office
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="workMethod"
                  id="method2"
                  value="option4"
                />
                <label className="form-check-label" htmlFor="method2">
                  Hybrid
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col d-flex flex-column">
            <label className="form-label">
              Tanggal Penutupan Pendaftaran (opsional)
            </label>
            <input type="date" className={styles.calendar} />
          </div>
        </div>
        <div className={styles.actionBtn}>
          <button className={cn(styles.cancelBtn, "btn btn-secondary blue")}>
            Batal
          </button>
          <button className={cn(styles.uploadBtn, "btn btn-primary blue")}>
            Unggah Pekerjaan
          </button>
        </div>
      </CustomCard>
    </>
  );
}

JobVacancyEditForm.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
