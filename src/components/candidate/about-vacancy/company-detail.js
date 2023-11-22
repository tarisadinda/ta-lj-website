import styles from '@/styles/components/candidate/about-vacancy/CompanyDetail.module.scss'
import Link from 'next/link'

export default function CompanyDetail({data}) {
    return(<>
        <div className={styles.frame}>
            <div>
                <p className='mb-1'><b>Deskripsi Perusahaan</b></p>
                <p>
                  {data?.company_detail?.about_company}
                </p>
            </div>
            <div>
                <p className='mb-1'><b>Kategori Perusahaan</b></p>
                <p>
                </p>
            </div>
            <div>
                <p className='mb-1'><b>Website</b></p>
                <Link href='#'></Link>
            </div>
            <div>
                <p className='mb-1'><b>Alamat Perusahaan</b></p>
                <p>{data?.company_detail?.address}</p>
            </div>
        </div>
    </>)
}