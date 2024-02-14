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
    height: "88.8vh",
    width: "200px",
    backgroundColor: "#d0d0d090",
    justifyContent: "center",
    alignItems: "flex-start",
    ...shorthands.padding("10px", "10px"),
    ...shorthands.gap("30px"),
  },

  link: {
    ...shorthands.textDecoration("none"),
    marginRight: "25px",
  },
});

export default function Sidebar() {
  const location = useLocation();
  const styles = useStyles();

  return (
    <>
      <div className={styles.root}>
        <TabList defaultSelectedValue={`${location.pathname}`} vertical>
          <Link className={styles.link} to={"/"}>
            <Tab value="/">Home</Tab>
          </Link>
          <Link className={styles.link} to={"/posts"}>
            <Tab value="/posts">Posts</Tab>
          </Link>
        </TabList>
      </div>
    </>
  );
}
