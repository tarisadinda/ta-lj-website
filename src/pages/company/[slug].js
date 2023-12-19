import styles from "@/styles/pages/company/AddJobVacancy.module.scss";
import cn from "classnames";
import CustomCard from "@/components/common/card";
import LayoutMain from "@/components/company/layouts/main";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { axiosInstance } from "src/utils/axios";
import {
  API_CAREER_LEVEL,
  API_JOB_TYPE,
  API_QUALIFICATION,
  API_SKILL,
  API_TIME_EXP,
} from "src/utils/api";
import { formatJsDate } from "src/utils/date-formatter";
import { CustomChip } from "@/components/common/chip";
import CustomAlert from "@/components/common/alert";

export default function JobVacancyEditForm() {
  const router = useRouter();
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { slug } = router.query;
  const [id, setId] = useState();
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

  const [qualifications, setQualifications] = useState([]);
  const filteredQualifications = qualifications.filter(
    (item) => item.status != false
  );
  const [years, setYears] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [skill, setSkill] = useState([]);
  const [level, setLevel] = useState([]);
  const [skillList, setSkillList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState();

  const getQualifications = () => {
    axiosInstance
      .get(API_QUALIFICATION)
      .then((res) => {
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
        setLevel(res.data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getQualifications();
    getYear();
    getJobType();
    getSkill();
    getLevel();
  }, []);

  const getDetailJob = () => {
    axiosInstance
      .get(`/jobs/slug/${slug}`)
      .then((res) => {
        const data = res?.data?.data;
        setId(data?.id);
        setJob({
          name: data?.name,
          description: data?.description,
          salary_min: data?.salary_min,
          salary_max: data?.salary_max,
          start_date: data?.start_date,
          end_date: data?.end_date,
          career_level_id: data?.career_level_id,
          time_experiences_id: data?.time_experiences_id,
          qualification_id: data?.qualification_id,
          job_type_work_id: data?.job_type_work_id,
          skill: data?.Skill?.map(
            (value) => value?.combination_job_skills?.skill_id
          ),
        });
        setSelectedOptions(data.Skill.map((item) => ({
          value: item?.combination_candidate_skills?.skill_id,
          label: item?.name
        })))
      })
      .catch((err) => console.log(err));
  };

  const selectSkill = (e) => {
    const selectedSkillId = e.target.value;
    const selectedSkill = skill.find((item) => item.id === parseInt(selectedSkillId));
  
    if (selectedSkill && !job.skill.includes(selectedSkillId)) {
      const updatedJobSkills = [...job.skill, selectedSkillId];
      const updatedSelectedOptions = [...selectedOptions, { value: selectedSkillId, label: selectedSkill.name }];
  
      setJob({ ...job, skill: updatedJobSkills });
      setSelectedOptions(updatedSelectedOptions);
    }
  };

  const deleteSkill = (index) => {
    const updatedSkills = job.skill.filter((_, i) => i !== index);
    const updatedSelectedOptions = selectedOptions.filter((_, i) => i !== index);
  
    setJob({ ...job, skill: updatedSkills });
    setSelectedOptions(updatedSelectedOptions);
  };

  const mergedSkills = [...new Set([...skillList, ...job.skill])];

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    getDetailJob();
  }, [slug]);

  const editJob = () => {
    const formData = new FormData();
    formData.append("name", job.name);
    formData.append("description", job.description);
    formData.append("salary_min", job.salary_min);
    formData.append("salary_max", job.salary_max);
    formData.append("start_date", formatJsDate(job.start_date, "MM-DD-YYYY"));
    formData.append("end_date", formatJsDate(job.end_date, "MM-DD-YYYY"));
    formData.append("time_experiences_id", job.time_experiences_id);
    formData.append("job_type_work_id", job.job_type_work_id);
    formData.append("career_level_id", job.career_level_id);
    formData.append("qualification_id", job.qualification_id);
    mergedSkills.forEach((skillId) => {
      formData.append("skill", skillId);
    });

    axiosInstance({ method: "put", url: `/jobs/${id}`, data: formData })
      .then((res) => {
        router.push("/company/vacancy-list");
        setAlert(true);
        setError(false);
      })
      .catch((err) => {
        setAlert(false);
        setError(true);
        setErrorMessage(err?.response?.data?.message);
      });
  };

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
              name="name"
              value={job?.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label className="form-label">Deskripsi Pekerjaan</label>
            <textarea
              type="text"
              name="description"
              className={cn(styles.textareaHeight, "form-control")}
              placeholder="Tulis deskripsi pekerjaan"
              value={job?.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label className="form-label">Kualifikasi</label>
            <select
              name="qualification_id"
              className={cn(styles.selectWidth, "form-select")}
              value={job?.qualification_id}
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
        <div className="row mt-3 ">
          <div className="col">
            <label className="form-label">Gaji</label>
            <div className={styles.salary}>
              <input
                type="text"
                className="form-control"
                placeholder="Gaji minimal"
                name="salary_min"
                onChange={handleChange}
                value={job?.salary_min}
              />
              <div className="mx-3">-</div>
              <input
                type="text"
                className="form-control"
                placeholder="Gaji maksimal"
                name="salary_max"
                onChange={handleChange}
                value={job?.salary_max}
              />
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <label className="form-label">Lama Pengalaman Kerja</label>
            <select
              name="time_experiences"
              className={cn(styles.selectWidth, "form-select")}
              onChange={handleChange}
              value={job?.time_experiences_id}
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
        <div className="row mt-3">
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
                    checked={job?.career_level_id}
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
        <div className="row mt-3">
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
                    checked={job?.job_type_work_id}
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
        <div className="row mt-3">
          <div className="col d-flex flex-column">
            <label className="form-label">Tanggal Pembukaan Pendaftaran</label>
            <input
              type="date"
              name="start_date"
              className={styles.calendar}
              onChange={handleChange}
              value={formatJsDate(job?.start_date, "YYYY-MM-DD")}
            />
          </div>
        </div>
        <div className="row">
          <div className="col d-flex flex-column">
            <label className="form-label">Tanggal Penutupan Pendaftaran</label>
            <input
              type="date"
              name="end_date"
              className={styles.calendar}
              onChange={handleChange}
              value={formatJsDate(job?.end_date, "YYYY-MM-DD")}
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
            {selectedOptions?.map((item, index) => (
              <CustomChip
                key={item}
                label={item?.label}
                onDelete={() => deleteSkill(index)}
                bgcolor="#FF9D3E"
              />
            ))}
          </div>
        </div>
        <div className={styles.actionBtn}>
          <button 
          onClick={() => router.push("/company/vacancy-list")}
          className={cn(styles.cancelBtn, "btn btn-secondary blue")}>
            Batal
          </button>
          <button
            onClick={editJob}
            className={cn(styles.uploadBtn, "btn btn-primary blue")}
          >
            Edit Pekerjaan
          </button>
        </div>
      </CustomCard>
      <CustomAlert
        open={alert}
        severity={"success"}
        text={"Berhasil Mengedit Pekerjaan"}
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

JobVacancyEditForm.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
