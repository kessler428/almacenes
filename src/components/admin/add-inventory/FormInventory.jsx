import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchConToken } from "../../../helpers/fetch";
import { Input } from "../../Input";
import { Select2 } from "../../Select2";
import { SpinnerLoading } from "../../SpinnerLoading";

const initialState = {
  location1Id: "",
  code: "",
  categoryId: "",

  unitMeasurementId: "",
  productName: "",

  stock: "",
  notifyMin: false,
  stockMin: "",

  costUnit: "",
  costIncludeTax: false,
  taxValueCost: "",

  priceCostUnit: "",
  priceIncludeTax: false,
  taxValuePrice: ""
};

export const FormInventory = ({ id, esNuevo }) => {
  const navigate = useNavigate();
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [lastProductId, setLastProductId] = useState(null);
  const [notifyMin, setNotifyMin] = useState(false);
  const [useConsecutive, setUseConsecutive] = useState(false);

  // Catálogos
  const [locationsOne, setLocationsOne] = useState([]);
  const [categories, setCategories] = useState([]);
  const [unitMeasurements, setUnitMeasurements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Petición 1: locations1
        const respLocations = await fetchConToken(
          "locations1?pagination=false"
        );
        const dataLocations = await respLocations.json();
        setLocationsOne(dataLocations.data);

        // Petición 2: categories
        const respCategories = await fetchConToken("serials?pagination=false");
        const dataCategories = await respCategories.json();
        setCategories(dataCategories.data);

        // Petición 3: unit-measurements
        const respUnitMeasurements = await fetchConToken(
          "unit-measurements?pagination=false"
        );
        const dataUnitMeasurements = await respUnitMeasurements.json();
        setUnitMeasurements(dataUnitMeasurements.data);

        // Obtener el último ID del producto si es nuevo
        if (esNuevo) {
          const respLast = await fetchConToken("products/last");
          const resultLast = await respLast.json();
          if (respLast.status === 200) {
            setLastProductId(resultLast.lastId);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [esNuevo]);

  const handleInputChange = ({ target }) => {
    setData((prev) => ({
      ...prev,
      [target.name]: target.type === "checkbox" ? target.checked : target.value
    }));
  };

  const handleToggleConsecutive = () => {
    setData((prev) => {
      const useConsecutive = !prev.useConsecutive;
      return {
        ...prev,
        useConsecutive,
        code: useConsecutive ? `#${lastProductId + 1}` : ""
      };
    });
    
    setUseConsecutive((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      // primera fila
      location1Id: Number(data.location1Id),
      code: data.code,
      serialId: Number(data.categoryId),
      // segunda fila
      unitMeasurementId: Number(data.unitMeasurementId),
      name: data.productName,
      // tercera fila
      stock: Number(data.stock),
      notifyMin: data.notifyMin,
      stockMin: Number(data.stockMin),

      // Información de costos
      costUnit: Number(data.costUnit),
      costIncludeTax: data.costIncludeTax,
      costTaxt: Number(data.taxValueCost),

      priceCostUnit: Number(data.priceCostUnit),
      priceIncludeTax: data.priceIncludeTax,
      priceTax: Number(data.taxValuePrice)
    };

    const url = esNuevo ? "products" : `products/${id}`;
    const method = esNuevo ? "POST" : "PUT";

    const resp = await fetchConToken(url, payload, method);
    setLoading(false);

    if (resp.status === 201 || resp.status === 200) {
      Swal.fire({
        title: "Éxito",
        text: `Se ha ${
          esNuevo ? "agregado" : "editado"
        } el producto exitosamente`,
        icon: "success"
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
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      {/* Primera Fila */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select2
          nameLabel="Ubicación 1"
          name="location1Id"
          value={data.location1Id}
          handleInputChange={handleInputChange}
          datos={locationsOne}
        />
        <div className="flex items-center gap-4">
          <Input
            nameLabel="Código"
            type="text"
            name="code"
            value={data.code}
            handleInputChange={handleInputChange}
            required={true}
            disabled={data.useConsecutive}
          />
          <div className="flex items-center gap-2 mt-7 aling-center">
            <input
              type="checkbox"
              checked={useConsecutive}
              onChange={handleToggleConsecutive}
              className="w-4 h-4"
            />
            <label>Consecutivo</label>
          </div>
        </div>
        <Select2
          nameLabel="Categoría"
          name="categoryId"
          value={data.categoryId}
          handleInputChange={handleInputChange}
          datos={categories}
        />
      </div>

      {/* Segunda Fila */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select2
          nameLabel="Unidad de Medida"
          name="unitMeasurementId"
          value={data.unitMeasurementId}
          handleInputChange={handleInputChange}
          datos={unitMeasurements}
        />
        <Input
          nameLabel="Nombre de Producto"
          type="text"
          name="productName"
          value={data.productName}
          handleInputChange={handleInputChange}
          required={true}
        />
      </div>

      {/* Tercera Fila */}
      <div className="grid grid-cols-1 gap-4 aling-center md:grid-cols-3">
        <Input
          nameLabel="Stock"
          type="number"
          name="stock"
          value={data.stock}
          handleInputChange={handleInputChange}
        />
        <div className="flex items-center gap-2 mt-7 aling-center">
          <input
            type="checkbox"
            name="notifyMin"
            checked={notifyMin}
            onChange={() => setNotifyMin((prev) => !prev)}
            className="w-4 h-4"
          />
          <label>Notificar mínimos</label>
        </div>
        {notifyMin && (
          <Input
            nameLabel="Stock Mínimo"
            type="number"
            name="stockMin"
            value={data.stockMin}
            className="col-span-2 w-full"
            handleInputChange={handleInputChange}
            disabled={!data.notifyMin}
          />
        )}
      </div>

      {/* Última Fila - Encerrada en un cuadro */}
      <div className="border border-gray-300 p-4 rounded-lg shadow-sm bg-gray-50">
        <h3 className="text-lg font-semibold mb-2">Información de Costos</h3>

        {/* Primera Fila */}
        <div className="grid grid-cols-1 gap-5 mb-4 md:grid-cols-2">
          <Input
            nameLabel="Costo Unitario"
            type="number"
            name="costUnit"
            value={data.costUnit}
            handleInputChange={handleInputChange}
          />
          <Input
            nameLabel="Valor Impuesto > Costo"
            type="number"
            name="taxValueCostUnit"
            value={data.taxValueCostUnit}
            handleInputChange={handleInputChange}
          />
        </div>

        {/* Segunda Fila */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Input
            nameLabel="Precio Costo Unitario"
            type="number"
            name="priceCostUnit"
            value={data.priceCostUnit}
            handleInputChange={handleInputChange}
          />
          <Input
            nameLabel="Valor Impuesto > Precio"
            type="number"
            name="taxValuePriceCostUnit"
            value={data.taxValuePriceCostUnit}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-end mt-6">
        <Link to={-1}>
          <button type="button" className="border py-2 px-4 rounded-md mr-4">
            Regresar
          </button>
        </Link>
        <button
          type="submit"
          className="bg-secundario text-white font-bold py-2 px-4 rounded-md"
        >
          {esNuevo ? "Agregar producto" : "Actualizar"}
        </button>
      </div>
    </form>
  );
};
