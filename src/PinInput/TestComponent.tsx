import { useState } from "react";
import { PinInput } from "./PinInput";
import { useLazyGetPinQuery } from "../services";

export function TestComponent() {
  const [value, setValue] = useState<string>("");
  const [responsePin, setResponsePin] = useState<{ value: string } | null>(
    null,
  );
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
      } else {
        setResponsePin({ value: "error" });
      }
    } catch (err) {
      console.log(err);
      clearResponse();
    }
  };

  return (
    <>
      <h2>{value || "input pin"}</h2>
      <PinInput
        inputType="NUMERIC"
        lenght={4}
        responsePin={responsePin}
        isLoading={isLoading}
        isError={isError}
        isFetching={isFetching}
        handleGetPin={handleGetPin}
      />
    </>
  );
}
