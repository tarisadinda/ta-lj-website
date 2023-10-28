import * as React from 'react'
import styles from '@/styles/components/Navbar.module.scss'
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

const drawerWidth = 240


export default function Navbar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar className={styles.topBtn}>
          <div>
            <Link href='/company-profile' className={styles.link}>
              <AccountCircleIcon sx={{ fontSize: 40 }} />
              <p className={styles.name}>PT Perusahaan</p>
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
            <Link href='/dashboard'>
              <ListItemButton>
                <ListItemText primary='Dashboard' />
              </ListItemButton>
            </Link>
            <Link href='/vacancy-list'>
              <ListItemButton>
                <ListItemText primary='Daftar Lowongan' />
              </ListItemButton>
            </Link>
            <Link href='/applicant-list'>
              <ListItemButton>
                <ListItemText primary='Data Pelamar' />
              </ListItemButton>
            </Link>
            <Link href='/search-employee'>
              <ListItemButton>
                <ListItemText primary='Cari Karyawan' />
              </ListItemButton>
            </Link>
          </List>
          <List>
            <Link href='/login'>
              <ListItem disablePadding>
                <ListItemButton>
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