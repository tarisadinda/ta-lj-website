import { DialogContent } from '@mui/material'
import CustomDialog from '@/components/common/dialog'
import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import cn from 'classnames'
import React from 'react'
import { axiosInstance } from 'src/utils/axios'
import { API_PERMISSION, API_ROLE, API_ROLE_PERMISSION, API_SALARY } from 'src/utils/api'
import { useDispatch } from 'react-redux';
import { setMessage, setOpenAlert } from 'src/redux/common/alertSlice';

export default function AddPermissionModal({ open, onClose }) {
    const dispatch = useDispatch()
    const [role, setRole] = React.useState([])
    const [idRole, setIdRole] = React.useState(0)
    const [permissionsList, setPermissionList] = React.useState([])
    const [accessList, setAccessList] = React.useState([])
    const [checkData, setCheckData] = React.useState(false)

    const getRole = () => {
        axiosInstance.get(API_ROLE)
        .then((res) => {
            setRole(res.data.data.data)
        }).catch((err) => console.log(err))
    }

    const selectRole = (e) => {
        setIdRole(e.target.value)
    }

    const getListPermission = () => {
        axiosInstance.get(API_PERMISSION)
        .then((res) => {
            console.log(res)
            setPermissionList(res.data.data)
        })
    }

    console.log(accessList)
    console.log(idRole)
    const handleChange = (item) => (e) => {
        const { value, checked } = e.target;

        if(accessList.includes(item)) {
            setAccessList([accessList.filter((item) => item !== value)])
        } else {
            setAccessList((prevData) => [
                ...prevData,
                value
            ])
        }
        // if (checked) {
        //     setAccessList([...accessList, value])
        // } else {
        //     setAccessList([accessList.filter((e) => e !== value)])
        // }
    }

    React.useEffect(() => {
        accessList.forEach((item) => {
            console.log(item)
        })
    }, [accessList])

    React.useEffect(() => {
        getRole()
        getListPermission()
    }, [])

    const submitPermission = () => {
        const formData = {
            access: accessList
        }

        console.log(formData)
        axiosInstance.post(API_ROLE_PERMISSION + "/" + idRole, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            console.log(res)
            onClose()
        })
        .catch((err) => console.log(err))
    }

    return(<>
        <CustomDialog 
            title='Tambah Hak Akses'
            open={open} 
            handleClose={onClose} 
        >
            <DialogContent dividers>
            <div className={styles.formSection}>
                <div>
                    <label style={{ fontWeight: 600, marginBottom: '6px' }}>Pilih Role</label>
                    <select className="form-select" onChange={selectRole}>
                        {
                            role.map((item, index) => (
                                <option value={item.id} key={index}>{item.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <label style={{ fontWeight: 600, marginBottom: '6px' }}>Opsi Hak Akses</label>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Everything</label>
                        {permissionsList.everything?.map((item, index) => (
                            <div key={index} className="form-check">
                                <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                            </div>
                        ))}
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Role</label>
                        <div className={styles.checkList}>
                            {permissionsList.master_role?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Skill</label>
                        <div className={styles.checkList}>
                            {permissionsList.master_skill?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Permission</label>
                        <div className={styles.checkList}>
                            {permissionsList.master_permission?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Qualification</label>
                        <div className={styles.checkList}>
                            {permissionsList.master_qualification?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Job Type Work</label>
                        <div className={styles.checkList}>
                            {permissionsList.master_job_type_work?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Time Experience</label>
                        <div className={styles.checkList}>
                            {permissionsList.master_time_experience?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Career Level</label>
                        <div className={styles.checkList}>
                            {permissionsList.master_career_level?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Job</label>
                        <div className={styles.checkList}>
                            {permissionsList.master_job?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Candidate Behavior</label>
                        <div className={styles.checkList}>
                            {permissionsList.candidate_behavior?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label style={{ fontWeight: 600, marginBottom: '6px' }}>Company Behavior</label>
                        <div className={styles.checkList}>
                            {permissionsList.company_behavior?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange(item)} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item.replace(/_/g, ' ')}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                    <button onClick={submitPermission} className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                </div>
            </div>
            </DialogContent>
        </CustomDialog>
    </>)
}