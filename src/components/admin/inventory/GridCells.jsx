import React, { useState } from "react";

import { RiDeleteBinLine, RiPencilLine } from "react-icons/ri";
import {
  AiOutlineSend,
  AiOutlineExport,
  AiOutlineImport,
  AiOutlineDownload,
  AiFillApi,
  AiOutlineApi
} from "react-icons/ai";
import * as Tooltip from "@radix-ui/react-tooltip";
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
  stockMin,
  notifyMin,
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
          Swal.fire("Inactivado", "El producto ha sido inactivado", "success");
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

  const handleAvaliableStock = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres activar el producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, activar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const resp = await fetchConToken(
          `products/active/${id}`,
          {
            status: "active"
          },
          "PATCH"
        );
        if (resp.status === 200) {
          Swal.fire("Activado", "El producto ha sido activado", "success");
          setLoadProducts(!loadProducts);
        } else {
          Swal.fire("Error", "No se pudo activar el producto", "error");
        }
      }
    });
  };

  return (
    <>
      <div
        key={id}
        className={`hidden md:flex rounded-lg w-full py-3 pr-2 my-2 bg-white`}
      >
        <div className={`grid w-full pl-2 grid-cols-8`}>
          <div className="col-span-7 cursor-pointer">
            <div
              // className="grid grid-cols-7"
              className={
                `grid grid-cols-7 ` +
                (notifyMin && stock < stockMin ? "text-red-600 font-bold" : "")
              }
            >
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{code}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{location1}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{serial}</p>
              </div>
              <div className="grid justify-center items-center">
                <p className="text-center truncate">{name}</p>
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
            {status === "active" ? (
              <Tooltip.Provider>
                {/* Botón de Exportar */}
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => setModalForm(true)}
                      className="flex flex-row gap-1 items-center bg-blue-500 text-white p-2 rounded-md"
                    >
                      <AiOutlineExport size={15} />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      className="bg-black text-white px-2 py-1 text-xs rounded-md"
                    >
                      Salidas de productos
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>

                {/* Botón de Añadir Stock */}
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => setStockToAdd(true)}
                      className="flex flex-row gap-1 items-center bg-green-500 text-white p-2 rounded-md"
                    >
                      <AiOutlineDownload size={15} />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      className="bg-black text-white px-2 py-1 text-xs rounded-md"
                    >
                      Añadir stock
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>

                {/* Botón de Editar Producto */}
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <Link
                      to={`agregar/${id}`}
                      className="flex flex-row gap-1 items-center bg-yellow-500 text-white p-2 rounded-md"
                    >
                      <RiPencilLine />
                    </Link>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      className="bg-black text-white px-2 py-1 text-xs rounded-md"
                    >
                      Editar producto
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>

                {/* Botón de Eliminar/Inactivar Producto */}
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={handleDelete}
                      className="flex flex-row gap-1 items-center bg-red-500 text-white p-2 rounded-md"
                    >
                      <RiDeleteBinLine />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      className="bg-black text-white px-2 py-1 text-xs rounded-md"
                    >
                      Inactivar producto
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            ) : (
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => handleAvaliableStock(true)}
                      className="flex flex-row gap-1 items-center bg-principal text-white p-2 rounded-md"
                    >
                      {/* Activar producto */}
                      <AiFillApi size={15} />
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      side="top"
                      className="bg-black text-white px-2 py-1 text-xs rounded-md"
                    >
                      Activar producto
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            )}
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
                  Enviar
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
      <div key={id} className={`md:hidden bg-white rounded-lg w-full p-4 my-2`}>
        <div className={stock < stockMin ? "text-red-600 font-bold" : ""}>
          <div className="flex flex-row justify-between gap-4">
            <p>Codigo:</p>
            <p className="text-center">{code}</p>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <p>Ubicacion:</p>
            <p className="text-center">{location1}</p>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <p>Categoria:</p>
            <p className="text-center">{serial}</p>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <p>Nombre:</p>
            <p className="text-center">{name}</p>
          </div>
          <div className="flex flex-row justify-between gap-4">
            <p>Unidad de medida:</p>
            <p className="text-center">{unitMeasurement}</p>
          </div>
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
      </div>
    </>
  );
};
