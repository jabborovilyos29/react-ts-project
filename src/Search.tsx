import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./store/slices/user/userCheck";
import { useNavigate } from "react-router-dom";
import { Input, makeStyles, shorthands } from "@fluentui/react-components";
import { DefaultButton } from "@fluentui/react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
    height: "80px",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    ...shorthands.borderBottom("1px", "solid", "black"),
  },
  label: {
    ...shorthands.margin("20px", "20px"),
  },
});

export default function Search({ triggerSearchTitle }: any) {
  const classes = useStyles();
  const [search, setSearch] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = (): void => {
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    const getdata = setTimeout(async () => {
      try {
        const response = await triggerSearchTitle(search).unwrap();
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }, 750);
    return () => clearTimeout(getdata);
  }, [search]);

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value);
  };

  return (
    <div className={classes.root}>
      <DefaultButton onClick={Logout}>Logout</DefaultButton>
      <label htmlFor="search" className={classes.label}>
        Search
      </label>
      <Input
        type="search"
        name="search"
        id="search"
        className={classes.input}
        value={search}
        onChange={(evt: ChangeEvent<HTMLInputElement>) => {
          handleSearch(evt);
        }}
      />
    </div>
  );
}
