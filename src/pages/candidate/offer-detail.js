import LayoutMain from "@/components/candidate/layouts/main";
import styles from "@/styles/pages/candidate/OfferDetail.module.scss";
import { Card } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";

export default function OfferDetail() {
  return (
    <>
      <div>
        <h2>
          <b>Detail Penawaran</b>
        </h2>
        <Card variant="outlined" className={styles.card}>
          <div>
            <p className={styles.company}>PT Aruni Indonesia</p>
            <p className={styles.role}>Web Developer</p>
            <div className={styles.loc}>
              <PlaceIcon />
              <span>Malang, Jawa Timur</span>
            </div>
          </div>
          <div className={styles.action}>
            <button className="btn btn-primary blue">Terima Tawaran</button>
            <button className="btn btn-danger red">Tolak Tawaran</button>
          </div>
        </Card>
        <div className={styles.colGrid}>
          <div>
            <div>
              <p className="mb-1">
                <b>Deskripsi Pekerjaan</b>
              </p>
              <ul>
                <li>Bisa mengedalikan udara</li>
                <li>Bisa mengendari tank tempur</li>
                <li>Bisa mengendalikan rocket balistik</li>
              </ul>
            </div>
            <div>
              <p className="mb-1">
                <b>Kualifikasi</b>
              </p>
              <ul>
                <li>Kuat</li>
              </ul>
            </div>
            <div className={styles.colFlex}>
              <div>
                <p className="mb-1">
                  <b>Jenis Pekerjaan</b>
                </p>
                <p>Tanam Paksa</p>
              </div>
              <div>
                <p className="mb-1">
                  <b>Metode Kerja</b>
                </p>
                <p>Rodi</p>
              </div>
            </div>
            <div>
              <p className="mb-1">
                <b>Surat Penawaran</b>
              </p>
              <p>
                Selamat pagi, saya perwaklilan dari PT Aruni Indonesia tertarik dengan kualifikasi dan pengalaman yang anda miliki sehingga kami
                ingin memberikan penawaran anda sebagai Web developer di
                perusahaan kami. Apabila anda tertarik silahkan menghubungi
                nomor berikut 085-203144567 untuk mendapatkan arahan
                selanjutnya. Terima kasih.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

OfferDetail.getLayout = function getLayout(page) {
  return <LayoutMain>{page}</LayoutMain>;
};
