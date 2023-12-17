import * as React from 'react'
import styles from '@/styles/components/company/Navbar.module.scss'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonIcon from '@mui/icons-material/Person'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import { deleteCookie } from 'cookies-next'
import { dataCompany } from 'src/utils/data-cookies'
import { useRouter } from 'next/router'

const drawerWidth = 240


export default function Navbar() {
  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.clear()
    deleteCookie("access_token")
    deleteCookie("company_detail")
  }
  
  const [isVerified, setIsVerified] = React.useState(false)

  React.useEffect(() => {
    if(dataCompany !== null) {
      setIsVerified(dataCompany?.company_detail.status_verif)
    }
  }, [dataCompany])

  console.log(router.pathname)
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar className={styles.topBtn}>
          <div>
            <Link href='/company/company-profile' className={styles.link}>
              <AccountCircleIcon sx={{ fontSize: 40 }} />
              <p className={styles.name}>Profil Perusahaan</p>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }} className={styles.menuWrap}>
          <List>
            <Link href='/company/dashboard'>
              <ListItemButton className={router.pathname.includes('dashboard') && styles.activeMenu}>
                <ListItemText primary='Dashboard' />
              </ListItemButton>
            </Link>
            <Link href={isVerified == false ? '' : '/company/vacancy-list'}>
              <ListItemButton 
                disabled={isVerified == false ? true : false}
                className={router.pathname.includes('vacancy-list') && styles.activeMenu}
              >
                <ListItemText primary='Data Lowongan' />
              </ListItemButton>
            </Link>
            <Link href='/company/applicant-list'>
              <ListItemButton
                className={router.pathname.includes('applicant-list') && styles.activeMenu}
              >
                <ListItemText primary='Data Pelamar' />
              </ListItemButton>
            </Link>
            <Link href='/company/search-employee'>
              <ListItemButton
                className={router.pathname.includes('search-employee') && styles.activeMenu}
              >
                <ListItemText primary='Cari Kandidat' />
              </ListItemButton>
            </Link>
          </List>
          <List>
            <Link href='/login'>
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}