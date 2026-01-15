import { Route } from "@src/typings/routes";
import { lazy } from "react";

const Routes: Route[] = [
  {
    component: lazy(() => import("@src/pages/home")),
    path: "/",
  },
  {
    component: lazy(() => import("@src/pages/memory")),
    path: "/memory",
  },
  {
    component: lazy(() => import("@src/pages/tictactoe")),
    path: "/tictactoe",
  },
];

export default Routes;
