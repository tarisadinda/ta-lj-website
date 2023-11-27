import Image from "next/image";
import styles from "@/styles/components/candidate/application-list/company-card.module.scss";
import cn from "classnames";
import { CustomChip } from "@/components/common/chip";
import { formatJsDate } from "src/utils/date-formatter";
import { chipApplyJob } from "src/utils/common";

export default function CompanyCard({ data }) {
  return (
    <>
      <div className={cn(styles.companyCard, "card")}>
        <div className={styles.infoCompany}>
          {/* <div className={styles.logoImg}>
                    <span>Logo Perusahaan</span>
                </div> */}
          <Image
            src={data?.job?.company_detail?.user?.img}
            width={120}
            height={120}
            alt="Company picture"
            className={styles.imgCompany}
          />
          <div>
            <b>{data?.job?.name}</b>
            <p>{data?.job?.company_detail?.user?.full_name}</p>
            <span className={styles.lastApplied}>
              Lamaran dikirim pada {formatJsDate(data?.createdAt, 'DD MMMM YYYY')}
            </span>
          </div>
        </div>
        {chipApplyJob(data?.status)}
      </div>
    </>
  );
}
