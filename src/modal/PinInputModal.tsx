import { Dialog, DialogSurface, DialogBody } from "@fluentui/react-components";
import { useDispatch, useSelector } from "react-redux";
import { PinInput } from "../PinInput/PinInput";
import { useLazyGetPinQuery } from "../services";
import { useState } from "react";
import { login, modalClose } from "../store/slices/user/userCheck";
import { State, User } from "../types/Types";
import { useNavigate } from "react-router-dom";

export const PinInputModal = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const [value, setValue] = useState<string>("");
  const [responsePin, setResponsePin] = useState<{ value: string } | null>(
    null,
  );
  const modal = useSelector((state: State) => state.user.modal);

  const dispatch = useDispatch();
  const [triggerGetPin, { isLoading, isError, isFetching }] =
    useLazyGetPinQuery();

  const clearResponse = () => {
    setResponsePin(null);
  };

  const handleGetPin = async (pin: (string | null)[]) => {
    setValue(pin.join(""));
    try {
      const response: { pin: string } = await triggerGetPin({}).unwrap();
      if (response.pin === pin.join("")) {
        setResponsePin({
          value: response.pin,
        });
        dispatch(login(user));
        navigate("/");
        dispatch(modalClose());
      } else {
        setResponsePin({ value: "error" });
      }
    } catch (err) {
      console.log(err);
      clearResponse();
    }
  };

  return (
    <Dialog modalType="alert" open={modal}>
      <DialogSurface>
        <DialogBody>
          <PinInput
            inputType="NUMERIC"
            lenght={4}
            responsePin={responsePin}
            isLoading={isLoading}
            isError={isError}
            isFetching={isFetching}
            handleGetPin={handleGetPin}
          />
        </DialogBody>
      </DialogSurface>
    </Dialog>
  );
};
