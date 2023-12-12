import React, { useEffect, useState } from "react";
import FrameModal from "../common/frame-modal";
import CustomDropdown from "../common/dropdown";
import { axiosInstance } from "src/utils/axios";
import { CustomChip } from "../common/chip";
import { useDispatch, useSelector } from "react-redux";
import {
  alertMessage,
  openAlert,
  severity,
  setMessage,
  setOpenAlert,
  setSeverity,
} from "src/redux/common/alertSlice";
import CustomAlert from "../common/alert";

const AddSkill = ({ open, onClose }) => {
  const [pagination, setPagination] = useState({
    size: 10,
    page: 0,
    search: "",
  });
  const dispatch = useDispatch();
  const [skillOptions, setSkillOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const isOpenAlert = useSelector(openAlert);
  const alertMsg = useSelector(alertMessage);
  const alertSeverity = useSelector(severity);

  const getAllSkills = () => {
    axiosInstance
      .get(
        `/skills?size=${pagination.size}&page=${pagination.page}&search=${pagination.search}`
      )
      .then((res) => {
        if (res) {
          if (res && res.data && res.data.data) {
            const data = res?.data?.data;
            const skillsData = data?.data.map((value) => ({
              label: value.name,
              value: value.id,
            }));
            setSkillOptions(skillsData); // Menyimpan data skill ke dalam state skill
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllSkills();
  }, []);

  const handleSelectedSkillsChange = (event) => {
    const selectedValues = event.target.value;

    const newSelectedOptions = selectedValues
      .map((value) => {
        const selectedOption = skillOptions.find(
          (option) => option.value === value
        );
        return selectedOption
          ? { value: selectedOption.value, label: selectedOption.label }
          : null;
      })
      .filter(Boolean);

    setSelectedOptions(newSelectedOptions);

    setSelectedSkills(selectedValues);
  };

  const handleRemoveSkill = (indexToRemove) => {
    const updatedSkills = [...selectedSkills]; // Duplikat array agar tidak mengubah array asli
    updatedSkills.splice(indexToRemove, 1); // Menghapus elemen pada indeks yang diberikan

    const updatedOptions = [...selectedOptions]; // Duplikat array agar tidak mengubah array asli
    const filteredOptions = updatedOptions.filter(
      (item) => item.value !== indexToRemove + 1
    );

    setSelectedSkills(updatedSkills);
    setSelectedOptions(filteredOptions);
  };

  const handleSaveSkill = () => {
    const formData = new FormData();

    selectedSkills.forEach((skillId) => {
      formData.append("skill", JSON.stringify(skillId));
    });

    axiosInstance({
      method: "post",
      url: '/candidateDetail/addSkill',
      data: formData
    })
    .then((res) => {
      if (res) {
        dispatch(setOpenAlert(true));
        dispatch(setMessage("Keahlian berhasil ditambahkan!"));
        dispatch(setSeverity("success"));
        setTimeout(onClose, 2000);
      }
    })
    .catch((err) => {
      dispatch(setOpenAlert(true));
      dispatch(setMessage(err?.response?.data?.message));
      dispatch(setSeverity("error"));
    });
  };

  return (
    <FrameModal open={open} handleClose={onClose} title="Tambah Keahlian">
      <CustomDropdown
        data={skillOptions}
        placeholder="tambahkan keahlian"
        onChange={handleSelectedSkillsChange}
        value={selectedSkills}
        isMulti={true}
      />

      <div>
        {selectedSkills && selectedSkills.length > 0 && (
          <div
            style={{
              marginTop: 20,
              marginBottom: 20,
              display: "flex",
              gap: "15px",
            }}
          >
            {selectedOptions.map((selectedValue, index) => {
              return (
                <CustomChip
                  key={index}
                  sx={{ bgcolor: "#FF9D3E" }}
                  label={selectedValue.label}
                  onDelete={() => handleRemoveSkill(index)}
                />
              );
            })}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={onClose}
          style={{ maxWidth: 120, marginRight: 20 }}
          className="btn  "
        >
          <span>Batal</span>
        </button>
        <button
          style={{ maxWidth: 120 }}
          onClick={handleSaveSkill}
          className="btn btn-primary "
        >
          <span>Simpan</span>
        </button>
      </div>
      <CustomAlert
        open={isOpenAlert}
        severity={alertSeverity}
        text={alertMsg}
        duration={2000}
        onClose={() => dispatch(setOpenAlert(false))}
      />
    </FrameModal>
  );
};

export default AddSkill;
