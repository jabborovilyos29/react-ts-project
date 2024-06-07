import { ChangeEvent } from "react";
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
  pin: boolean;
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
  onFocus: () => void;
  isDirty: boolean;
  inputValid: boolean;
}

export interface PinInputProps extends InputProps {
  inputType: "NUMERIC" | "ALPHABETIC" | "ALL";
  lenght: 6 | 4;
  responsePin: { value: string } | null;

  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  handleGetPin: (pin: (string | null)[]) => Promise<string | any>;
}
