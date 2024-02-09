import { FormEvent, useState } from "react";
import { useGetUserQuery } from "./services";
import { useDispatch } from "react-redux";
import { login } from "./store/slices/user/userCheck";
import { useNavigate } from "react-router-dom";
import { DefaultButton } from "@fluentui/react";
import {
  Card,
  Input,
  InputProps,
  Label,
  Text,
  makeStyles,
  shorthands,
} from "@fluentui/react-components";

interface User {
  name: string;
  password: string;
}

interface CustomElements extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  elements: CustomElements;
}

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    ...shorthands.gap("2px"),
    maxWidth: "400px",
  },

  input: {
    ...shorthands.borderBottom("1px", "solid", "black"),
  },
  card: {
    width: "400px",
    maxWidth: "100%",
    height: "fit-content",
  },
  container: {
    width: "100%",
    maxWidth: "1320px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textDiv: {
    ...shorthands.margin("20px"),
  },
});

export default function Login(props: InputProps) {
  const [errorHandling, setErrorHandling] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const styles = useStyles();

  const { data } = useGetUserQuery({
    refetchOnMountOrArgChange: true,
  });

  function handleSubmit(evt: FormEvent<CustomForm>) {
    evt.preventDefault();
    const target = evt.currentTarget.elements;

    const user: User = {
      name: target.name.value,
      password: target.password.value,
    };

    if (data.name === user.name && data.password === user.password) {
      dispatch(login(user));
      navigate("/");
    } else {
      setErrorHandling(true);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.textDiv}>
          <Text font="numeric">Sign in to your account</Text>
        </div>

        <Card className={styles.card}>
          <form onSubmit={(evt: FormEvent<CustomForm>) => handleSubmit(evt)}>
            <div className={styles.root}>
              <Label
                htmlFor={"name"}
                size={props.size}
                disabled={props.disabled}
              >
                Name
              </Label>
              <Input
                className={styles.input}
                maxLength={20}
                minLength={2}
                required={true}
                id={"name"}
                {...props}
                name={"name"}
                type={"text"}
              />
            </div>
            <div className={styles.root}>
              <Label
                htmlFor={"password"}
                size={props.size}
                disabled={props.disabled}
              >
                Password
              </Label>
              <Input
                className={styles.input}
                maxLength={20}
                minLength={4}
                required={true}
                id={"password"}
                {...props}
                name={"password"}
                type={"password"}
              />
            </div>
            <div style={{ margin: "20px" }}>
              <h4 style={{ color: "red" }}>
                {errorHandling && "Invalid username or password"}
              </h4>
            </div>
            <div>
              <DefaultButton type="submit">Log in</DefaultButton>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
