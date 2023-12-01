import Navbar from "@/components/candidate/navbar"
import cn from 'classnames'
import styles from '@/styles/components/candidate/layouts/SkillLayout.module.scss'
import SideMenu from "@/components/candidate/side-menu"
import { Provider } from "react-redux";
import { store } from "src/redux/store"

export default function SkillLayout({ children }) {
    const MenuData = [
        {
            label: 'Approved Skills',
            value: 1,
            path: '/candidate/my-skills'
        },
        {
            label: 'Status Pengajuan',
            value: 2,
            path: '/candidate/applied-skill-status'
        },
    ]

    return (<>
    <Provider store={store}>
        <Navbar />
        <div 
            className={cn(styles.wrapper,"container")}
            style={{
                paddingTop: '80px',
                marginBottom: '40px'
            }}
        >
            <div>
                <SideMenu data={MenuData} />
            </div>
            <main>
                {children}
            </main>
        </div>
    </Provider>
    
    </>)
}