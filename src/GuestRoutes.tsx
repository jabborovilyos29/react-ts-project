import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface User {
  name?: string;
  password?: string;
  error?: string;
}

interface Props {
  children: ReactElement;
}

export function GuestRoutes({ children }: Props): ReactElement {
  //   try {
  //     const user: User = JSON.parse(localStorage.getItem("user") ?? "");
  //     console.log(user);
  //     return children;
  //   } catch (error) {
  //     return <Navigate to={"/login"} replace />;
  //   }

  const user: User = JSON.parse(
    localStorage.getItem("user") ?? `{"error": "error"}`,
  );

  console.log(user);

  if (user?.name) {
    return <Navigate to={"/"} />;
  }

  return children;
}
