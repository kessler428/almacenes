import React from "react";
import moment from "moment/moment";

import { RiDeleteBinLine, RiEyeFill, RiPencilLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchConToken } from "../../../../helpers/fetch";

export const GridCells = ({
  id,
  name,
  status,
  getClient,
  setGetClient,
}) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await fetchConToken(`projects/${id}`, {}, "PATCH");
        if (resp.status === 200) {
          Swal.fire(
            "Éxito",
            status === 1 ? "Proyecto desactivado" : "Proyecto activado",
            "success"
          );
          setGetClient(!getClient);
        } else {
          Swal.fire("Error", "No se pudo eliminar el proyecto", "error");
        }
      }
    });
  };

  return (
    <>
      <div
        key={id * Math.random()}
        className="hidden md:block bg-white rounded-lg w-full py-3 pr-2 my-2"
      >
        <div className="grid grid-cols-4 w-full">
          <div
            onClick={() => navigate(`ver/${id}`)}
            className="grid cursor-pointer col-span-3"
          >
            <div className="grid grid-cols-3 w-full">
              <div className="grid justify-center items-center">
                <p className="text-center">{id}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center">{name}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className={`${status === 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {status === 1 ? 'Activo' : 'Inactivo'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <Link
              to={`agregar/${id}`}
              className="flex flex-row gap-1 items-center"
            >
              <RiPencilLine />
              <span>Editar</span>
            </Link>
            <button
              className="flex flex-row gap-1 text-danger items-center"
              onClick={handleDelete}
            >
              <RiDeleteBinLine className={`${status === 1 ? 'text-red-600' : 'text-green-600'}`} />
              <span className={`${status === 1 ? 'text-red-600' : 'text-green-600'}`}>
                {
                  status === 1 ? 'Desactivar' : 'Activar'
                }
              </span>
            </button>
          </div>
        </div>
      </div>
      <div
        key={id * Math.random()}
        className="md:hidden bg-white rounded-lg w-full p-4 my-2"
      >
        <div className="flex flex-row justify-between gap-4">
          <p>ID:</p>
          <p className="text-center">{id}</p>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <p>Ubicación:</p>
          <p className="text-center">{name}</p>
        </div>
        <div className="flex flex-row justify-between gap-4">
          <p>Estado:</p>
          <p className="text-center">{status}</p>
        </div>
        <div className="flex flex-row justify-between gap-4">
            <p>Acciones:</p>
            <div className="flex flex-row gap-2 justify-center items-center">
              <button
                onClick={() => navigate(`ver/${id}`)}
                className="flex flex-row gap-1 items-center text-blue-600"
              >
                <RiEyeFill />
                Ver
              </button>
              <Link
                to={`agregar/${id}`}
                className="flex flex-row gap-1 items-center"
              >
                <RiPencilLine />
                <span>Editar</span>
              </Link>
              <button
                className="flex flex-row gap-1 text-danger items-center"
                onClick={handleDelete}
              >
                <RiDeleteBinLine />
                <span>Eliminar</span>
              </button>
            </div>
          </div>
      </div>
    </>
  );
};
