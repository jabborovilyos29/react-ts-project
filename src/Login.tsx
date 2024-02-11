import { useGetUserQuery } from "./services";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./store/slices/user/userCheck";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  InputProps,
  Label,
  Text,
} from "@fluentui/react-components";
import { useLoginStyles } from "./hooks/styledHooks/useStyles";
import { CustomForm, UseInput, User } from "./types/Types";
import { useInput } from "./hooks/validation/useInput";
import ErrorMessage from "./ErrorMessage";

export default function Login(props: InputProps) {
  const [errorHandling, setErrorHandling] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const styles = useLoginStyles();

  const name: UseInput = useInput("", {
    isEmpty: true,
    minLength: 3,
    maxLength: 9,
  });
  const password: UseInput = useInput("", {
    isEmpty: true,
    minLength: 4,
    maxLength: 16,
  });

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
          <Text size={500} font="numeric">
            Sign in to your account
          </Text>
        </div>

        <Card className={styles.card}>
          <form onSubmit={(evt: FormEvent<CustomForm>) => handleSubmit(evt)}>
            <div className={styles.root}>
              <Label
                htmlFor={"name"}
                size={props.size}
                disabled={props.disabled}
                className={styles.label}
              >
                Name
              </Label>
              <ErrorMessage props={name} />
              <Input
                value={name.value}
                onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                  name.onChange(evt)
                }
                onBlur={() => name.onBlur()}
                id={"name"}
                {...props}
                name={"name"}
                type={"text"}
                placeholder="your name"
              />
            </div>
            <div className={styles.root}>
              <Label
                htmlFor={"password"}
                size={props.size}
                disabled={props.disabled}
                className={styles.label}
              >
                Password
              </Label>
              <ErrorMessage props={password} />
              <Input
                id={"password"}
                {...props}
                name={"password"}
                type={"password"}
                placeholder="your password"
                value={password.value}
                onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                  password.onChange(evt)
                }
                onBlur={() => password.onBlur()}
              />
            </div>
            <div style={{ margin: "20px" }}>
              <h4 style={{ color: "red" }}>
                {errorHandling && "Invalid username or password"}
              </h4>
            </div>
            <div>
              <Button
                disabled={!name.inputValid || !password.inputValid}
                type="submit"
              >
                Log in
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </>
  );
}
