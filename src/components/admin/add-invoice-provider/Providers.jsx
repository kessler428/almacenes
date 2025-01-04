import React, { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { fetchConToken } from "../../../helpers/fetch";
import { Input } from "../../Input";
import { ModalForm } from "../../ModalForm";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  company: "",
};

export const Providers = ({ provider, setProvider, setLoading }) => {

  const [data, setData] = useState(initialState);
  const [providers, setProviders] = useState([]);
  const [modal, setModal] = useState(false);

  const [obtenerClientes, setObtenerClientes] = useState(false);

  const getProviders = async () => {
    setLoading(true);

    const resp = await fetchConToken(`providers/catalog`);
    const body = await resp.json();

    setProviders(body.providers);
    setLoading(false);
  };

  useEffect(() => {
    getProviders();
  }, [obtenerClientes]);

  const options = providers?.map((item) => {
    return { value: `${item.id}`, label: `${item.name} / ${item.company}` };
  });

  const handleInputChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModal(false);
    setLoading(true);

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      company: data.company,
    };

    const resp = await fetchConToken("providers", payload, "POST");

    setLoading(false);

    if (resp.ok) {
      Swal.fire({
        title: "Exito",
        text: "El proveedor ha sido agregado",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          setData(initialState);
          setModal(false);
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "No se pudo agregar el proveedor",
        icon: "error",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Aceptar",
      });
    }

    setObtenerClientes(!obtenerClientes);
  };

  return (
    <>
      <label className="font-semibold">Seleccione un proveedor</label>
      <div className="flex flex-col md:flex-row justify-between gap-2 mt-2">
        <div className="w-full ">
          <Select
            value={provider}
            options={options}
            onChange={(e) => setProvider(e)}
            placeholder="Seleccione un proveedor"
          />
        </div>
        <button
          className="md:w-40 bg-principal rounded-md text-white mt-2 md:mt-0 py-2"
          onClick={() => setModal(true)}
        >
          + Nuevo proveedor
        </button>
      </div>
      {modal && (
        <ModalForm>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-md mt-4"
          >
            <Input
              nameLabel="Nombre *"
              type="text"
              name="name"
              value={data.name}
              handleInputChange={handleInputChange}
              required
            />
            <Input
              nameLabel="Correo Electronico"
              type="email"
              name="email"
              value={data.email}
              handleInputChange={handleInputChange}
            />
            <Input
              nameLabel="Telefono"
              type="text"
              name="phone"
              value={data.phone}
              handleInputChange={handleInputChange}
            />
            <Input
              nameLabel="Direccion"
              type="text"
              name="address"
              value={data.address}
              handleInputChange={handleInputChange}
              required
            />
            <Input
              nameLabel="Empresa *"
              type="text"
              name="company"
              value={data.company}
              handleInputChange={handleInputChange}
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="bg-principal text-white font-bold py-2 px-4 rounded-md mt-4"
                onClick={() => {
                  setModal(false);
                  setData(initialState);
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-secundario text-white font-bold py-2 px-4 rounded-md mt-4"
              >
                Agregar
              </button>
            </div>
          </form>
        </ModalForm>
      )}
    </>
  );
};
