import styles from '@/styles/pages/candidate/MySkills.module.scss'
import cn from 'classnames'
import IconWithButton from "@/components/common/icon-button"
import SidemenuLayout from "@/components/candidate/layouts/skill-layout"
import AddIcon from '@mui/icons-material/Add'
import VerifiedSkillCard from '@/components/candidate/my-skills/verified-skill-card'
import Link from 'next/link'
import { useRouter } from 'next/router'
import SkillLayout from '@/components/candidate/layouts/skill-layout'

export default function MySkills() {
    const router = useRouter()

    const addNewSkill = () => {
        router.push('/candidate/apply-new-skill')
    }

    return(<>
        <h3 className="mb-4"><b>Kelola Keahlian Saya</b></h3>
        <IconWithButton onClick={addNewSkill} className={cn(styles.addBtn,'btn btn-primary blue')}>
            <AddIcon />
            <span><b>Pengajuan Keahlian Baru</b></span>
        </IconWithButton>
        <div className={styles.listCard}>
            <Link href='/candidate/my-skill-detail'>
                <VerifiedSkillCard />
            </Link>
            <Link href='/candidate/my-skill-detail'>
                <VerifiedSkillCard />
            </Link>
            <Link href='/candidate/my-skill-detail'>
                <VerifiedSkillCard />
            </Link>
            <Link href='/candidate/my-skill-detail'>
                <VerifiedSkillCard />
            </Link>
            <Link href='/candidate/my-skill-detail'>
                <VerifiedSkillCard />
            </Link>
        </div>
    </>)
}

MySkills.getLayout = function getLayout(page) {
    return (
        <SkillLayout>
            {page}
        </SkillLayout>
    )
}