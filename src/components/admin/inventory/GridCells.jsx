import React, { useState } from "react";

import { RiDeleteBinLine, RiEyeLine, RiPencilLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../../Modal";
import Swal from "sweetalert2";
import { ModalForm } from "../../ModalForm";
import { Input } from "../../Input";
import { fetchConToken } from "../../../helpers/fetch";

export const GridCells = ({
  id,
  location1,
  location2,
  name,
  priceUnit,
  serial,
  status,
  stock,
  unitMeasurement,
  loadProducts,
  setLoadProducts
}) => {
  const navigate = useNavigate();
  const { Access } = useSelector((state) => state.auth);
  const [modal, setModal] = useState(false);
  const [modalForm, setModalForm] = useState(false);

  const goToSee = () => {
    if (Access.store !== null) return;
    navigate(`ver/${id}`);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await fetchConToken(`products/${id}`, {}, "PATCH");
        if (resp.status === 200) {
          Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
          setLoadProducts(!loadProducts);
        } else {
          Swal.fire("Error", "No se pudo eliminar el producto", "error");
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
        <div className={`grid w-full pl-2 grid-cols-9`}>
          <div onClick={goToSee} className="col-span-8 cursor-pointer">
            <div className="grid grid-cols-8">
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{location1}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{location2}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{name}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{priceUnit}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{serial}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{stock}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{status}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{unitMeasurement}</p>
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
              onClick={handleDelete}
              className="flex flex-row gap-1 text-danger items-center"
            >
              <RiDeleteBinLine />
              <span>Eliminar</span>
            </button>
          </div>
        </div>
      </div>
      {modal && (
        <Modal setModal={setModal}>
          <div className="bg-white p-4">
            <p className="my-4 text-xl">Producto: {name}</p>
            <div className="flex flex-col md:flex-row pb-4 gap-6 justify-between">
              {inventories.map((inventory) => (
                <div
                  key={inventory.id}
                  className="flex flex-col w-full md:w-1/4 border-2 justify-center items-center p-4 rounded-md"
                >
                  <p className="font-semibold">{inventory.store.name}</p>
                  <p>Cantidad: {inventory.stock}</p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
      {modalForm && (
        <ModalForm>
          <div className="bg-white p-4">
            <div className="flex flex-row justify-between">
              <p className="my-4 md:text-xl">Producto: {name}</p>
              <button
                onClick={() => setModalForm(false)}
                className=" text-red-600 text-xl font-bold"
              >
                X
              </button>
            </div>
            <Input
              nameLabel="Agregar Stock"
              type="number"
              value={stock}
              handleInputChange={(e) => setStock(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-600 text-white p-2 rounded-md"
                onClick={addStock}
              >
                Agregar
              </button>
            </div>
          </div>
        </ModalForm>
      )}
    </>
  );
};
