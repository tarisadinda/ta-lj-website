import cn from "classnames";
import styles from "@/styles/components/candidate/layouts/ProfileLayout.module.scss";
import SideMenu from "@/components/candidate/side-menu";
import { Avatar, IconButton } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Navbar from "@/components/candidate/navbar";
import { Provider } from "react-redux";
import { store } from "src/redux/store";

export default function ProfileLayout({ children }) {
  const MenuData = [
    {
      label: "Lamaran Saya",
      value: 1,
      path: "/candidate/application-list",
    },
    // {
    //   label: "Keahlian Saya",
    //   value: 2,
    //   path: "/candidate/my-skills",
    // },
    {
      label: "Penawaran",
      value: 2,
      path: "/candidate/offering-list",
    },
  ];

  return (
    <Provider store={store}>
      <Navbar />
      <div
        className="container"
        style={{
          paddingTop: "80px",
          marginBottom: "40px",
        }}
      >
        <div className={styles.wrapper}>
          <SideMenu data={MenuData} />
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </Provider>
  );
}
