import { Switch } from "@fluentui/react-components";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from "./store/slices/user/userCheck";
import { State } from "./types/Types";




export const ChangeThemeComponent = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: State): boolean => state.user?.theme);

  const [checked, setChecked] = useState<boolean>(true);
  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTheme());
    console.log(checked);
    setChecked(ev.currentTarget.checked);
  };

  return (
    <Switch
      checked={checked}
      onChange={onChange}
      label={theme ? "Light" : "Dark"}
    />
  );
};
