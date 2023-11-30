import { useRef, useState } from "react";
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
import {
  alertMessage,
  openAlert,
  severity,
  setMessage,
  setOpenAlert,
  setSeverity,
} from "src/redux/common/alertSlice";
import CustomAlert from "@/components/common/alert";

export default function EditProfil() {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);

  const isOpenAlert = useSelector(openAlert);
  const alertMsg = useSelector(alertMessage);
  const alertSeverity = useSelector(severity);

  const [profileImage, setProfileImage] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [fileCv, setFileCv] = useState(user?.candidate_detail?.cv);
  const [newDataUser, setNewDataUser] = useState({
    address: user?.candidate_detail?.address,
    phone_number: user?.candidate_detail?.phone_number,
    description: user?.candidate_detail?.description,
    image_profile: "",
    cv_file: fileCv,
  });

  const fileInputRef = useRef(null);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/candidateDetail`, newDataUser)
      .then((res) => {
        if (res.status == 201) {
          dispatch(updateUser(newDataUser));

          dispatch(setOpenAlert(true));
          dispatch(setMessage("Profile berhasil diperbarui!"));
          dispatch(setSeverity("success"));
          setTimeout(() => {
            router.push("/candidate/profile");
          }, 1000);
        }
      })
      .catch((err) => {
        dispatch(setOpenAlert(true));
        dispatch(setMessage(err?.response?.data?.message));
        dispatch(setSeverity("error"));
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(fileInputRef.current);
    console.log(e);
    // Lakukan validasi jika file tidak ada atau bukan file .pdf
    if (!file || !file.name.match(/\.(pdf)$/)) {
      alert("Silakan pilih file .pdf");
      return;
    }
    setFileCv(file);
    setNewDataUser({ ...newDataUser, cv_file: file });
  };

  const removeCv = () => {
    setFileCv(null);
    // ... Tambahkan logika untuk menghapus file CV dari server jika diperlukan
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatar(URL.createObjectURL(file));
      setProfileImage(file);
      setNewDataUser({ ...newDataUser, image_profile: file });
    }
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    router.back()
  };

  return (
    <>
      <h3 className={styles.profileText}>
        <b>Edit Profil</b>
      </h3>
      <div className={styles.avaRow}>
        <Avatar
          src={selectedAvatar ? selectedAvatar : user?.img}
          sx={{ width: 150, height: 150 }}
        />
        <div className={styles.groupBtn}>
          <label htmlFor="fileInput" className="btn btn-primary blue">
            Ubah Foto Profil
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </label>
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
            {fileCv ? (
              <Card variant="outline">
                <div className={styles.cardGroup}>
                  <p>{fileCv?.name ? fileCv?.name : fileCv}</p>
                  <IconButton size="small" onClick={() => removeCv()}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              </Card>
            ) : (
              <div style={{ display: "flex" }}>
                <label htmlFor="fileInputCv" style={{ cursor: "pointer" }}>
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
                  id="fileInputCv"
                  name="fileInputCv"
                  style={{ display: "none" }}
                  accept="application/pdf"
                  onChange={handleFileUpload}
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
      <CustomAlert
        open={isOpenAlert}
        severity={alertSeverity}
        text={alertMsg}
        duration={2000}
        onClose={() => dispatch(setOpenAlert(false))}
      />
    </>
  );
}

EditProfil.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
