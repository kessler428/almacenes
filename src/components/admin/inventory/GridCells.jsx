import React, { useState } from "react";

import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import {
  AiOutlineSend,
  AiOutlineExport,
  AiOutlineImport,
  AiOutlineDownload
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../../Modal";
import Swal from "sweetalert2";
import { ModalForm } from "../../ModalForm";
import { Input } from "../../Input";
import { Select2 } from "../../Select2";
import { fetchConToken } from "../../../helpers/fetch";

export const GridCells = ({
  id,
  location1,
  code,
  name,
  serial,
  unitMeasurement,
  stock,
  status,
  projects,
  loadProducts,
  setLoadProducts
}) => {
  const navigate = useNavigate();
  const { Access } = useSelector((state) => state.auth);
  const [modalForm, setModalForm] = useState(false);

  const [stockToSend, setStockToSend] = useState(0);
  const [projectId, setProjectId] = useState(0);
  const [stockToAdd, setStockToAdd] = useState(false);

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
        const resp = await fetchConToken(`products/${id}`, {}, "DELETE");
        if (resp.status === 200) {
          Swal.fire("Eliminado", "El producto ha sido eliminado", "success");
          setLoadProducts(!loadProducts);
        } else {
          Swal.fire("Error", "No se pudo eliminar el producto", "error");
        }
      }
    });
  };

  const handleSend = async () => {
    const resp = await fetchConToken(
      `products/send-product-to-project`,
      {
        productId: id,
        stock: Number(stockToSend),
        projectId: Number(projectId)
      },
      "POST"
    );
    if (resp.status === 200) {
      Swal.fire("Enviado", "El producto ha sido enviado", "success");
      setLoadProducts(!loadProducts);
      setModalForm(false);
    } else {
      Swal.fire("Error", "No se pudo enviar el producto", "error");
    }
  };

  const handleAddStock = async () => {
    const resp = await fetchConToken(
      `products/${id}`,
      {
        productId: id,
        stock: Number(stockToAdd)
      },
      "PATCH"
    );
    if (resp.status === 200) {
      Swal.fire("Éxito", "Stock agregado correctamente", "success");
      setLoadProducts(!loadProducts);
      setStockToAdd(false);
    } else {
      Swal.fire("Error", "No se pudo agregar el stock", "error");
    }
  };

  return (
    <>
      <div
        key={id}
        className={`hidden md:flex rounded-lg w-full py-3 pr-2 my-2 bg-white`}
      >
        <div className={`grid w-full pl-2 grid-cols-8`}>
          <div className="col-span-7 cursor-pointer">
            <div className="grid grid-cols-7">
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{location1}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{code}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{name}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{serial}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{unitMeasurement}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{stock}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">
                  {status === "active" ? "Activo" : "Inactivo"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-center items-center">
            <button
              onClick={() => setModalForm(true)}
              className="flex flex-row gap-1 items-center bg-principal text-white p-2 rounded-md"
            >
              <AiOutlineExport size={15} />
            </button>
            <Link
              to={`agregar/${id}`}
              className="flex flex-row gap-1 items-center bg-green-600 text-white p-2 rounded-md"
            >
              <RiPencilLine />
            </Link>
            <button
              onClick={handleDelete}
              className="flex flex-row gap-1 items-center bg-danger text-white p-2 rounded-md"
            >
              <RiDeleteBinLine />
            </button>
            <button
              onClick={() => setStockToAdd(true)}
              className="flex flex-row gap-1 items-center bg-principal text-white p-2 rounded-md"
            >
              <AiOutlineDownload size={15} />
            </button>
          </div>
        </div>
      </div>
      {modalForm && (
        <div className="bg-white p-6 w-full max-w-md">
          <ModalForm>
            <div className="bg-white p-6 w-full max-w-md">
              {/* Header */}
              <div className="flex items-center justify-between border-b pb-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  Gestión de Producto
                </h2>
              </div>

              {/* Form Fields */}
              <div className="mt-4 space-y-4">
                <p className="text-gray-700 font-medium">Producto: {name}</p>
                <Input
                  nameLabel="Salida de producto"
                  type="number"
                  value={stockToSend}
                  handleInputChange={(e) => setStockToSend(e.target.value)}
                />
                <Select2
                  nameLabel="Proyectos"
                  datos={projects}
                  value={projectId}
                  handleInputChange={(e) => setProjectId(e.target.value)}
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
                  onClick={() => setModalForm(false)}
                >
                  Cancelar
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                  onClick={handleSend}
                >
                  Agregar
                </button>
              </div>
            </div>
          </ModalForm>
        </div>
      )}
      {stockToAdd && (
        <ModalForm>
          <div className="bg-white p-6 w-full max-w-md">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Gestión de Producto
              </h2>
            </div>

            {/* Form Fields */}
            <div className="mt-4 space-y-4">
              <p className="text-gray-700 font-medium">Producto: {name}</p>
              <Input
                nameLabel="Agregar stock"
                type="number"
                value={stockToAdd}
                handleInputChange={(e) => setStockToAdd(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
                onClick={() => setStockToAdd(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                onClick={handleAddStock}
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
