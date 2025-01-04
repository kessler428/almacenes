import React from "react";
import { useState } from "react";
import { fetchConToken } from "../../helpers/fetch";
import { SpinnerLoading } from "../../components/SpinnerLoading";
import Swal from "sweetalert2";

export const ReestablecerContraseña = ({ setInicioDeSesion }) => {
  const [correo, setCorreo] = useState("");
  const [data, setData] = useState({
    codigo: "",
    contraseña: "",
    confirmarContraseña: "",
  });
  const [loading, setLoading] = useState(false);

  const [reestablecerContraseña, setReestablecerContraseña] = useState(false);
  const [validarContraseña, setValidarContraseña] = useState(false);

  const enviarCorreo = async () => {
    setLoading(true);
    const resp = await fetchConToken(
      "usuarios/restaurar-contrasenia/iniciar",
      { email: correo },
      "POST"
    );

    if (resp.status === 200) {
      setReestablecerContraseña(true);
    }
    else {
      const body = await resp.json();
      Swal.fire('Error', body.error.message, 'error');
    }
    setLoading(false);
  };

  const enviarNuevaContraseña = async () => {
    setLoading(true);
    if (data.contraseña !== data.confirmarContraseña) {
      setValidarContraseña(true);
    } else {
      setValidarContraseña(false);
      const resp = await fetchConToken(
        "usuarios/restaurar-contrasenia/finalizar",
        {
          email: correo,
          confirmacionContrasenia: data.confirmarContraseña,
          contrasenia: data.contraseña,
          codigoRecuperacion: Number(data.codigo),
        },
        "PUT"
      );
      if (resp.status === 200) {
        setInicioDeSesion(1);
      }
    }
    setLoading(false);
  };

  return (
    <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
      <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
        Restablecer Contraseña
      </h2>
      {!reestablecerContraseña ? (
        <div className="intro-x mt-8">
          <input
            type="text"
            className="intro-x login__input form-control py-3 px-4 block"
            placeholder="Correo"
            onChange={(e) => setCorreo(e.target.value)}
            value={correo}
          />
        </div>
      ) : (
        <>
          <div className="intro-x mt-6">
            <input
              type="text"
              className="intro-x login__input form-control py-3 px-4 block"
              placeholder="Código de recuperación"
              onChange={(e) => setData({ ...data, codigo: e.target.value })}
              value={data.codigo}
            />
          </div>
          <div className="intro-x mt-4">
            <input
              type="password"
              className="intro-x login__input form-control py-3 px-4 block"
              placeholder="Escribe tu nueva contraseña"
              onChange={(e) => setData({ ...data, contraseña: e.target.value })}
              value={data.contraseña}
            />
          </div>
          <div className="intro-x mt-4">
            <input
              type="password"
              className="intro-x login__input form-control py-3 px-4 block"
              placeholder="Confirma tu nueva contraseña"
              onChange={(e) =>
                setData({ ...data, confirmarContraseña: e.target.value })
              }
              value={data.confirmarContraseña}
            />
          </div>
          {validarContraseña && (
            <div className="intro-x mt-4">
              <p className="text-red-500">Las contraseñas no coinciden</p>
            </div>
          )}
        </>
      )}
      <div className="mt-4 flex justify-end">
        <button type="button" onClick={() => setInicioDeSesion(1)}>
          ¿Recordó su contraseña?
        </button>
      </div>
      <div className="intro-x mt-6 text-center xl:text-left ">
        {loading && <SpinnerLoading />}
        <button
          onClick={
            !reestablecerContraseña ? enviarCorreo : enviarNuevaContraseña
          }
          className="hover:bg-principal bg-[#68B3B8] w-full py-3 rounded-lg text-white font-bold"
        >
          Enviar
        </button>
      </div>
    </div>
  );
};
