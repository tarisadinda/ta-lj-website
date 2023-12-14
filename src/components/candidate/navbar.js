import React, { useEffect, useState } from "react";
import cn from "classnames";
import styles from "@/styles/components/candidate/Navbar.module.scss";
import { Avatar, ClickAwayListener } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectUser } from "src/redux/common/userSlice";
import { removeToken } from "src/utils/token";
import { getCookie } from "cookies-next";
import { axiosInstance } from "src/utils/axios";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const router = useRouter();
  const getProfile = () => {
    axiosInstance
      .get(`/candidateDetail`)
      .then((res) => {
        const data = res?.data?.data;
        setUserProfile(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProfile();
  }, []);

  const [userProfile, setUserProfile] = useState();

  const goToProfile = () => {
    router.push("/candidate/profile");
  };

  const logout = () => {
    router.push("/login");
    removeToken();
  };

  const handleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };

  console.log(userProfile?.full_name.split(' ')[0])

  return (
    <>
      <nav className={cn(styles.navWrapper, "navbar navbar-expand-lg")}>
        <div className="container-fluid">
          <div
            className={cn(styles.group, "collapse navbar-collapse")}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  href="/candidate/home"
                >
                  Lowongan Kerja
                </Link>
              </li>
            </ul>
            <div className={styles.accountMenu}>
              <div onClick={handleDropdown} className={styles.userBtn}>
                <Avatar src={userProfile?.img} sx={{ width: 32, height: 32 }} />
                <div>
                  <span>{userProfile?.full_name?.split(' ')[0]}</span>
                  <ExpandMoreIcon sx={{ color: "#F5F5F5" }} />
                </div>
              </div>
              {
                openDropdown &&
                <ClickAwayListener onClickAway={handleDropdown}>
                  <div className={`${styles.menuList} ${openDropdown ? styles.slideInFromBottom : styles.slideOutToBottom}`}>
                    <div onClick={goToProfile} className={styles.userOption}>
                      Profil Saya
                    </div>
                    {/* <div onClick={handleDropdown}>Ubah password</div> */}
                    <div onClick={logout}>Logout</div>
                  </div>
                </ClickAwayListener>
              }
              {/* <Menu
                open={openDropdown}
                onClick={handleDropdown}
                // sx={{
                //   "& .MuiPaper-root": {
                //     position: "absolute",
                //     top: "40px !important",
                //     left: "1015px !important",
                //     width: "180px",
                //   },
                // }}
                id="account-menu"
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
              >
                <MenuItem onClick={goToProfile} className={styles.userOption}>
                  Profil Saya
                </MenuItem>
                <MenuItem onClick={handleDropdown}>Ubah password</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu> */}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
