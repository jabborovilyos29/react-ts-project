import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import { RequireAuth } from "./RequireAuth";
import { GuestRoutes } from "./GuestRoutes";
import HomePage from "./HomePage";
import Posts from "./Posts";
import { CellNavigation } from "./Table";

export default function App() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<HomePage />}>
          <Route path="/" element={<CellNavigation />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Route>
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
