import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ForgotPassword from "./components/pages/backend/access/ForgotPassword";
import Login from "./components/pages/backend/access/DeveloperLogin";
import SetPassword from "./components/pages/backend/access/SetPassword";
import Order from "./components/pages/frontend/Order";
import Welcome from "./components/pages/frontend/Welcome";
import { StoreProvider } from "./components/store/storeContext";
import { routeAdmin } from "./routes/routesAdmin";
import { routeDeveloper } from "./routes/RoutesDeveloper";
import DeveloperCreatePassword from "./components/pages/backend/access/create-password/DeveloperCreatePassword";
import DeveloperLogin from "./components/pages/backend/access/DeveloperLogin";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            <Route index element={<Welcome />} />
            <Route path="/order" element={<Order />} />

            {routeAdmin.map((item, key) => {
              return (
                <Route path={item.route} key={key} element={item.element} />
              );
            })}
            {routeDeveloper.map((item, key) => {
              return (
                <Route path={item.route} key={key} element={item.element} />
              );
            })}
            {/* <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/settings" element={<Settings />} />
            <Route path="/settings/role" element={<Role/>} />
            <Route path="/admin/settings/developer" element={<Settings />} />
            <Route path="/admin/settings/admin" element={<Settings />} />
            <Route path="/admin/advertisement" element={<Advertisement />} />
            <Route path="/admin/foods" element={<Food />} />
            <Route path="/admin/category" element={<Category />} /> */}
            <Route
              path="/developer/create-password"
              element={<DeveloperCreatePassword />}
            />
            <Route path="/developer/login" element={<DeveloperLogin/>} />

            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/set-password" element={<SetPassword />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
