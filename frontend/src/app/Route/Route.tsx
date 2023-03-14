import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "../Page/Home";
import CustomDrawer from "../components/dashboard/drawer/drawer";
import ValueAddForm from "../components/common/form/valueAddForm/valueAddForm";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import SubDrawer from "../components/dashboard/drawer/subDrawer/SubDrawer";
import ContentBuilderPage from "../Page/ContentBuilderPage/ContentBuilderPage";
import ContentManagerPage from "../Page/ContentManagerPage/ContentManagerPage";
import { onError } from "apollo-link-error";
import CustomLoader from "../components/common/CustomLoader/CustomLoader";
import SignIn from "../Page/SignIn/SignIn";
import ForgetPassword from "../Page/ForgetPassword"
import NewPsw from "../Page/NewPsw";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import RoleRoute from "./RoleRoute";
import { AppBar, Button, Toolbar } from "@mui/material";
import UnAurhorizedPage from "../Page/UnAurhorizedPage/UnAurhorizedPage";
import TextEditor from "../Page/TextEditor/TextEditor";
import Test from "../Test";

function App() {
  const [qlnetworkError, setNetworkError] = useState(false);
  const navigate = useNavigate();
  const { access_token, userRole } = useSelector((state: any) => state.auth);
  useEffect(() => {
    const loaderElement = document.querySelector(".loader-container");
    loaderElement?.remove();
  }, []);
  const link = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) => console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`));

    if (networkError) setNetworkError(Boolean(networkError));
  });
  const theme = createTheme({
    palette: {
      primary: {
        main: "#000000",
        dark: "#ffffff",
        light: "#000000",
      },
    },
  });

  useEffect(() => {
    if (access_token) {
      if (userRole === "admin") return navigate("/dashboard", { replace: true });
      else return navigate("/userdashboard", { replace: true });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute allowedRoles={["admin"]} />}>
            <Route element={<CustomDrawer />}>
              <Route element={<SubDrawer />}>
                <Route path="/dashboard" element={<Home />} />
              </Route>
            </Route>
          </Route>
          <Route element={<RoleRoute allowedRoles={["user"]} />}>
            <Route element={<SubDrawer />}>
              <Route path="/userdashboard" element={<ContentManagerPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="/" element={!access_token && <SignIn />} />
        <Route path="/forgetpsw" element={<ForgetPassword />} />
        <Route path="/test" element={<Test />} />
        <Route path="/texteditor" element={<TextEditor />} />
        <Route path="/unauthorized" element={<UnAurhorizedPage />} />
        <Route path="/newpsw" element={<NewPsw />} />
      </Routes>
    </ThemeProvider>
  );
}
export default App;
