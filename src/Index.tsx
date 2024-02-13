import {
  FluentProvider,
  teamsDarkTheme,
  teamsLightTheme,
} from "@fluentui/react-components";
import App from "./App";
import { useSelector } from "react-redux";
import { State } from "./types/Types";

export default function Index() {
  const theme = useSelector((state: State): boolean => state.user?.theme);

  console.log("theme", theme);

  return (
    <FluentProvider theme={theme ? teamsLightTheme : teamsDarkTheme}>
      <App />
    </FluentProvider>
  );
}
