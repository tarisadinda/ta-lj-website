import { useEffect, useRef, useState } from "react";
import LayoutMain from "@/components/candidate/layouts/main";
import cn from "classnames";
import styles from "@/styles/pages/candidate/EditProfile.module.scss";
import { Avatar, Card, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { selectUser, setUser, updateUser } from "src/redux/common/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "src/utils/axios";
import { CloudUpload } from "@mui/icons-material";

import CustomAlert from "@/components/common/alert";

export default function EditProfil() {
  const dispatch = useDispatch();
  const router = useRouter();

  const getProfile = () => {
    axiosInstance
      .get(`/candidateDetail`)
      .then((res) => {
        const data = res?.data?.data;
        setUserProfile(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile();
  }, []);

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [userProfile, setUserProfile] = useState();
  const [alert, setAlert] = useState({
    success: false,
    error: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [newDataUser, setNewDataUser] = useState({
    full_name: "",
    address: "",
    phone_number: "",
    description: "",
    image_profile: "",
    cv_file: "",
  });

  useEffect(() => {
    setNewDataUser({
      full_name: userProfile?.full_name,
      address: userProfile?.candidate_detail?.address,
      phone_number: userProfile?.candidate_detail?.phone_number,
      description: userProfile?.candidate_detail?.description,
      image_profile: userProfile?.img,
      cv_file: userProfile?.candidate_detail?.cv,
    });
  }, [userProfile]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/candidateDetail`, newDataUser)
      .then((res) => {
        if (res.status == 201) {
          dispatch(updateUser(newDataUser));

          setAlert({ ...alert, success: true });
          setTimeout(() => {
            router.push("/candidate/profile");
          }, 1000);
        }
      })
      .catch((err) => {
        setAlert({ ...alert, error: true });
        setErrorMessage(err?.response?.data?.message);
      });
  };

  const handleCVFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewDataUser({ ...newDataUser, cv_file: file });
    }
  };

  const removeCv = () => {
    setNewDataUser({ ...newDataUser, cv_file: null });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedAvatar(URL.createObjectURL(file));
      setNewDataUser({ ...newDataUser, image_profile: file });
    }
  };

  const cancelBtn = (e) => {
    e.preventDefault();
    router.back();
  };

  console.log(newDataUser);

  return (
    <>
      <h3 className={styles.profileText}>
        <b>Edit Profil</b>
      </h3>
      <div className={styles.avaRow}>
        <Avatar
          src={selectedAvatar ? selectedAvatar : userProfile?.img}
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
              value={newDataUser?.full_name}
              onChange={(e) =>
                setNewDataUser({ ...newDataUser, full_name: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan username"
              value={userProfile?.username}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan email"
              value={userProfile?.email}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Nomor Handphone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan nomor handphone"
              value={userProfile?.candidate_detail?.phone_number}
              onChange={(e) =>
                setNewDataUser({ ...newDataUser, phone_number: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Alamat</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukan alamat"
              value={userProfile?.candidate_detail?.address}
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
              value={userProfile?.candidate_detail?.description}
              onChange={(e) =>
                setNewDataUser({ ...newDataUser, description: e.target.value })
              }
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Curriculum Vitae/Resume</label>
            {newDataUser?.cv_file == null || (newDataUser?.cv_file == "http://localhost:3000/images/null")?
              <div style={{ display: "flex" }}>
                <label htmlFor="fileInputCv" style={{ cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <CloudUpload sx={{ width: 78, height: 78 }} />
                    <div style={{ marginLeft: 20 }}>
                      <p className="mb-1">Unggah File</p>
                      <p className="form-text mb-0">Ukuran file maksimal 5MB berformat .pdf</p>
                    </div>
                  </div>
                </label>
                <input
                  type="file"
                  id="fileInputCv"
                  name="fileInputCv"
                  style={{ display: "none" }}
                  accept="application/pdf"
                  onChange={handleCVFileChange}
                />
              </div> : (newDataUser?.cv_file?.name) ? 
              <Card variant="outline">
                <div className={styles.cardGroup}>
                  <p>{newDataUser?.cv_file?.name}</p>
                  <IconButton size="small" onClick={() => removeCv()}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              </Card> : 
              <Card variant="outline">
                <div className={styles.cardGroup}>
                  <p>{newDataUser?.cv_file?.split('/').pop()}</p>
                  <IconButton size="small" onClick={() => removeCv()}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </div>
              </Card>
            }
            {/* {!(newDataUser?.cv_file?.name?.match("/null")) ? (
              <Card variant="outline">
                <div className={styles.cardGroup}>
                  <p>{newDataUser?.cv_file?.name}</p>
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
                      <p className="mb-1">Unggah File</p>
                      <p className="form-text mb-0">Ukuran file maksimal 5MB berformat .pdf</p>
                    </div>
                  </div>
                </label>
                <input
                  type="file"
                  id="fileInputCv"
                  name="fileInputCv"
                  style={{ display: "none" }}
                  accept="application/pdf"
                  onChange={handleCVFileChange}
                />
              </div>
            )} */}
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
        open={alert.success}
        severity={"success"}
        text={"Berhasil Edit Profile"}
        duration={1500}
        onClose={() => setAlert({ ...alert, success: false })}
      />
      <CustomAlert
        open={alert.error}
        severity={"error"}
        text={errorMessage}
        duration={1500}
        onClose={() => setAlert({ ...alert, error: false })}
      />
    </>
  );
}

EditProfil.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
