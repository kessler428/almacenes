import { fetchConToken, fetchSinToken } from "../../../helpers/fetch";
import { setLoginAuth, setLogout } from "./authSlice";
import Swal from "sweetalert2";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      let resp = await fetchSinToken(
        "usuarios/login",
        {
          email,
          password,
        },
        "POST"
      );

      const body = await resp.json();

      if (resp.status === 200) {
        localStorage.setItem("token", body.token);

        dispatch(
          setLoginAuth({
            id: body.id,
            name: body.nombre,
            email: body.email,
            token: body.token,
            modulos: body.modulos,
          })
        );

        window.location = "/admin";
      } else {
        Swal.fire({
          title: "error",
          text: "Usuario o contraseña incorrecta",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = (token) => {
  return async (dispacth) => {
    /*const resp = await fetchConToken(
      "auth/logout",
      {
        token,
      },
      "PUT"
    );*/
    localStorage.clear();
    dispacth(setLogout());
  };
};
