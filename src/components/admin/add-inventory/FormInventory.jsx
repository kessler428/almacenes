import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchConToken } from "../../../helpers/fetch";
import { Input } from "../../Input";
import { Select2 } from "../../Select2";
import { SpinnerLoading } from "../../SpinnerLoading";

const initialState = {
  location1Id: '',
  location2Id: '',
  codeId: '',
  serialId: '',
  unitMeasurementId: '',
  productName: '',
  stock: '',
  priceUnit: '',
};

export const FormInventory = ({ id, esNuevo }) => {

  const navigate = useNavigate();

  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const [locationOne, setLocationOne] = useState([]);
  const [locationTwo, setlocationTwo] = useState([]);
  const [codes, setCodes] = useState([]);
  const [serials, setSerials] = useState([]);
  const [unitMeasurement, setUnitMeasurement] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProviders = async () => {
      const resp = await fetchConToken("locations1");
      const data = await resp.json();
      setLocationOne(data.catalogs);
      setLoading(false);
    };
    getProviders();
  }, []);

  useEffect(() => {
    const getProviders = async () => {
      const resp = await fetchConToken("locations2");
      const data = await resp.json();
      setlocationTwo(data.catalogs);
      setLoading(false);
    };
    getProviders();
  }, []);

  useEffect(() => {
    const getProviders = async () => {
      const resp = await fetchConToken("codes");
      const data = await resp.json();
      setCodes(data.catalogs);
      setLoading(false);
    };
    getProviders();
  }, []);

  useEffect(() => {
    const getProviders = async () => {
      const resp = await fetchConToken("serials");
      const data = await resp.json();
      setSerials(data.catalogs);
      setLoading(false);
    };
    getProviders();
  }, []);

  useEffect(() => {
    const getProviders = async () => {
      const resp = await fetchConToken("unit-measurements");
      const data = await resp.json();
      setUnitMeasurement(data.catalogs);
      setLoading(false);
    };
    getProviders();
  }, []);

  useEffect(() => {
    const getProviders = async () => {
      const resp = await fetchConToken("projects");
      const data = await resp.json();
      setProjects(data.catalogs);
      setLoading(false);
    };
    getProviders();
  }, []);

  useEffect(() => {
    if (!esNuevo) {
      const getProduct = async () => {
        const resp = await fetchConToken(`products/${id}`);
        const data = await resp.json();
        setLoading(false);

        console.log(data);

        setData({
          location1Id: data.product.location1.id,
          location2Id: data.product.location2.id,
          codeId: data.product.code.id,
          serialId: data.product.serial.id,
          unitMeasurementId: data.product.unitMeasurement.id,
          productName: data.product.name,
          stock: data.product.stock,
          priceUnit: data.product.priceUnit
        });
      };

      getProduct();
    }
  }, []);

  const handleInputChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      location1Id: Number(data.location1Id),
      location2Id: Number(data.location2Id),
      codeId: Number(data.codeId),
      serialId: Number(data.serialId),
      unitMeasurementId: Number(data.unitMeasurementId),
      name: data.productName,
      stock: Number(data.stock),
      priceUnit: Number(data.priceUnit),
    };

    const url = esNuevo ? "products" : `products/${id}`;
    const method = esNuevo ? "POST" : "PUT";

    const resp = await fetchConToken(url, payload, method);

    setLoading(false);

    if (resp.status === 201 || resp.status === 200) {
      Swal.fire({
        title: "Exito",
        text: `Se ha ${esNuevo ? 'agregado' : 'editado'} el producto exitosamente`,
        icon: "success",

      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/admin/productos");
        }
      }); 
    } else {
      Swal.fire("Error", "Ha ocurrido un error.", "error");
    }
  };

  return loading ? (
    <SpinnerLoading />
  ) : (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md mt-4">
      <Select2
        nameLabel="Ubicación 1"
        name="location1Id"
        value={data.location1Id}
        handleInputChange={handleInputChange}
        datos={locationOne}
      />
      <Select2
        nameLabel="Ubicación 2"
        name="location2Id"
        value={data.location2Id}
        handleInputChange={handleInputChange}
        datos={locationTwo}
      />
      <Select2
        nameLabel="Código"
        name="codeId"
        value={data.codeId}
        handleInputChange={handleInputChange}
        datos={codes}
      />
      <Select2
        nameLabel="Serial"
        name="serialId"
        value={data.serialId}
        handleInputChange={handleInputChange}
        datos={serials}
      />
      <Select2
        nameLabel="Unidad de medida"
        name="unitMeasurementId"
        value={data.unitMeasurementId}
        handleInputChange={handleInputChange}
        datos={unitMeasurement}
      />
      <Input
        nameLabel="Nombre"
        type="text"
        name="productName"
        value={data.productName}
        handleInputChange={handleInputChange}
        required={true}
      />
      <Input
        nameLabel="Stock"
        type="text"
        name="stock"
        value={data.stock}
        handleInputChange={handleInputChange}
        required={false}
      />
      <Input
        nameLabel="Precio unitario"
        type="text"
        name="priceUnit"
        value={data.priceUnit}
        handleInputChange={handleInputChange}
        required={false}
      />
      <div className="flex justify-end">
        <Link to={-1}>
          <button
            type="button"
            className="border py-2 px-4 rounded-md mt-4 mr-4"
          >
            Regresar
          </button>
        </Link>
        <button
          type="submit"
          className="bg-secundario text-white font-bold py-2 px-4 rounded-md mt-4"
        >
          {esNuevo ? "Agregar" : "Actualizar"}
        </button>
      </div>
    </form>
  );
};
