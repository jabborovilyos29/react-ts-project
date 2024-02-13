import {
  makeStyles,
  shorthands,
  Tab,
  TabList,
} from "@fluentui/react-components";
import { Logout } from "./Logout";
import { Link, useLocation } from "react-router-dom";
import { ChangeThemeComponent } from "./ChangeThemeComponent";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "90px",
    backgroundColor: "#d0d0d090",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "20px",
    ...shorthands.padding("10px", "10px"),
    ...shorthands.gap("30px"),
  },

  logoutContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    ...shorthands.padding("10px", "10px"),
    ...shorthands.gap("30px"),
  },

  link: {
    ...shorthands.textDecoration("none"),
    marginRight: "25px",
  },
});

export default function Header() {
  const location = useLocation();
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <TabList defaultSelectedValue={`${location.pathname}`}>
        <Link className={styles.link} to={"/"}>
          <Tab value="/">Home</Tab>
        </Link>
        <Link className={styles.link} to={"/posts"}>
          <Tab value="/posts">Posts</Tab>
        </Link>
      </TabList>
      <div className={styles.logoutContainer}>
        <Logout />
        <ChangeThemeComponent />
      </div>
    </div>
  );
}
