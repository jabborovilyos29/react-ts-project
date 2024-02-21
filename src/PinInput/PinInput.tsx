import { Field, Input, Spinner } from "@fluentui/react-components";
import { useStyles } from "./useStyles";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { PinInputProps, RefForm } from "../types/Types";

export const PinInput = ({
  inputType,
  lenght,
  loading,
  fetching,
  errorServer,
  errorHandling,
  setErrorHandling,
  handleGetPin,
}: PinInputProps) => {
  const classes = useStyles();
  const [focusId, setFocusId] = useState<number | null>(null);
  const inputRef = useRef<RefForm>(null);
  const [pin, setPin] = useState<(string | null)[]>(
    new Array(lenght).fill(null),
  );

  ///  finit machine
  useEffect(() => {
    const elements = inputRef.current?.elements;
    if (!elements) return;

    if (pin.join("").length === lenght) {
      handleGetPin(pin);
      setFocusId(null);
      setPin(new Array(lenght).fill(null));
    }

    if (focusId !== null) {
      elements[focusId - 1]?.focus();
      setFocusId(null);
    } else {
      for (let index = 0; index < pin.length; index++) {
        if (pin[index] === null && loading === false) {
          elements[index]?.focus();
          break;
        }
      }
    }
  }, [pin, loading]);

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>, id: number) => {
    setErrorHandling(false);
    const elements = inputRef.current?.elements;
    if (!elements) return;
    if (evt.key === "Backspace") {
      setFocusId(id);
      setPin((prev) => {
        const newPin = prev.map((element, idx) => {
          if (idx === id) {
            return null;
          } else {
            return element;
          }
        });
        return newPin;
      });
    }
  };

  const handleChange = (evt: ChangeEvent<HTMLInputElement>, itemId: number) => {
    setErrorHandling(false);
    const newPin = pin.map((element, id) => {
      if (id === itemId && evt.target.value.length <= 1) {
        return evt.target.value;
      } else {
        return element;
      }
    });
    setPin(newPin);
  };

  return (
    <>
      <form ref={inputRef} className={classes.root}>
        <Field
          className={classes.field}
          label="Input pin"
          validationState={
            ((errorServer || errorHandling) && "error") || "none"
          }
          validationMessage={
            (errorServer && "server error") ||
            (errorHandling && "invalid pin") ||
            ""
          }
        >
          <div className={classes.inputGroup}>
            {pin.map((item, id) => {
              return (
                <Input
                  disabled={loading}
                  type={(inputType === "NUMERIC" && "number") || "text"}
                  style={{
                    border: errorHandling || errorServer ? "1px solid red" : "",
                  }}
                  value={item ?? ""}
                  key={id}
                  className={classes.input}
                  maxLength={1}
                  onKeyDown={(evt: KeyboardEvent<HTMLInputElement>) => {
                    handleKeyDown(evt, id);
                  }}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                    handleChange(evt, id);
                  }}
                />
              );
            })}
            {(loading || fetching) && <Spinner size="tiny" />}
          </div>
        </Field>
      </form>
    </>
  );
};
