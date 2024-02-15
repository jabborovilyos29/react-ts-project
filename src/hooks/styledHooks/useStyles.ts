import { makeStyles, shorthands } from "@fluentui/react-components";

export const useLoginStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    maxWidth: "400px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    ...shorthands.margin("0", "auto"),
    height: "fit-content",
  },
  container: {
    width: "100%",
    ...shorthands.margin("0", "auto"),
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "5px",
  },
  label: {
    marginBottom: "10px",
    marginTop: "10px",
    fontSize: "15px",
    fontWeight: "500",
  },
});

export const useAddPostStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    maxWidth: "200px",
    height: "50px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    width: "400px",
    "> div": {
      display: "flex",
      flexDirection: "column",
      ...shorthands.gap("2px"),
    },
  },

  title: {
    letterSpacing: "2px",
  },

  button: {
    width: "70px",
    height: "40px",
  },
});

export const useSearchStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    ...shorthands.gap("2px"),
    width: "100%",
    height: "50px",
  },

  logoutButton: {
    "&:hover": {
      backgroundColor: "tomato",
      color: "white",
    },
  },

  searchBox: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("20px"),
    width: "330px",
  },
});

export const useCardStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...shorthands.gap("15px"),
  },

  card: {
    ...shorthands.margin("auto"),
    width: "520px",
    maxWidth: "100%",
  },
});
export const useTableStyles = makeStyles({
  root: {
    width: "100%",
    maxWidth: "750px",
    height: "100vh",
    minHeight: "86.6vh",
    display: "flex",
    flexDirection: "column",
    ...shorthands.padding("40px"),
    justifyContent: "start",
    alignItems: "flex-start",
  },
});
