import { atom } from "recoil";

export const sideMenu = atom({
  key: "sideMenu",
  default: {
    menu: [
      {
        icon: 'Users',
        pathname: "/admin/users",
        title: "Usuarios",
      },
      {
        icon: "Box",
        pathname: "/admin/awards",
        title: "Premios",
      },
      {
        icon: "Layout",
        pathname: "/admin/stands",
        title: "Administradores de preguntas",
      },
      {
        icon: "Laptop",
        pathname: "/admin/raffles",
        title: "Sorteo",
      },
    ],
  },
});

export const sideMenuUser = atom({
  key: "sideMenuUser",
  default: {
    menu: [
      {
        icon: "Users",
        pathname: "/admin/afiliados",
        title: "Afiliados",
      },
      {
        icon: "Link",
        pathname: "/admin/referidos",
        title: "Referidos",
      },
    ],
  },
});
