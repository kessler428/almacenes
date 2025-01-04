import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { fetchConToken } from "../../../helpers/fetch";
import { Input } from "../../Input";
import { ModalForm } from "../../ModalForm";
import { Select2 } from "../../Select2";


const initialState = {
  code1: "",
  code2: "",
  name: "",
  modelOrPresentation: "",
  brand: "",
  priceSold: "",
  priceBought: "",
  stockMin: "",
  stock: "",
  comment: "",
  providerId: "",
};

export const AddProductToCart = ({
  setLoading,
  listOfProducts,
  setListOfProducts,
}) => {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(initialState);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState(initialState);

  const [upgradeData, setUpgradeData] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const resp = await fetchConToken("products");
      const body = await resp.json();

      setProducts(body.products);
    };
    getProducts();
  }, [upgradeData]);

  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const getProviders = async () => {
      const resp = await fetchConToken("providers/catalog");
      const data = await resp.json();
      setProviders(data.providers);
      setLoading(false);
    };
    getProviders();
  }, []);

  const options = products?.map((item) => {
    return {
      value: `${item.id}`,
      label: `${item.name} / ${item.modelOrPresentation} / ${item.brand}`,
    };
  });

  const handleProductChange = async (e) => {
    setLoading(true);
    const resp = await fetchConToken(`products/${e.value}`);
    const body = await resp.json();

    setLoading(false);

    const { product } = body;

    if (resp.ok) {
      setProduct({
        id: product.id,
        name: product.name,
        amount: 0,
        purchasePrice: product.priceBought,
        salePrice: product.priceSold,
        subTotal: 0,
      });
    }
  };

  const handleInputChange = ({ target }) => {
    setProduct({
      ...product,
      [target.name]: target.value,
    });
  };

  const addProduct = () => {

    if(product.amount < 0) {
      Swal.fire("Error", "La cantidad no puede ser menor a 0", "error");
      return;
    }

    if ( product.amount === 0 || product.salePrice === 0 || product.purchasePrice === 0 || product.name === "") {
      Swal.fire("Error", "Completar todos los campos", "error");
      return;
    }

    const productExist = listOfProducts.find((item) => item.name === product.name);

    if (productExist) {
      Swal.fire("Ooop.!", "El producto ya se encuentra en la lista", "warning");
      return;
    }

    if (Number(product.purchasePrice) > Number(product.salePrice)) {
      Swal.fire(
        "Ooop.!",
        "El precio de compra no puede ser mayor al precio de venta",
        "warning"
      );
      return;
    }

    setListOfProducts([...listOfProducts, product]);
    setProduct(initialState);
  };

  useEffect(() => {
    if (product.amount === undefined) return;
    setProduct({
      ...product,
      subTotal: Number(product.amount) * Number(product.purchasePrice),
    });
  }, [product.amount, product.salePrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(Number(data.priceSold) < Number(data.priceBought)) {
      Swal.fire("Error", "El precio de venta no puede ser menor al precio de compra", "error");
      return;
    }
    
    setModal(false);
    setLoading(true);

    const payload = {
      code1: data.code1,
      code2: data.code2,
      name: data.name,
      modelOrPresentation: data.modelOrPresentation,
      brand: data.brand,
      priceSold: Number(data.priceSold),
      priceBought: Number(data.priceBought),
      stockMin: Number(data.stockMin),
      stock: Number(data.stock),
      comment: data.comment,
      providerId: Number(data.providerId),
    };

    const resp = await fetchConToken("products", payload, "POST");

    setLoading(false);
    setUpgradeData(!upgradeData);

    if (resp.ok) {
      Swal.fire({
        title: "Exito",
        text: `Se ha agregado el producto exitosamente`,
        icon: "success",
      }) 
    } else {
      Swal.fire("Error", "Ha ocurrido un error.", "error");
    }
  };

  return (
    <>
      <div className="mt-4">
        <label className="font-semibold">Seleccione un producto</label>
        <div className="flex flex-col md:flex-row gap-4 mt-2">
          <div className="flex flex-col w-full">
            <label>Productos</label>
            <Select
              className="rounded-md w-full cursor-pointer"
              options={options}
              isSearchable="true"
              onChange={handleProductChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Cantidad</label>
            <input
              min={0}
              type="number"
              name="amount"
              className="w-full md:w-36 rounded-md h-[38px] border-gray-400"
              value={product.amount}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Precio de compra</label>
            <input
              min={0}
              type="number"
              name="purchasePrice"
              value={product.purchasePrice}
              className="w-full md:w-36 rounded-md h-[38px] border-gray-400"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col">
            <label>SubTotal</label>
            <input
              min={0}
              type="number"
              value={product.subTotal}
              className="w-full md:w-36 rounded-md h-[38px] border-gray-400 outline-none focus:ring-0 focus:ring-offset-0"
              readOnly
            />
          </div>
          <div className="flex flex-col">
            <label>Precio de venta</label>
            <input
              min={0}
              type="number"
              name="salePrice"
              value={product.salePrice}
              className="w-full md:w-36 rounded-md h-[38px] border-gray-400"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-3 space-x-2">
          <button
            className="bg-secundario px-4 py-2 rounded-md text-white"
            onClick={() => setModal(true)}
          >
            Crear producto
          </button>
          <button
            className="bg-principal px-4 py-2 rounded-md text-white"
            onClick={addProduct}
          >
            Agregar
          </button>
        </div>
      </div>
      {modal && (
        <ModalForm>
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded-md mt-4"
          >
            <Input
              nameLabel="Nombre"
              type="text"
              name="name"
              value={data.name}
              handleInputChange={(e) => setData({ ...data, name: e.target.value })}
              required={true}
            />
            <Input
              nameLabel="Codigo 1"
              type="text"
              name="code1"
              value={data.code1}
              handleInputChange={(e) => setData({ ...data, code1: e.target.value })}
              required={true}
            />
            <Input
              nameLabel="Codigo 2"
              type="text"
              name="code2"
              value={data.code2}
              handleInputChange={(e) => setData({ ...data, code2: e.target.value })}
              required={false}
            />
            <Input
              nameLabel="Marca"
              type="text"
              name="brand"
              value={data.brand}
              handleInputChange={(e) => setData({ ...data, brand: e.target.value })}
              required={false}
            />
            <Input
              nameLabel="Modelo / Descripcion"
              type="text"
              name="modelOrPresentation"
              value={data.modelOrPresentation}
              handleInputChange={(e) => setData({ ...data, modelOrPresentation: e.target.value })}
              required={false}
            />
            <Select2
              nameLabel="Proveedor"
              name="providerId"
              value={data.providerId}
              handleInputChange={(e) => setData({ ...data, providerId: e.target.value })}
              datos={providers}
            />
            <Input
              nameLabel="Precio de compra"
              type="number"
              name="priceBought"
              value={data.priceBought}
              handleInputChange={(e) => setData({ ...data, priceBought: e.target.value })}
              required={true}
            />
            <Input
              nameLabel="Precio de venta"
              type="number"
              name="priceSold"
              value={data.priceSold}
              handleInputChange={(e) => setData({ ...data, priceSold: e.target.value })}
              required={true}
            />
            <Input
              nameLabel="Stock"
              type="number"
              name="stock"
              value={data.stock}
              handleInputChange={(e) => setData({ ...data, stock: e.target.value })}
              required={true}
            />
            <Input
              nameLabel="Stock minimo"
              type="number"
              name="stockMin"
              value={data.stockMin}
              handleInputChange={(e) => setData({ ...data, stockMin: e.target.value })}
              required={true}
            />
            <Input
              nameLabel="Comentario"
              type="text"
              name="comment"
              value={data.comment}
              handleInputChange={(e) => setData({ ...data, comment: e.target.value })}
              required={false}
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
