import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import SignIn from "./views/Auth/SignIn";
import Category from "./views/Category";
import Service from "./views/Service";
import Vendor from "./views/Vendor";
import Vehicle from "./views/Vehicle";
import Orders from "./views/Orders";
import Location from "./views/Location";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/login" />
  },
  {
    path: "/category",
    layout: DefaultLayout,
    component: Category
  },
  {
    path: "/service",
    layout: DefaultLayout,
    component: Service
  },
  {
    path: "/vendor",
    layout: DefaultLayout,
    component: Vendor
  },
  {
    path: "/vehicle",
    layout: DefaultLayout,
    component: Vehicle
  },
  {
    path: "/orders",
    layout: DefaultLayout,
    component: Orders
  },
  {
    path: "/location",
    layout: DefaultLayout,
    component: Location
  },
  {
    path: "/login",
    layout: DefaultLayout,
    component: SignIn
  }
];
