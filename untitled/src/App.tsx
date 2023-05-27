import React, {createContext, useState} from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import { routes1 as appRoutes1 } from "./routes";
import { loginRoute as appRoutes2 } from "./routes";
import Layout from "./components/Layout/Layout";
import AuthStore from "./stores/AuthStore";
import RegisterStore from "./stores/RegistrerStore";
import {IAppStore} from "./interface/appStore";
import UserStore from "./stores/UserStore";



const store: IAppStore = {
  'authStore':  new AuthStore(),
  'registerStore': new RegisterStore(),
  'userStore': new UserStore()
}
export const AppStoreContext = createContext(store);

function App() {
  // define theme
  const theme = createTheme({
    palette: {
      primary: {
        light: "#8561c5",
        main: "#673ab7",
        dark: "#482880",
        contrastText: "#000",
      },
      secondary: {
        main: "#3d5afe",
        light: "#637bfe",
        dark: "#2a3eb1",
        contrastText: "#000",
      },
    },
  });

  const [appStore, setAppStore] = useState(store);

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppStoreContext.Provider value={appStore}>
            <Layout>
              <Routes>
                {appRoutes.map((route) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={<route.component />}
                    />
                ))}
                {appRoutes1.map((route) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={<route.component />}
                    />
                ))}
                {appRoutes2.map((route) => (
                    <Route
                        key={route.key}
                        path={route.path}
                        element={<route.component />}
                    />
                ))}
              </Routes>
            </Layout>
          </AppStoreContext.Provider>
        </Router>
      </ThemeProvider>
  );
}

export default App;