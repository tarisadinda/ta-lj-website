import styles from '@/styles/components/candidate/about-vacancy/CompanyDetail.module.scss'
import Link from 'next/link'

export default function CompanyDetail() {
    return(<>
        <div className={styles.frame}>
            <div>
                <p className='mb-1'><b>Deskripsi Perusahaan</b></p>
                <p>
                    Work as part of a small team to build Flutter and/or React Native applications based on user needs.
                    Build and maintain excellent Flutter and/or React Native applications with clean code.
                    Implement pixel perfect UIs that match designs.
                    Integrate back-end and or third-party APIs.
                    Release applications to Apple and Google Play stores.
                </p>
            </div>
            <div>
                <p className='mb-1'><b>Kategori Perusahaan</b></p>
                <p>
                    Kesehatan
                </p>
            </div>
            <div>
                <p className='mb-1'><b>Website</b></p>
                <Link href='#'>metanesia.co.id</Link>
            </div>
            <div>
                <p className='mb-1'><b>Alamat Perusahaan</b></p>
                <p>Titan Center | Jl. Boulevard Bintaro Blok B7/B1 No. 5 Bintaro Jaya Sektor 7, South Tangerang, Banten, Indonesia</p>
            </div>
        </div>
    </>)
}