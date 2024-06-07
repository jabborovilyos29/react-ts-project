import { useGetUserQuery } from "./services";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { modalOpen } from "./store/slices/user/userCheck";
import {
  Button,
  Card,
  Field,
  Input,
  InputProps,
  Label,
  Text,
} from "@fluentui/react-components";
import { useLoginStyles } from "./hooks/styledHooks/useStyles";
import { CustomForm, UseInput, User } from "./types/Types";
import { useInput } from "./hooks/validation/useInput";
import { ChangeThemeComponent } from "./ChangeThemeComponent";
import { tokens } from "@fluentui/react-components";
import { Eye24Regular, EyeOff24Regular } from "@fluentui/react-icons";
import { PinInputModal } from "./modal/PinInputModal";

export default function Login(props: InputProps) {
  const [errorHandling, setErrorHandling] = useState<boolean>(false);
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const dispatch = useDispatch();
  const styles = useLoginStyles();

  const handleClick = () => {
    setSeePassword((prev) => !prev);
  };

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
    setUser(user);

    if (data.name === user.name && data.password === user.password) {
      dispatch(modalOpen());
    } else {
      setErrorHandling(true);
    }
  }

  return (
    <>
      <PinInputModal user={user} />
      <div
        className={styles.container}
        style={{ backgroundColor: tokens.colorBrandStroke2Contrast }}
      >
        <div style={{ position: "absolute", top: "15px", right: "15px" }}>
          <ChangeThemeComponent />
        </div>
        <Card className={styles.card}>
          <div className={styles.textDiv}>
            <Text size={500} font="numeric">
              Sign in to your account
            </Text>
          </div>
          <form onSubmit={(evt: FormEvent<CustomForm>) => handleSubmit(evt)}>
            <div className={styles.root}>
              <Field
                label={
                  <Label size={"medium"} className={styles.label}>
                    Name
                  </Label>
                }
                validationMessage={
                  (name.isDirty &&
                    name.isEmpty.value &&
                    `${name.isEmpty.message}`) ||
                  (name.isDirty &&
                    name.maxLengthErr.value &&
                    `${name.maxLengthErr.message}`) ||
                  (name.isDirty &&
                    name.minLengthErr.value &&
                    `${name.minLengthErr.message}`) ||
                  ""
                }
              >
                <Input
                  value={name.value}
                  onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                    name.onChange(evt)
                  }
                  onBlur={() => name.onBlur()}
                  onFocus={() => name.onFocus()}
                  id={"name"}
                  {...props}
                  name={"name"}
                  type={"text"}
                  placeholder="your name"
                />
              </Field>
            </div>
            <div className={styles.root}>
              <Field
                label={
                  <Label size={"medium"} className={styles.label}>
                    Password
                  </Label>
                }
                validationMessage={
                  (password.isDirty &&
                    password.isEmpty.value &&
                    `${password.isEmpty.message}`) ||
                  (password.isDirty &&
                    password.maxLengthErr.value &&
                    `${password.maxLengthErr.message}`) ||
                  (password.isDirty &&
                    password.minLengthErr.value &&
                    `${password.minLengthErr.message}`) ||
                  ""
                }
              >
                <Input
                  id={"password"}
                  {...props}
                  name={"password"}
                  type={(seePassword && "text") || "password"}
                  placeholder="your password"
                  value={password.value}
                  contentAfter={
                    seePassword ? (
                      <EyeOff24Regular
                        onClick={() => {
                          handleClick();
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <Eye24Regular
                        onClick={() => {
                          handleClick();
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    )
                  }
                  onChange={(evt: ChangeEvent<HTMLInputElement>) =>
                    password.onChange(evt)
                  }
                  onBlur={() => password.onBlur()}
                  onFocus={() => password.onFocus()}
                />
              </Field>
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
