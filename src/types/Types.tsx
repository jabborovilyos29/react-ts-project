import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { InputProps } from "@fluentui/react-components";

export interface Values {
  title: string;
  author: string;
}

export interface Items {
  id: string | number;
  title: string;
  author: string;
}

export interface User {
  name: string;
  password: string;
}

export interface Post {
  id: string;
  title: string;
  author: string;
}

export interface CustomElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  password: HTMLInputElement;
}

export interface CustomForm extends HTMLFormElement {
  elements: CustomElements;
}

export interface RefElements extends HTMLFormControlsCollection {}

export interface RefForm extends HTMLFormElement {
  elements: RefElements;
}

export interface InitialState {
  user: User | null;
  theme: boolean;
  modal: boolean;
}

export interface State {
  user: InitialState;
}

export interface IsEmptyValue {
  value: boolean;
  message: string;
}

export interface UseInput {
  isEmpty: IsEmptyValue;
  minLengthErr: IsEmptyValue;
  maxLengthErr: IsEmptyValue;
  value: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  isDirty: boolean;
  inputValid: boolean;
}

export interface PinInputProps extends InputProps {
  inputType: "NUMERIC" | "ALPHABETIC" | "ALL";
  lenght: 6 | 4;
  loading: boolean;
  fetching: boolean;
  errorServer: boolean;
  errorHandling: boolean;
  setErrorHandling: Dispatch<SetStateAction<boolean>>;
  handleGetPin: (pin: (string | null)[]) => Promise<void>;
}
