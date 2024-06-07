import { ChangeEvent, useState } from "react";
import { useValidation } from "./useValidation";
import { UseInput } from "../../types/Types";

export const useInput = (
  initialValue: string,
  validations: Record<string, any>,
): UseInput => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const valid = useValidation(value, validations);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setValue(evt.target.value);
  };

  const onBlur = () => {
    setIsDirty(true);
  };

  const onFocus = () => {
    setIsDirty(false);
  };

  return { value, onChange, onBlur, onFocus, isDirty, ...valid };
};
