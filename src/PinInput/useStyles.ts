import { makeStyles, shorthands } from "@fluentui/react-components";
import { tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
  field: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "440px",
    height: "330px",
    ...shorthands.border("2px", "solid", "teal"),
    ...shorthands.borderRadius("10px"),
  },
  inputGroup: {
    display: "flex",
    position: "relative",
    textAlign: "center",
    ...shorthands.gap("10px"),
  },
  input: {
    "> input": {
      textAlign: "center",
    },
    "> input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
    },
    fontSize: "18px",
    fontWeight: "normal",
    width: "30px",
    ...shorthands.padding("0"),
  },
  errorInput: {
    ...shorthands.border("1px", "solid", tokens.colorPaletteRedBorder2),
    "> input::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
    },
    fontSize: "18px",
    fontWeight: "normal",
    width: "30px",
    ...shorthands.padding("0"),
  },
});
