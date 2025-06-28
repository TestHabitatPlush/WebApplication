import "./App.css";
import { Routes, Route } from "react-router-dom";
import TokenLoginScreen from "./views/auth/TokenLoginScreen";
import { useSelector } from "react-redux";
import DashBoard from "./views/dashboard/DashBoard";
import { useEffect } from "react";
import AuthHandler from "./handlers/AuthHandler";
import PageNotFound from "./views/404/PageNotFound";

function App() {
  const user = useSelector((state) => state.auth.user);
  // console.log(user);

  const { setIntitalReduxState } = AuthHandler();

  useEffect(() => {
    setIntitalReduxState();
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/signin/:token" element={<TokenLoginScreen />} />
        <Route path="/*" element={user && <DashBoard user={user} />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
