import React, { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import { Title, Select2, SpinnerLoading, DatePickerCP } from "../../components";
import { fetchConToken } from "../../helpers/fetch";

export const SendProducts = () => {
  const [products, setProducts] = useState({
    id: 0,
    stock: 0,
    codigoUno: "",
    productName: "",
    currentStock: 0
  });

  const [data, setData] = useState([]);
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(false);
  const [stores, setStores] = useState([]);
  const [store, setStore] = useState("");
  const [loading, setLoading] = useState(true);

  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const resp = await fetchConToken(`products/all`);
      const data = await resp.json();
      setProductos(data.products);
      setLoading(false);
    };

    getProducts();
  }, []);

  const handleInputChange = (e) => {
    setProducts({
      ...products,
      [e.target.name]: e.target.value
    });
  };

  const options = productos?.map((item) => {
    return {
      value: `${item.id}`,
      label: `${item.name} / ${item.code1}`,
      nombre: `${item.name}`,
      codigo: `${item.code1}`
    };
  });

  const handleProductChange = async (e) => {
    const resp = await fetchConToken(`products/${e.value}`);
    const body = await resp.json();

    const { product } = body;

    setProducts({
      ...products,
      id: product.id,
      productName: product.name,
      codigoUno: product.code1,
      currentStock: product.inventories[0].stock
    });
  };

  const addProducts = (products) => {
    
    // Validar que no se agreguen numeros nnegativos
    if (products.stock < 0) {
      Swal.fire("Error", "No puedes enviar cantidades negativas", "error");
      return;
    }

    const productExist = data.find(item => item.id === products.id);
    if(productExist){
      Swal.fire('Ooops.!', 'El producto ya se encuentra en la lista', 'warning');
      return
    }

    if (products.stock > products.currentStock) {
      Swal.fire(
        "Error",
        "No puedes enviar más productos de los que tienes",
        "error"
      );
      return;
    }

    if (products.stock !== "" && products.id !== "") {
      setData([...data, products]);
      setError(false);
    } else {
      setError(true);
    }
  };

  const deleteProduct = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
    setProductos(newData);
  };

  const sendProducts = async () => {
    setLoading(true);
    const products = [];

    data.forEach((item) => {
      products.push({
        productId: Number(item.id),
        stock: Number(item.stock)
      });
    });

    const dataToSend = {
      storeId: store,
      products
    };

    const resp = await fetchConToken("products/send", dataToSend, "POST");

    setLoading(false);

    if (resp.ok) {
      Swal.fire("Éxito", "Productos enviados correctamente", "success");
      setData([]);
    } else {
      Swal.fire("Error", "Ocurrió un error al enviar los productos", "error");
    }
  };

  useEffect(() => {
    const getStores = async () => {
      const resp = await fetchConToken("stores");
      const body = await resp.json();

      const options = body.data.map((store) => {
        return {
          id: store.id,
          value: store.name
        };
      });

      const stores = options.filter((store) => store.id !== 1);
      setStores(stores);
    };
    getStores();
  }, []);

  const getProductsToSend = async () => {

    if(store === ""){
      Swal.fire("Error", "Por favor, seleccione una tienda", "error");
      return;
    }

    const dateStartSend = dateStart.toISOString().split("T")[0];
    const dateEndSend = dateEnd.toISOString().split("T")[0];

    const resp = await fetchConToken(`reports/products-amount?startDate=${dateStartSend}&endDate=${dateEndSend}&storeId=${store}`);
    const body = await resp.json();
    
    if(resp.status === 200){
      Swal.fire({
        title: '¿Estas seguro?',
        text: `Se agregaran ${body.data.length} productos a la lista`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      }).then(async (result) => {
        if (result.isConfirmed) {
          
          const products = body.data.map((item) => {
            return {
              id: item.id,
              stock: item.amountSold,
              codigoUno: item.code1,
              productName: item.name,
              currentStock: item.amountSold + 1
            }
          });

          setData(products);
          setError(false);

        }
      })
    } else {
      Swal.fire(error, body.msg, "error");
    }

  };

  return loading ? (
    <SpinnerLoading />
  ) : (
    <>
      <Title title="Enviar productos" />
      <div className="mt-4 bg-white p-8 rounded-xl">
        <div className="flex gap-6 justify-end items-end">
          <div className="w-full">
            <Select2
              nameLabel="Seleccionar una tienda"
              name="store"
              value={store}
              handleInputChange={(e) => setStore(e.target.value)}
              datos={stores}
            /> 
          </div>
          <div className="flex flex-col pt-4 w-full">
            <label>Seleccionar un rango de fechas</label>
            <DatePickerCP
              startDate={dateStart}
              setStartDate={setDateStart}
              finalDate={dateEnd}
              setFinalDate={setDateEnd}
              agregarAnios={true}
              minDate={new Date() - 1000 * 60 * 60 * 24 * 365 * 5}
            />
          </div>
          <button
            className="bg-principal text-white font-bold px-12 rounded-lg h-[40px]"
            onClick={() => getProductsToSend()}
          >
            Agregar
          </button>
        </div>
        <div className="flex flex-col md:flex-row gap-6 items-end mt-4">
          <div className="w-full">
            <label className="flex flex-col">
              Seleccione un producto
              <Select
                value={products.productName.label}
                options={options}
                onChange={handleProductChange}
              />
            </label>
          </div>
          <div className="w-full md:w-1/5">
            <label className="flex flex-col">
              Cant. disponible
              <input
                type="number"
                className="border-2 rounded-lg p-2 h-[38px]"
                value={products.currentStock}
                disabled
                readOnly
              />
            </label>
          </div>
          <div className="w-full md:w-1/5">
            <label className="flex flex-col">
              Unidades
              <input
                type="number"
                name="stock"
                value={products.stock}
                onChange={handleInputChange}
                className="border-2 rounded-lg p-2 h-[38px]"
                onWheel={(e) => e.target.blur()}
              />
            </label>
          </div>
          <div className="mt-2 justify-end flex">
            <button
              onClick={() => addProducts(products)}
              className="bg-principal text-white font-bold h-[38px] px-4 rounded-lg w-full md:w-40 "
            >
              Agregar
            </button>
          </div>
        </div>
        {error && (
          <div className="mb-1 text-center mt-4">
            <p className="text-red-600 font-bold">
              Por favor, complete todos los campos
            </p>
          </div>
        )}
        <div className="mt-6">
          {data.length > 0 && (
            <>
              <div className="border-2 rounded-xl p-2">
                <div className="hidden md:flex flex-row gap-4 mb-4 text-lg font-bold">
                  <div className="w-1/4 text-center">
                    <p>Unidades</p>
                  </div>
                  <div className="w-1/4 text-center">
                    <p>Producto</p>
                  </div>
                  <div className="w-1/4 text-center">
                    <p>Codigo</p>
                  </div>
                  <div className="w-1/4 text-center">
                    <p>Accion</p>
                  </div>
                </div>
                {data.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row gap-4 p-2"
                  >
                    <div className="md:w-1/4 text-sm text-center flex justify-between md:justify-center">
                      <p className="font-semibold md:hidden">Cantidad:</p>
                      <p>{item.stock}</p>
                    </div>
                    <div className="md:w-1/4 text-sm text-center flex justify-between md:justify-center">
                      <p className="font-semibold md:hidden">Nombre:</p>
                      <p>{item.productName}</p>
                    </div>
                    <div className="md:w-1/4 text-sm text-center flex justify-between md:justify-center">
                      <p className="font-semibold md:hidden">Codigo:</p>
                      <p>{item.codigoUno}</p>
                    </div>
                    <div className="w-full md:w-1/4 text-sm text-center">
                      <button
                        onClick={() => deleteProduct(item.id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 w-full md:w-28 rounded-md"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-end mt-10 gap-8">
                <button
                  onClick={sendProducts}
                  className="bg-principal text-white font-bold px-10 rounded-lg h-[38px]"
                >
                  Enviar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
