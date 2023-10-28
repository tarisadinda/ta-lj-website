import LayoutMain from "@/components/candidate/layouts/main"
import cn from 'classnames'
import styles from '@/styles/pages/candidate/ApplyNewSkill.module.scss'
import { Card } from "@mui/material"

export default function ApplyNewSkill() {
    return(<>
        <div className="d-flex justify-content-center">
            <Card 
                variant="outlined" 
                sx={{ border: '1px solid #1C55FF', padding: '50px', 
                    borderRadius: '10px', width: '750px' 
                }}
            >
                <h3 className={styles.headline}><b>Pengajuan Keahlian Baru</b></h3>
                <form>
                    <div className={styles.inputWrap}>
                        <div>
                            <label>Nama Lengkap</label>
                            <input type="text" className="form-control" placeholder="Dio Putra, S.T." />
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="dioputra@gmail.com" />
                            </div>
                            <div className="col">
                                <label>Nomor Handphone</label>
                                <input type="text" className="form-control" placeholder="085203476772" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Kategori Keahlian</label>
                                <select className="form-select">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col">
                                <label>Bidang Keahlian</label>
                                <select className="form-select">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col">
                                <label>Level</label>
                                <input type="text" className="form-control" placeholder="Level 1" disabled />
                            </div>
                        </div>
                        <div>
                            <label>Lampiran</label>
                            <input type="file" class="form-control" id="inputGroupFile02" />
                        </div>
                    </div>
                    <div className={styles.actionBtn}>
                        <button className={cn(styles.button, "btn btn-secondary blue")}>Batal</button>
                        <button className={cn(styles.button, "btn btn-primary blue")}>Ajukan Keahlian</button>
                    </div>
                </form>
            </Card>
        </div>
    </>)
}

ApplyNewSkill.getLayout = function getLayout(page) {
    return (
        <LayoutMain>
            {page}
        </LayoutMain>
    )
}