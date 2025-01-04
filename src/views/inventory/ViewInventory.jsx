import React,{ useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SpinnerLoading } from '../../components/SpinnerLoading';
import { Title } from '../../components/Title'
import { fetchConToken } from '../../helpers/fetch';

export const ViewInventory = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      const resp = await fetchConToken(`products/${id}`);
      const data = await resp.json();
      setProduct(data.product);
      setLoading(false);
    };
    getProduct();
  }, [id])

  return loading ? <SpinnerLoading /> : (
    <>
      <Title title="Ver Producto" />
      <div className="bg-white p-4 mt-4 rounded-lg">
        <div className="flex flex-col">
          <label>Producto</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={product.name}
            disabled
          />
        </div>
        <div className="flex flex-col mt-4">
          <label>Código 1</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={product.code1}
            disabled
          />
        </div>
        <div className="flex flex-col mt-4">
          <label>Código 2</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={product.code2 || 'No tiene código 2'}
            disabled
          />
        </div>
        <div className="flex flex-col mt-4">
          <label>Modelo o presentación</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={product.modelOrPresentation}
            disabled
          />
        </div>
        <div className="flex flex-col mt-4">
          <label>Marca</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={product.brand}
            disabled
          />
        </div>
        <div className="flex flex-col mt-4">
          <label>Precio de compra</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={product.priceBought}
            disabled
          />
        </div>
        <div className="flex flex-col mt-4">
          <label>Precio de venta</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={product.priceSold}
            disabled
          />
        </div>
        <div className="flex flex-col mt-4">
          <label>Cantidad minima</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={product.stockMin}
            disabled
          />
        </div>
        <div className="flex flex-col mt-4">
          <label>Proveedor</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={product.provider.company}
            disabled
          />
        </div>
        {
          product.inventories.map((inventory, index) => (
            <div key={index} className="flex flex-col mt-4">
              <label>Tienda {index + 1}</label>
              <input    
                type="text"
                className="border border-gray-300 rounded-md p-2"
                value={inventory.stock}
                disabled
              />
            </div>
          ))
        }
        <div className="flex flex-col mt-4">
          <label>Comentario</label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2"
            value={product.comment || 'No tiene comentario'}
            disabled
          />
        </div>
        <div className='mt-4 flex justify-end'>
          <button
            className='btn bg-secundario text-white'
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
        </div>
      </div>
    </>
  )
}