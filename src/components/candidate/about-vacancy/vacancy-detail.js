import styles from '@/styles/components/candidate/about-vacancy/VacancyDetail.module.scss'
import { Card } from "@mui/material"

export default function VacancyDetail() {
    return(<>
        <div className={styles.infoWrap}>
            <div className={styles.frame}>
                <div>
                    <p className='mb-1'><b>Deskripsi Pekerjaan</b></p>
                    <p>
                        Work as part of a small team to build Flutter and/or React Native applications based on user needs.
                        Build and maintain excellent Flutter and/or React Native applications with clean code.
                        Implement pixel perfect UIs that match designs.
                        Integrate back-end and or third-party APIs.
                        Release applications to Apple and Google Play stores.
                    </p>
                </div>
                <div>
                <p className='mb-1'><b>Kualifikasi</b></p>
                    <p>
                        Java, Node.js, JavaScript, React
                    </p>
                </div>
            </div>
            <div className={styles.smallFrame}>
                <Card className={styles.typeSection} elevation>
                    <p><b>Jenis Pekerjaan</b></p>
                    <p>Full time</p>
                </Card>
                <Card className={styles.typeSection} elevation>
                    <p><b>Metode Kerja</b></p>
                    <p>Work from office</p>
                </Card>
            </div>
        </div>
    </>)
}