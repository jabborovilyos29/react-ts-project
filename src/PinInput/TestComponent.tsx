import { useEffect, useState } from "react";
import { PinInput } from "./PinInput";
import { useLazyGetPinQuery } from "../services";

export function TestComponent() {
  const [value, setValue] = useState<string>("");
  const [errorHandling, setErrorHandling] = useState(false);
  const [triggerGetPin, { isLoading, isError: errorServer, isFetching }] =
    useLazyGetPinQuery();
  const [pin, setPin] = useState<{ pin: string } | null>(null);

  const handleGetPin = async (pin: (string | null)[]) => {
    setValue(pin?.join(""));
    try {
      const response = await triggerGetPin({}).unwrap();
      setPin(response);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (pin?.pin !== value && pin !== null) {
      setErrorHandling(true);
      setPin(null);
      setValue("");
    } else if (pin?.pin === value) {
      setErrorHandling(false);
      console.log("correct");
    }
  }, [pin, value]);

  return (
    <>
      <h2>{value || "input pin"}</h2>
      <PinInput
        inputType="NUMERIC"
        lenght={4}
        loading={isLoading}
        errorServer={errorServer}
        errorHandling={errorHandling}
        setErrorHandling={setErrorHandling}
        fetching={isFetching}
        handleGetPin={handleGetPin}
      />
    </>
  );
}
