import { atom } from "recoil";

const simpleMenu = atom({
  key: "simpleMenu",
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

export { simpleMenu };
