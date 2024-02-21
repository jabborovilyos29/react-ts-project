import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import { RequireAuth } from "./RequireAuth";
import { GuestRoutes } from "./GuestRoutes";
import HomePage from "./HomePage";
import Posts from "./Posts";
import { DataTable } from "./DataTable";
import { PinInput } from "./PinInput/PinInput";
import { TestComponent } from "./PinInput/TestComponent";

export default function App() {
  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route element={<HomePage />}>
          <Route path="/" element={<DataTable />} />
          <Route path="posts" element={<Posts />} />
        </Route>
      </Route>
      <Route
        path="/login"
        element={
          <GuestRoutes>
            
          <TestComponent />
            {/* <Login /> */}
          </GuestRoutes>
        }
      />
      <Route path="*" element={<>Not found</>} />
    </Routes>
  );
}
