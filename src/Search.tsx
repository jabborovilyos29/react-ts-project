import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./store/slices/user/userCheck";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@fluentui/react-components";
import { useSearchStyles } from "./hooks/styledHooks/useStyles";

export default function Search({ triggerSearchTitle }: any) {
  const classes = useSearchStyles();
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
    <>
      <div className={classes.root}>
        <Button className={classes.logoutButton} onClick={Logout}>Logout</Button>
        <div className={classes.searchBox}>
          <Input
            id="search"
            name="search"
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              handleSearch(evt);
            }}
          />
        </div>
      </div>
    </>
  );
}
