import cn from "classnames";
import styles from "@/styles/pages/candidate/Profile.module.scss";
import { Avatar, Card, IconButton } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/router";
import Link from "next/link";
import ProfileLayout from "@/components/candidate/layouts/profile-layout";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/common/userSlice";
import AddSkill from "@/components/candidate/add-skill";
import { useState } from "react";
import { CustomChip } from "@/components/common/chip";
export default function Profile() {
  const router = useRouter();
  const [modalAddSkill, setModalAddSkill] = useState(false);

  const user = useSelector(selectUser);

  const editInfo = () => {
    router.push("/candidate/edit-profile");
  };

  const openModalAddSkill = () => {
    setModalAddSkill(true);
  };

  return (
    <>
      <div style={{marginBottom: 40}} >
        <div className={styles.profileName}>
          <div className={styles.avaWrap}>
            <Avatar src={user?.img} sx={{ width: 100, height: 100 }} />
            <IconButton
              variant="contained"
              size="small"
              className={styles.editBtn}
            >
              <BorderColorIcon
                className={styles.editIcon}
                fontSize="inherit"
                color="black"
              />
            </IconButton>
          </div>
          <div>
            <h4>
              <b>{user?.full_name}</b>
            </h4>
            <p className={cn(styles.levelGroup, "mb-0")}>{user?.email}</p>
          </div>
        </div>
      </div>
      <Card variant="outlined" className={styles.infoCard}>
        <div className={styles.editGroup}>
          <div>
            <div>
              <b>Email</b>
              <p>{user?.email}</p>
            </div>
            {user?.candidate_detail?.address && (
              <div className={styles.skillSection}>
                <b>Alamat</b>
                <p>{user?.candidate_detail?.address}</p>
              </div>
            )}
          </div>
          <div>
            <div>
              <b>Nomor Handphone</b>
              <p>{user?.candidate_detail?.phone_number}</p>
            </div>
            {user?.candidate_detail?.address && (
              <div className={styles.skillSection}>
                <b>Kota/Kabupaten</b>
                <p>{user?.candidate_detail?.address}</p>
              </div>
            )}
          </div>
          <div className={styles.group}>
            <button className={cn(styles.skillBtn, "btn")} onClick={editInfo}>
              <BorderColorIcon fontSize="small" className={styles.editIcon} />
              <span>Edit Informasi</span>
            </button>
          </div>
        </div>
        {user?.email &&
          user?.candidate_detail?.address === null &&
          user?.candidate_detail?.phone_number && (
            <div className={cn(styles.editGroup, "mt-5")}>
              <div>
                <b className={styles.emptyTextHeader}>Ayo!Lengkapi Profilmu</b>
                <p>
                  Segera lengkapi profilmu agar semakin banyak <br /> rekruter
                  yang tertarik!
                </p>
              </div>
              <div className={styles.group}>
                <button
                  className={cn(styles.skillBtn, "btn-secondary blue")}
                  onClick={editInfo}
                >
                  <span>Lengkapi Sekarang!</span>
                </button>
              </div>
            </div>
          )}

        {user?.candidate_detail?.skill?.length > 0 && (
          <div className={styles.skillSection}>
            <div className={styles.editGroup}>
              <b>Keahlian</b>
              <div className={styles.group}>
                <button onClick={openModalAddSkill} className={cn(styles.skillBtn, "btn")}>
                  <BorderColorIcon
                    fontSize="small"
                    className={styles.editIcon}
                  />
                  <span>Edit Keahlian</span>
                </button>
              </div>
            </div>
            <div className={styles.skillList}>
              {user?.candidate_detail?.skill?.map((value, index) => (
                <CustomChip
                  key={index}
                  sx={{ bgcolor: "#FF9D3E" }}
                  label={value.name}
                />
              ))}
            </div>
          </div>
        )}
      </Card>

      {user?.candidate_detail?.skill?.length == 0 && (
        <Card variant="outlined" className={cn(styles.infoCard, "mt-4")}>
          <div className={styles.editGroup}>
            <div>
              <p>Unggah Keahlianmu untuk Peluang Kerja yang Lebih Besar!</p>
            </div>
            <div className={styles.group}>
              <button
                onClick={openModalAddSkill}
                className={cn(styles.skillBtn, "btn-secondary blue")}
              >
                <span>Tambahkan Sekarang</span>
              </button>
            </div>
          </div>
        </Card>
      )}

      <AddSkill open={modalAddSkill} onClose={() => setModalAddSkill(false)} />
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return <ProfileLayout>{page}</ProfileLayout>;
};
