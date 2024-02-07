import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface User {
  name: string;
  password: string;
}

// interface ErrorObj {
//   error: string;
// }

export function RequireAuth({ children }: any): ReactElement {
  //   try {
  //     const user: User = JSON.parse(localStorage.getItem("user") ?? "");
  //     console.log(user);
  //     return children;
  //   } catch (error) {
  //     return <Navigate to={"/login"} replace />;
  //   }

  const user: User | any = JSON.parse(
    localStorage.getItem("user") ?? `{"error": "error"}`,
  );

  console.log(user);

  if (user?.error) {
    return <Navigate to={"/login"} replace />;
  }

  return children;
}
