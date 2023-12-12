import FrameModal from "@/components/common/frame-modal";
import styles from "@/styles/components/candidate/apply-job/SubmitApplication.module.scss";
import DescriptionIcon from "@mui/icons-material/Description";
import cn from "classnames";
import { useRef } from "react";

export default function SubmitApplication({
  open,
  onClose,
  data,
  setDescription,
  description,
}) {
  const fileRef = useRef();

  const changeFile = () => {
    fileRef.current.click();
  };

  const handleChange = (e) => {
    console.log(e.target.files[0]);
  };

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <FrameModal open={open} handleClose={onClose} title="Pengajuan Lamaran">
        <form onSubmit={submitForm} className={styles.formGroup}>
          <div>
            <label>Nama Lengkap</label>
            <input disabled className="form-control" value={data?.full_name} />
          </div>
          <div>
            <label>Email</label>
            <input disabled className="form-control" value={data?.email} />
          </div>
          <div>
            <label>Nomor Handphone</label>
            <input
              disabled
              className="form-control"
              value={data?.candidate_detail?.phone_number}
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
                onChange={handleChange}
              />
              <div>
                <p className={styles.fileName}>{data?.candidate_detail?.cv?.split('/').pop()}</p>
                <p className={styles.fileSize}>3MB</p>
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
              value={description}
              className={cn(styles.letter, "form-control")}
              placeholder="Tulis surat penawaran untuk kandidat"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.btnSection}>
            <button onClick={onClose} className="btn btn-ghost blue">
              Batal
            </button>
            <button className="btn btn-primary blue">Simpan</button>
          </div>
        </form>
      </FrameModal>
    </>
  );
}
