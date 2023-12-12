import styles from "@/styles/pages/company/AddJobVacancy.module.scss";
import cn from "classnames";
import CustomCard from "@/components/common/card";
import LayoutMain from "@/components/company/layouts/main";
import WorkIcon from "@mui/icons-material/Work";

export default function JobVacancyEditForm() {
  return (
    <>
      <div className={styles.colWrap}>
        <CustomCard sx={{ padding: "30px" }}>
          <h4 className="d-flex justify-content-center mb-5">
            <b>Edit Lowongan Kerja</b>
          </h4>
          <div className={styles.inputWrapper}>
            <div className="row">
              <div className="col">
                <label className="form-label">Posisi</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile Developer"
                />
              </div>
              <div className="col">
                <label className="form-label">Kategori</label>
                <select
                  defaultValue=""
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="">Open this select menu</option>
                  <option value="1">Kategori</option>
                  <option value="2">Kategori</option>
                  <option value="3">Kategori</option>
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Deskripsi Pekerjaan</label>
                <textarea
                  type="text"
                  className={cn(styles.textareaHeight, "form-control")}
                  placeholder="Tulis deskripsi pekerjaan"
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Kualifikasi</label>
                <textarea
                  type="text"
                  className={cn(styles.textareaHeight, "form-control")}
                  placeholder="Tulis kualifikasi pekerjaan yang dibutuhkan"
                />
              </div>
            </div>
            <div className="row">
              <div className="col">
                <label className="form-label">Gaji</label>
                <div className={styles.salary}>
                  <select className={cn(styles.selectWidth, "form-select")}>
                    <option selected disabled>
                      Pilih nominal
                    </option>
                    <option value="1">Rp 500.000</option>
                    <option value="2">Rp 1.000.000</option>
                    <option value="3">Rp 1.500.000</option>
                  </select>
                  <div className="mx-3">-</div>
                  <select className={cn(styles.selectWidth, "form-select")}>
                    <option selected disabled>
                      Pilih nominal
                    </option>
                    <option value="1">Rp 500.000</option>
                    <option value="2">Rp 1.000.000</option>
                    <option value="3">Rp 1.500.000</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
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
            <div className="row">
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
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios3"
                    >
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
                    <label
                      className="form-check-label"
                      htmlFor="exampleRadios4"
                    >
                      Part time
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
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
            <div className="row">
              <div className="col d-flex flex-column">
                <label className="form-label">
                  Tanggal Penutupan Pendaftaran (opsional)
                </label>
                <input type="date" className={styles.calendar} />
              </div>
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
      </div>
    </>
  );
}

JobVacancyEditForm.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
