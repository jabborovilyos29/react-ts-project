import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogBody,
  Button,
} from "@fluentui/react-components";
import { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../types/Types";
import { modalOpenClose } from "../store/slices/user/userCheck";

export const ControllingOpenAndClose = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const modal = useSelector((state: State): boolean => state.user?.modal);

  const dispatch = useDispatch();

  return (
    <Dialog open={modal} onOpenChange={() => dispatch(modalOpenClose())}>
      <DialogTrigger disableButtonEnhancement>
        <Button>Add post...</Button>
      </DialogTrigger>
      <DialogSurface>
        <DialogBody>{children}</DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
