import FrameModal from '@/components/common/frame-modal'
import styles from '@/styles/components/admin/modals/CustomModal.module.scss'
import cn from 'classnames'
import React from 'react'
import { API_PERMISSION, API_ROLE_PERMISSION } from 'src/utils/api'
import { axiosInstance } from 'src/utils/axios'

export default function EditPermissionModal({ open, onClose, id }) {
    const [permissionsList, setPermissionList] = React.useState([])
    const [access, setAccess] = React.useState([])
    const [detailPermission, setDetailPermission] = React.useState()

    console.log(detailPermission)
    
    const handleChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setAccess([...access, value])
        } else {
            setAccess([access.filter((e) => e !== value)])
        }
    }

    const getDetailPermission = () => {
        axiosInstance.get(API_ROLE_PERMISSION + "/" + id)
        .then((res) => setDetailPermission(res.data.data))
        .catch((err) => console.log(err))
    }

    const getListPermission = () => {
        axiosInstance.get(API_PERMISSION)
        .then((res) => {
            setPermissionList(res.data.data)
        })
    }

    React.useEffect(() => {
        if(id == 0) {
            return;
        } 

        getDetailPermission()
    }, [id])

    React.useEffect(() => {
        getListPermission()
    }, [])

    return(<>
        <FrameModal
            open={open}
            handleClose={onClose}
            title='Edit Hak Akses'
        >
            <form>
                <div className={styles.formSection}>
                    <div>
                        <label className={styles.inputLabel}>Role</label>
                        <input className='form-control' value={detailPermission?.name} disabled />
                    </div>
                    <div>
                        <label className={styles.inputLabel}>Opsi Hak Akses</label>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Everything</label>
                            {permissionsList.everything?.map((item, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                    <label className="form-check-label" for={item}>{item}</label>
                                </div>
                            ))}
                        </div>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Role</label>
                            <div className={styles.checkList}>
                                {permissionsList.master_role?.map((item, index) => (
                                    <div key={index} className="form-check">
                                        <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                        <label className="form-check-label" for={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Skill</label>
                            <div className={styles.checkList}>
                                {permissionsList.master_skill?.map((item, index) => (
                                    <div key={index} className="form-check">
                                        <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                        <label className="form-check-label" for={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Permission</label>
                            <div className={styles.checkList}>
                                {permissionsList.master_permission?.map((item, index) => (
                                    <div key={index} className="form-check">
                                        <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                        <label className="form-check-label" for={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Qualification</label>
                            <div className={styles.checkList}>
                                {permissionsList.master_qualification?.map((item, index) => (
                                    <div key={index} className="form-check">
                                        <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                        <label className="form-check-label" for={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Job Type Work</label>
                            <div className={styles.checkList}>
                                {permissionsList.master_job_type_work?.map((item, index) => (
                                    <div key={index} className="form-check">
                                        <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                        <label className="form-check-label" for={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Time Experience</label>
                            <div className={styles.checkList}>
                                {permissionsList.master_time_experience?.map((item, index) => (
                                    <div key={index} className="form-check">
                                        <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                        <label className="form-check-label" for={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Career Level</label>
                            <div className={styles.checkList}>
                                {permissionsList.master_career_level?.map((item, index) => (
                                    <div key={index} className="form-check">
                                        <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                        <label className="form-check-label" for={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Master Job</label>
                            <div className={styles.checkList}>
                                {permissionsList.master_job?.map((item, index) => (
                                    <div key={index} className="form-check">
                                        <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                        <label className="form-check-label" for={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Candidate Behavior</label>
                            <div className={styles.checkList}>
                                {permissionsList.candidate_behavior?.map((item, index) => (
                                    <div key={index} className="form-check">
                                        <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                        <label className="form-check-label" for={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ fontWeight: 600, marginBottom: '6px' }}>Company Behavior</label>
                            <div className={styles.checkList}>
                                {permissionsList.candidate_behavior?.map((item, index) => (
                                    <div key={index} className="form-check">
                                        <input onChange={handleChange} className="form-check-input" type="checkbox" value={item} id={item} />
                                        <label className="form-check-label" for={item}>{item}</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.actionBtn}>
                    <button onClick={onClose} className={cn(styles.cancelBtn, 'btn btn-ghost')}>Batal</button>
                    <button type='submit' className={cn(styles.saveBtn, 'btn btn-primary blue')}>Simpan</button>
                </div>
            </form>
        </FrameModal>
    </>)
}