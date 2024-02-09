import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import { RequireAuth } from "./RequireAuth";
import Posts from "./Posts";
import { GuestRoutes } from "./GuestRoutes";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Posts />
          </RequireAuth>
        }
      ></Route>
      <Route
        path="/login"
        element={
          <GuestRoutes>
            <Login />
          </GuestRoutes>
        }
      />
      <Route path="*" element={<>Not found</>} />
    </Routes>
  );
}
