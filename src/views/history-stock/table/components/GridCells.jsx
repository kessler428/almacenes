import React from "react";
import moment from "moment/moment";
import { Link, useNavigate } from "react-router-dom";

export const GridCells = ({ id, name, code, stock, createdAt }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        key={id * Math.random()}
        className="hidden md:block bg-white rounded-lg w-full py-3 pr-2 my-2"
      >
        <div className="grid grid-cols-5 w-full">
          <div className="grid justify-center items-center">
            <p className="text-center">{id}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{name}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{code}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{stock}</p>
          </div>

          <div className="grid justify-center items-center">
            <p className="text-center">
              {moment(createdAt).format("DD/MM/YYYY HH:mm:ss")}
            </p>
          </div>
        </div>
      </div>
      {/* <div
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
      </div> */}
    </>
  );
};
