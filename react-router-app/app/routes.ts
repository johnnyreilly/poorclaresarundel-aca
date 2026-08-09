import {
  type RouteConfig,
  //   route,
  index,
  //   layout,
  //   prefix,
} from "@react-router/dev/routes";
import mainRoutes from "./main/routes";

export default [
  index("./Home.tsx"),
  ...mainRoutes,
  //   route("about", "./about.tsx"),

  //   layout("./auth/layout.tsx", [
  //     route("login", "./auth/login.tsx"),
  //     route("register", "./auth/register.tsx"),
  //   ]),

  //   ...prefix("concerts", [
  //     index("./concerts/home.tsx"),
  //     route(":city", "./concerts/city.tsx"),
  //     route("trending", "./concerts/trending.tsx"),
  //   ]),
] satisfies RouteConfig;
