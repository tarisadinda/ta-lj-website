import { useState } from "react";
import LayoutMain from "@/components/candidate/layouts/main";
import cn from "classnames";
import styles from "@/styles/pages/candidate/EditProfile.module.scss";
import { Avatar, Card, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { selectUser, updateUser } from "src/redux/common/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "src/utils/axios";
import { CloudUpload } from "@mui/icons-material";

export default function EditProfil() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const router = useRouter();
  const [newDataUser, setNewDataUser] = useState({
    address: user?.candidate_detail?.address,
    phone_number: user?.candidate_detail?.phone_number,
    description: user?.candidate_detail?.description,
    image_profile: "",
  });
  const [profileImage, setProfileImage] = useState("");

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/candidateDetail`, newDataUser)
      .then((res) => {
        if (res) {
          dispatch(updateUser(newDataUser));
          // Setelah dispatch, Anda dapat melakukan navigasi atau aksi lain yang diperlukan
          // router.push("/candidate/profile");
        }
      })
      .catch((err) => console.log(err));
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <>
      <h3 className={styles.profileText}>
        <b>Edit Profil</b>
      </h3>
      <div className={styles.avaRow}>
        <Avatar src={user?.img} sx={{ width: 150, height: 150 }} />
        <div className={styles.groupBtn}>
          <button className="btn btn-primary blue">Ubah Foto Profil</button>
          <button className="btn btn-secondary blue">Hapus Foto Profil</button>
        </div>
      </div>
      <div className={styles.formSection}>
        <form>
          <div className={styles.inputGroup}>
            <label>Nama Lengkap</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan nama lengkap"
              value={user?.full_name}
              onChange={() => {}}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan username"
              value={user?.username}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan email"
              value={user?.email}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Nomor Handphone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan nomor handphone"
              value={newDataUser.phone_number}
              onChange={(e) =>
                setNewDataUser({ ...newDataUser, phone_number: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Alamat (opsional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan alamat"
              value={newDataUser.address}
              onChange={(e) =>
                setNewDataUser({ ...newDataUser, address: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Deskripsi diri (opsional)</label>
            <textarea
              type="text"
              className="form-control"
              placeholder="Masukan deskripsi diri anda"
              value={newDataUser.description}
              onChange={(e) =>
                setNewDataUser({ ...newDataUser, description: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Curriculum Vitae/Resume</label>
            {user?.candidate_detail?.cv ? (
              <Card
                variant="outline"
              >
                <div className={styles.cardGroup}>
                  <p>{user?.candidate_detail?.cv}</p>
                  <IconButton size="small">
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              </Card>
            ) : (
              <div style={{ display: "flex" }}>
                <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CloudUpload sx={{ width: 78, height: 78 }} />
                    <div style={{ marginLeft: 20 }}>
                      <p>Unggah File</p>
                      <p>Ukuran file maksimal 5MB berformat .pdf</p>
                    </div>
                  </div>
                </label>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept=".pdf"
                  onChange={() => {}}
                />
              </div>
            )}
          </div>
          <div className={styles.actionBtn}>
            <button
              onClick={cancelBtn}
              className={cn(styles.cancelBtn, "btn btn-secondary blue")}
            >
              Batal
            </button>
            <button
              onClick={handleUpdateProfile}
              className={cn(styles.updateBtn, "btn btn-primary blue")}
            >
              Perbarui Profil
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

EditProfil.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
