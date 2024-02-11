import { useEffect, useState } from "react";
import { IsEmptyValue } from "../../types/Types";

const isEmptyValue: IsEmptyValue = {
  value: true,
  message: "",
};

export const useValidation = (
  value: string,
  validations: Record<string, any>,
): {
  isEmpty: IsEmptyValue;
  minLengthErr: IsEmptyValue;
  maxLengthErr: IsEmptyValue;
  inputValid: boolean;
} => {
  const [isEmpty, setIsEmpty] = useState<IsEmptyValue>(isEmptyValue);
  const [minLengthErr, setMinLengthErr] = useState<IsEmptyValue>({
    ...isEmptyValue,
    value: false,
  });
  const [maxLengthErr, setMaxLengthErr] = useState<IsEmptyValue>({
    ...isEmptyValue,
    value: false,
  });

  const [inputValid, setInputValid] = useState<boolean>(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "minLength":
          value.length < validations[validation]
            ? setMinLengthErr({
                value: true,
                message: `Minimum length is ${validations[validation]}`,
              })
            : setMinLengthErr({ value: false, message: "" });
          break;

        case "maxLength":
          value.length > validations[validation]
            ? setMaxLengthErr({
                value: true,
                message: `Maximum length is ${validations[validation]}`,
              })
            : setMaxLengthErr({ value: false, message: "" });
          break;

        case "isEmpty":
          value
            ? setIsEmpty({ value: false, message: "" })
            : setIsEmpty({ value: true, message: "The empty input field" });
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty.value || minLengthErr.value || maxLengthErr.value) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthErr, maxLengthErr]);

  return { isEmpty, minLengthErr, maxLengthErr, inputValid };
};
