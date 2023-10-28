import SkillLayout from "@/components/candidate/layouts/skill-layout";
import SidemenuLayout from "@/components/candidate/layouts/skill-layout";
import ApplyStatusCard from "@/components/candidate/my-skills/apply-status-card";
import Link from "next/link";

export default function AppliedSkillStatus() {
    return(<>
        <h3 className="mb-4"><b>Status Pengajuan Keahlian</b></h3>
        <div style={{ display: 'grid', rowGap: '15px' }}>
            <Link href='/apply-skill-detail'>
                <ApplyStatusCard />
            </Link>
            <Link href='/apply-skill-detail'>
                <ApplyStatusCard />
            </Link>
            <Link href='/apply-skill-detail'>
                <ApplyStatusCard />
            </Link>
        </div>
    </>)
}

AppliedSkillStatus.getLayout = function getLayout(page) {
    return (
        <SkillLayout>
            {page}
        </SkillLayout>
    )
}