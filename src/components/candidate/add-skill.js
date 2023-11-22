import React, { useEffect, useState } from "react";
import FrameModal from "../common/frame-modal";
import CustomDropdown from "../common/dropdown";
import { axiosInstance } from "src/utils/axios";
import { Clear } from "@mui/icons-material";
import { CustomChip } from "../common/chip";

const AddSkill = ({ open, onClose}) => {
  const [pagination, setPagination] = useState({
    size: 10,
    page: 0,
    search: "",
  });
  const [skillOptions, setSkillOptions] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

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
    const selectedValues = event.target.value
      
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

  // Menghapus skill yang dipilih dari daftar selectedSkills
  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = selectedSkills.filter(
      (skill) => skill.value !== skillToRemove.value
    );
    setSelectedSkills(updatedSkills);
  };

  const handleSaveSkill = () => {
    axiosInstance.post('/candidateDetail/addSkill', {skill: selectedSkills.toString()}).then((res) => console.log(res)).catch((err) => console.log(err))
  }

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
          <div style={{marginTop: 20, marginBottom: 20}} >
            {selectedOptions.map((selectedValue, index) => {
              return (
                <CustomChip key={index} sx={{bgcolor: '#FF9D3E'}} label={selectedValue.label} onDelete={() => handleRemoveSkill(selectedSkills)}/>
              );
            })}
          </div>
        )}
      </div>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}} >
        <button onClick={onClose} style={{maxWidth: 120, marginRight: 20}} className="btn  ">
          <span>Batal</span>
        </button>
        <button style={{maxWidth: 120}} onClick={handleSaveSkill} className="btn btn-primary ">
          <span>Simpan</span>
        </button>
      </div>
    </FrameModal>
  );
};

export default AddSkill;
