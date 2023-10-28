import React from 'react'
import cn from 'classnames'
import styles from '@/styles/components/candidate/Navbar.module.scss'
import { Avatar, Menu, MenuItem, } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
    const [openDropdown, setOpenDropdown] = React.useState(false)
    const router = useRouter()

    const handleDropdown = () => {
        setOpenDropdown(!openDropdown)
    }

    return (<>
    <nav className={cn(styles.navWrapper, "navbar navbar-expand-lg")}>
        <div className="container-fluid">
            <div className={cn(styles.group, "collapse navbar-collapse")} id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" aria-current="page" href="/candidate/home">Lowongan Kerja</Link>
                    </li>
                </ul>
                <div className={styles.accountMenu}>
                    <div onClick={handleDropdown} className={styles.userBtn}>
                        <Avatar sx={{ width: 32, height: 32 }} />
                        <div>
                            <span>Nama User</span>
                            <ExpandMoreIcon sx={{ color: '#F5F5F5' }} />
                        </div>
                    </div>
                    <Menu
                        open={openDropdown}
                        onClick={handleDropdown}
                        sx={{
                            '& .MuiPaper-root': {
                                position: 'absolute',
                                top: '40px !important',
                                left: '1015px !important',
                                width: '180px'
                            }
                        }}
                        id="account-menu"
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                    >
                        <MenuItem onClick={handleDropdown} className={styles.userOption}>
                            <Link href='/candidate/profile'>Profil Saya</Link>
                        </MenuItem>
                        <MenuItem onClick={handleDropdown}>Ubah password</MenuItem>
                        <MenuItem onClick={handleDropdown}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    </nav>
    </>)
}