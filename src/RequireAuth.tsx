import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface User {
  name: string;
  password: string;
}

export function RequireAuth(): ReactElement {
  //   try {
  //     const user: User = JSON.parse(localStorage.getItem("user") ?? "");
  //     console.log(user);
  //     return children;
  //   } catch (error) {
  //     return <Navigate to={"/login"} />;
  //   }

  const user: User | any = JSON.parse(
    localStorage.getItem("user") ?? `{"error": "error"}`,
  );

  console.log(user);

  if (user?.error) {
    return <Navigate to={"/login"} />;
  }
  return <Outlet />;
}
