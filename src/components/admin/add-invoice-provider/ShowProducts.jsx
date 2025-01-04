import React from "react";
import { GridItemsHeader } from "../../GridItemsHeader";

export const ShowProducts = ({ listOfProducts, setListOfProducts }) => {
  return (
    <div className="mt-8">
      <div className="bg-gray-300 p-3 rounded-t-md">
        <h1 className="font-semibold text-md">Productos</h1>
      </div>
      <div className="bg-gray-50 p-3 rounded-b-md">
        <GridItemsHeader
          params={[
            { name: "Cantidad" },
            { name: "Nombre", colSpan: "col-span-2" },
            { name: "P. Compra" },
            { name: "P. Venta" },
            { name: "Subtotal" },
            { name: "Accion" },
          ]}
          styleTable="grid-cols-7"
        />
        <div className="mt-2">
          {listOfProducts.map(
            ({ name, amount, salePrice, purchasePrice, subTotal }) => (
              <div key={name} className="grid grid-cols-7 mt-2">
                <div className="flex justify-center items-center">
                  <p className="">{amount}</p>
                </div>
                <div className="flex justify-center items-center col-span-2">
                  <p className="">{name}</p>
                </div>
                <div className="flex justify-center items-center">
                  <p className="">
                    {Intl.NumberFormat("es-NI", {
                      style: "currency",
                      currency: "NIO",
                    }).format(purchasePrice)}
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <p className="">
                    {Intl.NumberFormat("es-NI", {
                      style: "currency",
                      currency: "NIO",
                    }).format(salePrice)}
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <p className="">
                    {Intl.NumberFormat("es-NI", {
                      style: "currency",
                      currency: "NIO",
                    }).format(subTotal)}
                  </p>
                </div>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => {
                      const newListOfProducts = listOfProducts.filter(
                        (product) => product.name !== name
                      );
                      setListOfProducts(newListOfProducts);
                    }}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-md"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
