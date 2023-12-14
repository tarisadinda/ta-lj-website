import styles from "@/styles/pages/company/AddJobVacancy.module.scss";
import CustomCard from "@/components/common/card";
import LayoutMain from "@/components/company/layouts/main";
import cn from "classnames";
import React, { useEffect } from "react";
import { CustomChip } from "@/components/common/chip";
import { axiosInstance } from "src/utils/axios";
import {
  API_JOBS,
  API_JOB_TYPE,
  API_QUALIFICATION,
  API_TIME_EXP,
  API_SKILL,
  API_CAREER_LEVEL,
} from "src/utils/api";
import CustomAlert from "@/components/common/alert";
import { formatJsDate } from "src/utils/date-formatter";
import { useRouter } from "next/router";

export default function JobVacancyForm() {
  const router = useRouter();

  const [qualifications, setQualifications] = React.useState([]);
  const filteredQualifications = qualifications.filter(
    (item) => item.status != false
  );
  const [years, setYears] = React.useState([]);
  const [jobType, setJobType] = React.useState([]);
  const [skill, setSkill] = React.useState([]);
  const [level, setLevel] = React.useState([]);
  const [jobForm, setJobForm] = React.useState({
    name: "",
    description: "",
    qualification_id: 0,
    salary_min: 0,
    salary_max: 0,
    time_experiences: 0,
    career_level_id: 0,
    job_type: 0,
    start_date: "",
    end_date: "",
  });
  const [skillList, setSkillList] = React.useState([]);
  const [alert, setAlert] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const getQualifications = () => {
    axiosInstance
      .get(API_QUALIFICATION)
      .then((res) => {
        console.log(res);
        setQualifications(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getYear = () => {
    axiosInstance
      .get(API_TIME_EXP)
      .then((res) => {
        console.log(res);
        setYears(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getJobType = () => {
    axiosInstance
      .get(API_JOB_TYPE)
      .then((res) => {
        console.log(res);
        setJobType(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSkill = () => {
    axiosInstance
      .get(API_SKILL)
      .then((res) => {
        console.log(res);
        setSkill(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLevel = () => {
    axiosInstance
      .get(API_CAREER_LEVEL)
      .then((res) => {
        console.log(res);
        setLevel(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    getQualifications();
    getYear();
    getJobType();
    getSkill();
    getLevel();
  }, []);

  const selectSkill = (e) => {
    if (!skillList.includes(e.target.value)) {
      setSkillList((prevData) => [...prevData, e.target.value]);
    }
  };

  const deleteSkill = (id) => {
    skillList.splice(id, 1);
    setSkillList(
      skillList.filter((data) => {
        return data !== id;
      })
    );
  };

  const handleChange = (e) => {
    setJobForm({
      ...jobForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", jobForm.name);
    formData.append("description", jobForm.description);
    formData.append("salary_min", jobForm.salary_min);
    formData.append("salary_max", jobForm.salary_max);
    formData.append(
      "start_date",
      formatJsDate(jobForm.start_date, "MM-DD-YYYY")
    );
    formData.append("end_date", formatJsDate(jobForm.end_date, "MM-DD-YYYY"));
    formData.append("time_experiences_id", jobForm.time_experiences);
    formData.append("job_type_work_id", jobForm.job_type);
    formData.append("career_level_id", jobForm.career_level_id);
    formData.append("qualification_id", jobForm.qualification_id);

    skillList.forEach((skillId) => {
      formData.append("skill", skillId);
    });

    axiosInstance({
      method: "post",
      url: API_JOBS,
      data: formData,
    })
      .then((res) => {
        setTimeout(() => {
          router.push("/company/vacancy-list");
          setAlert(true);
          setError(false);
        }, 1500);
      })
      .catch((err) => {
        setAlert(false);
        setError(true);
        setErrorMessage(err?.response?.data?.message);
      });
  };

  return (
    <>
      <CustomCard sx={{ width: "100%", padding: "60px" }}>
        <h4 className="d-flex justify-content-center mb-5">
          <b>Tambah Lowongan Baru</b>
        </h4>
        <form onSubmit={submitForm}>
          <div className={styles.inputWrapper}>
            <div className="row">
              <div className="col">
                <label className="form-label">Posisi</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukan posisi pekerjaan"
                  name="name"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Deskripsi Pekerjaan</label>
                <textarea
                  type="text"
                  className={cn(styles.textareaHeight, "form-control")}
                  placeholder="Tulis deskripsi pekerjaan"
                  name="description"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Kualifikasi</label>
                <select
                  name="qualification_id"
                  className={cn(styles.selectWidth, "form-select")}
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Pilih kualifikasi
                  </option>
                  {filteredQualifications.map((item, index) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Gaji</label>
                <div className={styles.salary}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gaji minimal"
                    name="salary_min"
                    onChange={handleChange}
                  />
                  <div className="mx-3">-</div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gaji maksimal"
                    name="salary_max"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Lama Pengalaman Kerja</label>
                <select
                  name="time_experiences"
                  className={cn(styles.selectWidth, "form-select")}
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Pilih tahun
                  </option>
                  {years.map((item, index) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Level Pekerjaan</label>
                <div className={styles.optionRow} onChange={handleChange}>
                  {level.map((item, index) => (
                    <div className="form-check">
                      <input
                        id={`level-${item.id}`}
                        className="form-check-input"
                        type="radio"
                        name="career_level_id"
                        value={item.id}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`level-${item.id}`}
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Tipe Kerja</label>
                <div className={styles.optionRow} onChange={handleChange}>
                  {jobType.map((item, index) => (
                    <div className="form-check">
                      <input
                        key={index}
                        id={`type-${item.id}`}
                        className="form-check-input"
                        type="radio"
                        name="job_type"
                        value={item.id}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`type-${item.id}`}
                      >
                        {item.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex flex-column">
                <label className="form-label">
                  Tanggal Pembukaan Pendaftaran
                </label>
                <input
                  type="date"
                  name="start_date"
                  className={styles.calendar}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col d-flex flex-column">
                <label className="form-label">
                  Tanggal Penutupan Pendaftaran
                </label>
                <input
                  type="date"
                  name="end_date"
                  className={styles.calendar}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Skill</label>
                <select
                  onChange={selectSkill}
                  className={cn(styles.selectWidth, "form-select")}
                >
                  <option selected disabled>
                    Pilih skill
                  </option>
                  {skill.map((item, index) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
              <div className={styles.selectedList}>
                {skillList.map((item, index) => {
                  console.log(item);
                  return (
                    <CustomChip
                      key={item}
                      label={item?.name}
                      onDelete={() => deleteSkill(index)}
                      bgcolor="#FF9D3E"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.actionBtn}>
            <button className={cn(styles.cancelBtn, "btn btn-secondary blue")}>
              Batal
            </button>
            <button
              type="submit"
              className={cn(styles.uploadBtn, "btn btn-primary blue")}
            >
              Unggah Pekerjaan
            </button>
          </div>
        </form>
      </CustomCard>
      <CustomAlert
        open={alert}
        severity={"success"}
        text={"Berhasil Membuat Pekerjaan"}
        duration={1500}
        onClose={() => setAlert}
      />
      <CustomAlert
        open={error}
        severity={"error"}
        text={errorMessage}
        duration={1500}
        onClose={() => setError(false)}
      />
    </>
  );
}

JobVacancyForm.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
