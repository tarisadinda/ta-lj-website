import styles from "@/styles/components/candidate/about-vacancy/VacancyDetail.module.scss";
import { Card } from "@mui/material";

export default function VacancyDetail({ data }) {
  return (
    <>
      <div className={styles.infoWrap}>
        <div className={styles.frame}>
          <div>
            <p className="mb-1">
              <b>Deskripsi Pekerjaan</b>
            </p>
            <p>{data?.description}</p>
          </div>
          <div>
            <p className="mb-1">
              <b>Kualifikasi</b>
            </p>
            {data?.Skill?.map((value) => (
              <p>{value.name}</p>
            ))}
          </div>
        </div>
        <div className={styles.smallFrame}>
          <Card className={styles.typeSection} elevation>
            <p>
              <b>Jenis Pekerjaan</b>
            </p>
            <p>{data?.career_level?.name}</p>
          </Card>
          <Card className={styles.typeSection} elevation>
            <p>
              <b>Metode Kerja</b>
            </p>
            <p>{data?.job_type_work?.name}</p>
          </Card>
        </div>
      </div>
    </>
  );
}
