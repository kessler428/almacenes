import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../../helpers/fetch";
import { setLoginAuth, setToken } from "../../redux/slices/auth/authSlice";
import { SpinnerLoading } from "../../components/SpinnerLoading";

export const LoginForm = ({ setInicioDeSesion }) => {
  const dispatch = useDispatch();
  const [validarContrasenia, setValidarContrasenia] = useState(false);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [contrasenia, setNuevaContrasenia] = useState({
    nuevaContrasenia: "",
    confirmarContrasenia: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = login;

    if (!validarContrasenia) {
      const resp = await fetchSinToken(
        "auth/login",
        {
          email,
          password,
        },
        "POST"
      );

      const body = await resp.json();

      setLoading(false);

      if (resp.status === 200) {
        localStorage.setItem("token", body.token);

        dispatch(
          setLoginAuth({
            token: body.token,
            id: body.user.id,
            name: body.user.fullName,
            email: body.user.email,
            store: body.user.store,
            modulos: body.modules,
            actions: body.actions,
          })
        );

        if(body.user.id === 43){
          window.location = "/admin/productos";
        }else{
          window.location = "/admin";
        }
      } else {
        Swal.fire({
          title: "error",
          text: "Usuario o contraseña incorrecta",
          icon: "error",
        });
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
    >
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        {!validarContrasenia ? <>Ingresar</> : <>Nueva Contraseña</>}
      </h2>
      {validarContrasenia && (
        <p className="text-gray-400 mt-2">
          Ha iniciado sesión por primera vez. Ingrese una nueva contraseña
        </p>
      )}
      <div className="intro-x mt-8">
        {!validarContrasenia ? (
          <>
            <input
              type="text"
              className="intro-x login__input form-control py-3 px-4 block"
              placeholder="Correo"
              value={login.email}
              onChange={(e) => setLogin({ ...login, email: e.target.value })}
            />
            <input
              type="password"
              className="intro-x login__input form-control py-3 px-4 block mt-6"
              placeholder="Contraseña"
              value={login.password}
              onChange={(e) => setLogin({ ...login, password: e.target.value })}
            />
          </>
        ) : (
          <>
            <input
              type="password"
              className="intro-x login__input form-control py-3 px-4 block"
              placeholder="Nueva contraseña"
              value={contrasenia.nuevaContrasenia}
              onChange={(e) =>
                setNuevaContrasenia({
                  ...contrasenia,
                  nuevaContrasenia: e.target.value,
                })
              }
            />
            <input
              type="password"
              className="intro-x login__input form-control py-3 px-4 block mt-6"
              placeholder="Confirmar nueva contraseña"
              value={contrasenia.confirmarContrasenia}
              onChange={(e) =>
                setNuevaContrasenia({
                  ...contrasenia,
                  confirmarContrasenia: e.target.value,
                })
              }
            />
          </>
        )}
      </div>
      <div className="intro-x mt-6 text-center xl:text-left ">
        {loading && <SpinnerLoading />}
        <button
          type="submit"
          className="hover:bg-principal bg-[#293880] w-full py-3 rounded-lg text-white font-bold"
        >
          Ingresar
        </button>
      </div>
    </form>
  );
};
