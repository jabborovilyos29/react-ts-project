import {
  makeStyles,
  shorthands
} from "@fluentui/react-components";
import { Logout } from "./Logout";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "90px",
    backgroundColor: "#d0d0d090",
    justifyContent: "space-around",
    alignItems: "center",
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
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div className={styles.logoutContainer}>
        <Logout />
      </div>
    </div>
  );
}
