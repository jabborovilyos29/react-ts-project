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

export const useAddPostStyle = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    height: "400px",
    flexDirection: "column",
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
