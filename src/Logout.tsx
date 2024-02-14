import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  useRestoreFocusTarget,
} from "@fluentui/react-components";
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
import { ChangeThemeComponent } from "./ChangeThemeComponent";
import { Person24Filled, SignOut24Regular } from "@fluentui/react-icons";

export default function LogoutButton() {
  const [open, setOpen] = React.useState(false);
  const restoreFocusTargetAttribute = useRestoreFocusTarget();

  const classes = useSearchStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (): void => {
    dispatch(logout());
    setOpen(false);
    navigate("/login");
  };

  return (
    <>
      <Button
        icon={<SignOut24Regular />}
        className={classes.logoutButton}
        aria-label="Delete"
        {...restoreFocusTargetAttribute}
        onClick={() => {
          setOpen(true);
        }}
      >
        Logout
      </Button>

      <Dialog
        open={open}
        onOpenChange={(_, data) => {
          setOpen(data.open);
        }}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Logout</DialogTitle>
            <DialogContent>Are you sure to leave us?</DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button
                appearance="primary"
                onClick={() => {
                  handleLogout();
                }}
              >
                Logout
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </>
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
        <Button icon={<Person24Filled />}>User</Button>
      </PopoverTrigger>
      <PopoverSurface>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LogoutButton />
          <ChangeThemeComponent />
        </div>
      </PopoverSurface>
    </Popover>
  );
};
