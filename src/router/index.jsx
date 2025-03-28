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
import { AddLocationTwo } from "../views/history/add_location/AddLocationTwo";
import { AddCode } from "../views/codes/add_code/AddCode";
import { Codes } from "../views/codes/codes/Codes";
import { Serial } from "../views/serials/serial/Serial";
import { AddSerial } from "../views/serials/add_serial/AddSerial";
import { UnitMeasurements } from "../views/unit-measurements/unit_measurements/UnitMeasurements";
import { AddUnitMeasurements } from "../views/unit-measurements/add_unit_measurements/AddUnitMeasurements";
import { AddProject } from "../views/project/add_project/AddProject";
import { Project } from "../views/project/project/Project";
import { History } from "../views/history/table/History";
import { HistoryStock } from "../views/history-stock/table/HistoryStock";

function Router() {
  // Configuración de las rutas dentro de /admin
  const adminRoutesConfig = [
    { path: "", component: <Inicio /> },
    { path: "productos", component: <Inventory />, modulo: MODULOS.PRODUCTOS },
    {
      path: "productos/ver/:id",
      component: <ViewInventory />,
      modulo: MODULOS.PRODUCTOS
    },
    {
      path: "productos/agregar/:id",
      component: <AddInventory />,
      modulo: MODULOS.PRODUCTOS
    },
    {
      path: "productos/enviar",
      component: <SendProducts />,
      modulo: MODULOS.PRODUCTOS
    },
    {
      path: "ubicacion-uno",
      component: <LocationOne />,
      modulo: MODULOS.PRODUCTOS
    },
    {
      path: "ubicacion-uno/agregar/:id",
      component: <AddLocationOne />,
      modulo: MODULOS.PRODUCTOS
    },
    {
      path: "ubicacion-dos/agregar/:id",
      component: <AddLocationTwo />,
      modulo: MODULOS.PRODUCTOS
    },
    { path: "codigos", component: <Codes />, modulo: MODULOS.PRODUCTOS },
    {
      path: "codigos/agregar/:id",
      component: <AddCode />,
      modulo: MODULOS.PRODUCTOS
    },
    { path: "serial", component: <Serial />, modulo: MODULOS.PRODUCTOS },
    {
      path: "serial/agregar/:id",
      component: <AddSerial />,
      modulo: MODULOS.PRODUCTOS
    },
    {
      path: "unidad-de-medida",
      component: <UnitMeasurements />,
      modulo: MODULOS.PRODUCTOS
    },
    {
      path: "unidad-de-medida/agregar/:id",
      component: <AddUnitMeasurements />,
      modulo: MODULOS.PRODUCTOS
    },
    { path: "proyecto", component: <Project />, modulo: MODULOS.PRODUCTOS },
    {
      path: "proyecto/agregar/:id",
      component: <AddProject />,
      modulo: MODULOS.PRODUCTOS
    },
    {
      path: "historial",
      component: <History />
    },
    {
      path: "stock",
      component: <HistoryStock />
    }
  ];

  // Mapeo de la configuración para generar los hijos de /admin
  const adminRoutes = adminRoutesConfig.map((route, index) => {
    const { path, component, modulo } = route;
    return {
      path,
      element: (
        <PrivateRoute key={index} {...(modulo ? { modulo } : {})}>
          {component}
        </PrivateRoute>
      )
    };
  });

  // Definición global de las rutas
  const routes = [
    { path: "/", element: <Login /> },
    {
      path: "/admin",
      element: (
        <PrivateRoute>
          <SideMenu />
        </PrivateRoute>
      ),
      children: adminRoutes
    },
    { path: "/no-autorizado", element: <NoAutorizado /> },
    { path: "*", element: <NoEncontrado /> }
  ];

  return useRoutes(routes);
}

export default Router;
