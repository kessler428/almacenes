import { useRoutes } from "react-router-dom";

import SideMenu from "../layouts/side-menu/Main";
import { PrivateRoute } from "./PrivateRoute";
import { MODULOS } from "../utils/constants";

import Login from "../views/Login";
import Inicio from "../views/Inicio";
import NoAutorizado from "../views/NoAutorizado";
import NoEncontrado from "../views/NoEncontrado";
import {
  Inventory,
  AddInventory,
  ViewInventory,
  SendProducts
} from "../views/inventory";
import { LocationOne } from "../views/location_one/show_locations/LocationOne";
import { AddLocationOne } from "../views/location_one/add_location/AddLocationOne";
import { AddLocationTwo } from "../views/location_two/add_location/AddLocationTwo";
import { LocationTwo } from "../views/location_two/show_locations/LocationTwo";
import { AddCode } from "../views/codes/add_code/AddCode";
import { Codes } from "../views/codes/codes/Codes";
import { Serial } from "../views/serials/serial/Serial";
import { AddSerial } from "../views/serials/add_serial/AddSerial";
import { UnitMeasurements } from "../views/unit-measurements/unit_measurements/UnitMeasurements";
import { AddUnitMeasurements } from "../views/unit-measurements/add_unit_measurements/AddUnitMeasurements";
import { AddProject } from "../views/project/add_project/AddProject";
import { Project } from "../views/project/project/Project";

function Router() {
  const routes = [
    { path: "/", element: <Login /> },
    {
      path: "/admin",
      element: (
        <PrivateRoute>
          <SideMenu />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <PrivateRoute
              key={10 + Math.random() * 1000}
            >
              <Inicio />
            </PrivateRoute>
          ),
        },
        {
          path: "productos",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <Inventory />
            </PrivateRoute>
          ),
        },
        {
          path: "productos/ver/:id",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <ViewInventory />
            </PrivateRoute>
          ),
        },
        {
          path: "productos/agregar/:id",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <AddInventory />
            </PrivateRoute>
          ),
        },
        {
          path: "productos/enviar",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <SendProducts />
            </PrivateRoute>
          ),
        },
        {
          path: "ubicacion-uno",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <LocationOne />
            </PrivateRoute>
          ),
        },
        {
          path: "ubicacion-uno/agregar/:id",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <AddLocationOne />
            </PrivateRoute>
          ),
        },
        {
          path: "ubicacion-dos",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <LocationTwo />
            </PrivateRoute>
          ),
        },
        {
          path: "ubicacion-dos/agregar/:id",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <AddLocationTwo />
            </PrivateRoute>
          ),
        },
        {
          path: "codigos",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <Codes />
            </PrivateRoute>
          ),
        },
        {
          path: "codigos/agregar/:id",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <AddCode />
            </PrivateRoute>
          ),
        },
        {
          path: "serial",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <Serial />
            </PrivateRoute>
          ),
        },
        {
          path: "serial/agregar/:id",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <AddSerial />
            </PrivateRoute>
          ),
        },
        {
          path: "unidad-de-medida",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <UnitMeasurements />
            </PrivateRoute>
          ),
        },
        {
          path: "unidad-de-medida/agregar/:id",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <AddUnitMeasurements />
            </PrivateRoute>
          ),
        },
        {
          path: "proyecto",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <Project />
            </PrivateRoute>
          ),
        },
        {
          path: "proyecto/agregar/:id",
          element: (
            <PrivateRoute
              modulo={MODULOS.PRODUCTOS}
              key={10 + Math.random() * 1000}
            >
              <AddProject />
            </PrivateRoute>
          ),
        },
      ],
    },
    { path: "/no-autorizado", element: <NoAutorizado /> },
    { path: "*", element: <NoEncontrado /> },
  ];

  return useRoutes(routes);
}

export default Router;
