import React, { useState } from "react";
import styles from "@/styles/components/company/modals/EditApplicationStatus.module.scss";
import CustomAlert from "@/components/common/alert";
import FrameModal from "@/components/common/frame-modal";
import { axiosInstance } from "src/utils/axios";

const ModalDeleteJob = ({ open, handleClose, id, getAllJobs }) => {
  const [alert, setAlert] = useState(false);
  const [error, setError] = useState(false);

  const deleteJob = () => {
    axiosInstance
      .delete(`/jobs/${id}`, {
        data: {
            status: false,
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
      .then((res) => {
        if (res) {
          setAlert(true);
          setError(false);
          handleClose();
          getAllJobs()
        } else {
          handleClose();
        }
      })
      .catch((err) => {
        setError(true);
        handleClose();
      });
  };

  return (
    <>
      <FrameModal
        open={open}
        handleClose={handleClose}
        title="Edit Status Lamaran"
      >
        <div>
          <p className="mb-1">
            <b>Status Seleksi</b>
          </p>
          <div className="mt-4 d-flex justify-content-end">
            <div className={styles.modalBtn}>
              <button onClick={handleClose} className="btn btn-ghost blue">
                Batal
              </button>
              <button onClick={deleteJob} className="btn btn-secondary blue">
                Delete
              </button>
            </div>
          </div>
        </div>
      </FrameModal>
      <CustomAlert
        open={alert}
        onClose={() => setAlert(false)}
        severity={"success"}
        duration={1500}
        text="Berhasil Menghapus Pekerjaan"
      />
      <CustomAlert
        open={error}
        onClose={() => setError(false)}
        severity={"error"}
        duration={1500}
        text="Gagal Menghapus Pekerjaan"
      />
    </>
  );
};

export default ModalDeleteJob;
