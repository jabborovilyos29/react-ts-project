import * as React from "react";
import { Button } from "@fluentui/react-components";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "./store/slices/user/userCheck";
import { useSearchStyles } from "./hooks/styledHooks/useStyles";
import {
  Popover,
  PopoverSurface,
  PopoverTrigger,
} from "@fluentui/react-components";
import type { PopoverProps } from "@fluentui/react-components";


export default function LogoutButton() {
  const classes = useSearchStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = (): void => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Button className={classes.logoutButton} onClick={Logout}>
      Logout
    </Button>
  );
}

export const Logout = () => {
  const [visible, setVisible] = React.useState(false);
  const focusRef = React.useRef<HTMLAnchorElement>(null);

  const onOpenChange: PopoverProps["onOpenChange"] = (_, data) => {
    if (data.open === false) {
      setVisible(false);
    }
  };

  React.useEffect(() => {
    if (visible) {
      focusRef.current?.focus();
    }
  }, [visible]);

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Logout</Button>
      </PopoverTrigger>
      <PopoverSurface>
        <LogoutButton />
      </PopoverSurface>
    </Popover>
  );
};
