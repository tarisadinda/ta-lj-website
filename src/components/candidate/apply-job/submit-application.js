import CustomAlert from "@/components/common/alert";
import FrameModal from "@/components/common/frame-modal";
import styles from "@/styles/components/candidate/apply-job/SubmitApplication.module.scss";
import DescriptionIcon from "@mui/icons-material/Description";
import cn from "classnames";
import { useRef, useState } from "react";
import { axiosInstance } from "src/utils/axios";

export default function SubmitApplication({ open, onClose, data }) {
  const fileRef = useRef();

  const [user, setUser] = useState({
    full_name: data?.full_name,
    address: data?.candidate_detail?.address,
    phone_number: data?.candidate_detail?.phone_number,
    description: data?.candidate_detail?.description,
    cv_file: data?.candidate_detail?.cv,
  });
  const [email, setEmail] = useState(data?.email)
  const [alert, setAlert] = useState({
    success: false,
    error: false,
  });
  const [errMsg, setErrMsg] = useState("");

  console.log(data)

  const changeFile = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setUser({ ...user, cv_file: selectedFile });
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  const editProfile = () => {
    axiosInstance
      .post(`/candidateDetail`, user)
      .then((res) => {
        setAlert({ ...alert, success: true });
      })
      .catch((err) => {
        setAlert({ ...alert, error: true });
        setErrMsg(err?.response?.data?.message);
      });
  };

  return (
    <>
      <FrameModal open={open} handleClose={onClose} title="Pengajuan Lamaran">
        <form onSubmit={submitForm} className={styles.formGroup}>
          <div>
            <label>Nama Lengkap</label>
            <input
              onChange={(e) => setUser({ ...user, full_name: e.target.value })}
              className="form-control"
              value={user?.full_name}
            />
          </div>
          <div>
            <label>Email</label>
            <input disabled className="form-control" value={email} />
          </div>
          <div>
            <label>Nomor Handphone</label>
            <input
              onChange={(e) =>
                setUser({ ...user, phone_number: e.target.value })
              }
              className="form-control"
              value={user?.phone_number}
            />
          </div>
          <div>
            <label>Curriculum Vitae/Resume</label>
            <div className={styles.fileInfo}>
              <span>
                <DescriptionIcon sx={{ fontSize: 40 }} />
              </span>
              <input
                ref={fileRef}
                style={{ display: "none" }}
                type="file"
                accept="application/pdf,application/vnd.ms-excel"
                onChange={handleChange}
              />
              <div>
                <p className={styles.fileName}>
                  {user?.cv_file
                    ? user.cv_file.name || user.cv_file.split("/").pop()
                    : ""}
                </p>
              </div>
              <button
                onClick={changeFile}
                className={cn(styles.changeBtn, "btn btn-primary blue")}
              >
                Ubah
              </button>
            </div>
          </div>
          <div>
            <label>Surat Lamaran (opsional)</label>
            <textarea
              value={user?.description}
              className={cn(styles.letter, "form-control")}
              placeholder="Tulis surat penawaran untuk kandidat"
              onChange={(e) =>
                setUser({ ...user, description: e.target.value })
              }
            />
          </div>
          <div className={styles.btnSection}>
            <button onClick={onClose} className="btn btn-ghost blue">
              Batal
            </button>
            <button onClick={editProfile} className="btn btn-primary blue">
              Simpan
            </button>
          </div>
        </form>
      </FrameModal>
      <CustomAlert
        open={alert.success}
        severity={"success"}
        text={"berhasil update profile"}
        duration={2000}
        onClose={() => setAlert({ ...alert, success: false })}
      />
      <CustomAlert
        open={alert.error}
        severity={"error"}
        text={errMsg}
        duration={2000}
        onClose={() => setAlert({ ...alert, error: false })}
      />
    </>
  );
}
