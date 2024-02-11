import { makeStyles, shorthands } from "@fluentui/react-components";

export const useLoginStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    maxWidth: "400px",
  },
  card: {
    width: "400px",
    maxWidth: "100%",
    height: "fit-content",
  },
  container: {
    width: "100%",
    maxWidth: "1420px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textDiv: {
    ...shorthands.margin("20px"),
  },
  label: {
    marginBottom: "10px",
    marginTop: "10px",
    fontSize: "15px",
    fontWeight: "500",
  },
});
