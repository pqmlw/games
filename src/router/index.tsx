import customHistory from "@src/lib/utils/history";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import routes from "./routes/index";
import CustomRouter from "@src/components/routes/CustomRouter";
import Fallback from "@src/components/progress/Fallback";
import LoginGuard from "@src/components/routes/LoginGuard";
import AuthGuard from "@src/components/routes/AuthGuard";
import NotFound from "@src/components/routes/NotFound";

const Router: React.FC = () => {
  return (
    <CustomRouter history={customHistory}>
      <Routes>
        {routes.map(({ component: Component, path, withAuth }) => {
          if (withAuth) {
            return (
              <Route
                key={path}
                path={path}
                element={
                  <Suspense fallback={<Fallback />}>
                    <LoginGuard>
                      <Component />
                    </LoginGuard>
                  </Suspense>
                }
              />
            );
          }
          return (
            <Route
              key={path}
              element={
                <AuthGuard>
                  <Component />
                </AuthGuard>
              }
              path={path}
            />
          );
        })}
        {/* Catch all route for 404 */}
        <Route
          path="*"
          element={
            <Suspense fallback={<Fallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </CustomRouter>
  );
};
export default Router;
