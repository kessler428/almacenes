import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchConToken } from "../../../helpers/fetch";
import Swal from "sweetalert2";
import { Modal } from "../../Modal";

export const GridCells = ({
  id,
  name,
  isApproved,
  isOpened,
  storeId,
  date,
  totalOfProducts,
}) => {

  const navigate = useNavigate();

  const [showModal, setshowModal] = useState(false);
  const [inventory, setInventory] = useState(null);

  const approveInventory = async () => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "!Si, aprobar!",
      cancelButtonText: "!No, Cancelar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await fetchConToken(`inventories/${id}`,{},"PATCH");

        if (resp.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Aprobado",
            text: "El inventario ha sido aprobado",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error al aprobar el inventario",
          });
        }
      }
    });
  };

  return (
    <>
      <div
        key={id * Math.random()}
        className={`hidden md:flex rounded-lg w-full py-3 pr-2 my-2 bg-white`}
      >
        <div className={`grid w-full pl-2 grid-cols-6`}>
          <div className="grid justify-center items-center">
            <p className="text-center truncate">{id}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center truncate">{name}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center truncate">{totalOfProducts}</p>
          </div>
          {
            isApproved ? (
              <div
                className="text-green-600 font-bold py-1 px-2 w-full text-center rounded-md"
              >
                Aprobado
              </div>
            ) : (
              <div
                className="text-blue-600 font-bold py-1 px-2 w-full text-center rounded-md"
              >
                En proceso
              </div>
            )
          }
          <div className="grid justify-center items-center">
            <p className="text-center truncate">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
          <div className="grid justify-center items-center">
            <p className="flex gap-2 ">
              {
                isOpened && (
                  <button
                    className="bg-secundario text-white font-bold py-1 px-2 w-full md:w-28 rounded-md"
                    onClick={() => navigate(`/admin/inventario/agregar/${id}`)}
                  >
                    Editar
                  </button>
                )
              }
              {
                isApproved ? (
                  <button
                    className="bg-principal text-white font-bold py-1 px-2 w-full md:w-28 text-center rounded-md"
                    onClick={() => navigate(`/admin/inventario/reporte/${id}/${storeId}`)}
                  >
                    Ver reporte
                  </button>
                ) : (
                  <button
                    onClick={approveInventory}
                    className="bg-principal text-white font-bold py-1 px-2 w-full md:w-28 rounded-md"
                  >
                    Aprobar
                  </button>
                )
              }
            </p>
          </div>
        </div>
      </div>
      <div
        key={id * Math.random()}
        className={`md:hidden rounded-lg w-full py-3 pr-2 my-2 bg-white`}
      >
        <div className={`grid w-full px-4`}>
          <div className="flex flex-row justify-between items-center">
            <p className="font-semibold">Nombre:</p>
            <p className="text-center truncate">{name}</p>
          </div>
        </div>
      </div>
    </>
  );
};
