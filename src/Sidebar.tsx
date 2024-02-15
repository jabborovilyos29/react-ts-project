import {
  makeStyles,
  shorthands,
  Tab,
  TabList,
} from "@fluentui/react-components";
import { Link, useLocation } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "200px",
    height: "100vh",
    minHeight: "86.6vh",
    backgroundColor: "#d0d0d090",
    justifyContent: "center",
    alignItems: "flex-start",
    ...shorthands.overflow("hidden"),
    ...shorthands.padding("10px", "10px"),
    ...shorthands.gap("30px"),
  },

  link: {
    ...shorthands.textDecoration("none"),
    ...shorthands.padding("15px"),
    width: "100%",
    height: "100%",
  },
});

export default function Sidebar() {
  const location = useLocation();
  const styles = useStyles();

  return (
    <>
      <div className={styles.root}>
        <TabList defaultSelectedValue={`${location.pathname}`} vertical>
          <Tab value="/">
            <Link className={styles.link} to={"/"}>
              Home
            </Link>
          </Tab>
          <Tab value="/posts">
            <Link className={styles.link} to={"/posts"}>
              Posts
            </Link>
          </Tab>
        </TabList>
      </div>
    </>
  );
}
