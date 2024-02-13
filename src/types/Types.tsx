import { ChangeEvent } from "react";

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
