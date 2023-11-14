import styles from '@/styles/pages/company/AddJobVacancy.module.scss'
import CustomCard from "@/components/common/card"
import LayoutMain from "@/components/company/layouts/main"
import cn from 'classnames'
import React from 'react'
import { CustomChip } from '@/components/common/chip'
import { axiosInstance } from 'src/utils/axios'
import { API_JOBS } from 'src/utils/api'
import CustomAlert from '@/components/common/alert'
import { alertMessage, openAlert, setMessage, setOpenAlert, setSeverity, severity } from 'src/redux/common/alertSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function JobVacancyForm() {
    const dispatch = useDispatch()

    const isOpenAlert = useSelector(openAlert)
    const alertMsg = useSelector(alertMessage)
    const alertSeverity = useSelector(severity)

    const [jobForm, setJobForm] = React.useState({
        name: '',
        description: '',
        qualification: 0,
        salary_min: 0,
        salary_max: 0,
        time_experiences: 0,
        career_level: 0,
        job_type: 0,
        start_date: '',
        end_date: ''
    })
    const [skillList, setSkillList] = React.useState([])

    const selectSkill = (e) => {
        if(!(skillList.includes(e.target.value))) {
            setSkillList((prevData) => [
                ...prevData,
                e.target.value
            ])
        }
    }

    const deleteSkill = (id) => {
        skillList.splice(id, 1)
        setSkillList(skillList.filter((data) => { return data !== id }))
    }

    const handleChange = (e) => {
        setJobForm({
            ...jobForm,
            [e.target.name]: e.target.value
        })
    }

    const submitForm = (e) => {
        e.preventDefault()

        const formData = {
            name: jobForm.name,
            description: jobForm.description,
            salary_min: jobForm.salary_min,
            salary_max: jobForm.salary_max,
            start_date: jobForm.start_date,
            end_date: jobForm.end_date,
            time_experiences_id: jobForm.time_experiences,
            job_type_work_id: jobForm.job_type,
            skill: skillList
        }

        axiosInstance.post(API_JOBS, formData, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if(res.status == 201) {
                dispatch(setOpenAlert(true))
                dispatch(setMessage('Data berhasil ditambahkan'))
                dispatch(setSeverity('success'))

                setJobForm({
                    name: '',
                    description: '',
                    salary_min: '',
                    salary_max: '',
                    start_date: '',
                    end_date: '',
                    time_experiences_id: '',
                    job_type_work_id: '',

                })
                setSkillList([])
            }
        }).catch((err) => console.log(err))
    }

    return(<>
        <CustomCard sx={{ width: '100%', padding: '60px' }}>
            <h4 className='d-flex justify-content-center mb-5'><b>Tambah Lowongan Baru</b></h4>
            <form onSubmit={submitForm}>
                <div className={styles.inputWrapper}>
                    <div className='row'>
                        <div className='col'>
                            <label className="form-label">Posisi</label>
                            <input type="text" 
                                className="form-control" 
                                placeholder="Mobile Developer" 
                                name='name' 
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className="form-label">Deskripsi Pekerjaan</label>
                            <textarea type="text" 
                                className={cn(styles.textareaHeight, "form-control")} 
                                placeholder="Tulis deskripsi pekerjaan" 
                                name='description'
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className="form-label">Kualifikasi</label>
                            <select name='qualification' className={cn(styles.selectWidth, "form-select")} onChange={handleChange}>
                                <option selected disabled>Pilih kualifikasi</option>
                                <option value="1">SMK</option>
                                <option value="2">Diploma 3</option>
                                <option value="3">Diploma 4</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className="form-label">Gaji</label>
                            <div className={styles.salary}>
                                <select name='salary_min' className={cn(styles.selectWidth, "form-select")} onChange={handleChange}>
                                    <option selected disabled>Pilih gaji minimal</option>
                                    <option value="500.000">Rp 500.000</option>
                                    <option value="1.000.000">Rp 1.000.000</option>
                                    <option value="2.000.000">Rp 2.000.000</option>
                                </select>
                                <div className='mx-3'>-</div>
                                <select name='salary_max' className={cn(styles.selectWidth, "form-select")} onChange={handleChange}>
                                    <option selected disabled>Pilih gaji maksimal</option>
                                    <option value="1.500.000">Rp 1.500.000</option>
                                    <option value="2.500.000">Rp 2.500.000</option>
                                    <option value="3.500.000">Rp 3.500.000</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className="form-label">Lama Pengalaman Kerja</label>
                            <select name='time_experiences' className={cn(styles.selectWidth, "form-select")} onChange={handleChange}>
                                <option selected disabled>Pilih tahun</option>
                                <option value="1">Kurang dari setahun</option>
                                <option value="2">1 - 3 tahun</option>
                                <option value="3">4 - 6 tahun</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className="form-label">Level Pekerjaan</label>
                            <div className={styles.optionRow} onChange={handleChange}>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="career_level" value="1" />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Full time
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="career_level" value="2" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Part time
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="career_level" value="3" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Kontrak
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className="form-label">Tipe Kerja</label>
                            <div className={styles.optionRow} onChange={handleChange}>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="job_type" value="1" />
                                    <label className="form-check-label" htmlFor="method1">
                                        Work from office
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="job_type" value="2" />
                                    <label className="form-check-label" htmlFor="method2">
                                        Hybrid
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="job_type" value="3" />
                                    <label className="form-check-label" htmlFor="method1">
                                        Work from home
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex flex-column'>
                            <label className="form-label">Tanggal Pembukaan Pendaftaran</label>
                            <input type='date' name='start_date' className={styles.calendar} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col d-flex flex-column'>
                            <label className="form-label">Tanggal Penutupan Pendaftaran</label>
                            <input type='date' name='end_date' className={styles.calendar} onChange={handleChange} />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <label className="form-label">Skill</label>
                            <select onChange={selectSkill} className={cn(styles.selectWidth, "form-select")}>
                                <option selected disabled>Pilih skill</option>
                                <option value="1">PHP</option>
                                <option value="2">Javascript</option>
                                <option value="3">Laravel Framework</option>
                            </select>
                        </div>
                        <div className={styles.selectedList}>
                            {skillList.map((item, index) => (
                                <CustomChip
                                    key={item}
                                    label='tes'
                                    onDelete={() => deleteSkill(index)}
                                    bgcolor='#FF9D3E'
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.actionBtn}>
                    <button className={cn(styles.cancelBtn, 'btn btn-secondary blue')}>Batal</button>
                    <button type='submit' className={cn(styles.uploadBtn, 'btn btn-primary blue')}>Unggah Pekerjaan</button>
                </div>
            </form>
        </CustomCard>
        <CustomAlert
            open={isOpenAlert} 
            severity={alertSeverity}
            text={alertMsg}
            duration={3000} 
            onClose={() => dispatch(setOpenAlert(false))} 
        />
    </>)
}

JobVacancyForm.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}