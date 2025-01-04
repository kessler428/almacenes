import { atom } from "recoil";

const topMenu = atom({
  key: "topMenu",
  default: {
    menu: [
      {
        icon: 'Users',
        pathname: "/users",
        title: "Usuarios",
      },
      {
        icon: "Box",
        pathname: "/awards",
        title: "Premios",
      },
      {
        icon: "Layout",
        pathname: "/stands",
        title: "Administradores de preguntas",
      },
      {
        icon: "Laptop",
        pathname: "/raffles",
        title: "Sorteo",
      },
    ],
  },
});

export { topMenu };
