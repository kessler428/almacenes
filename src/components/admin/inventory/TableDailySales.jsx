import React, { useCallback, useEffect, useState } from "react";
import { GridItemsHeader } from "../../GridItemsHeader";
import { useSelector } from "react-redux";
import { TAMANIO_PAGINA_POR_DEFECTO } from "../../../utils/constants";
import ReactPaginate from "react-paginate";
import { GridFooter } from "../../GridFooter";
import { RiCheckDoubleLine, RiCloseLine } from "react-icons/ri";

const paramsOfTable = [
  {
    name: "Producto ID"
  },
  {
    name: "Producto"
  },
  {
    name: "Fecha de venta"
  },
  {
    name: "Cant. vendida"
  },
  {
    name: "Fecha de ingreso"
  },
  {
    name: "Cant. ingresada"
  },
  {
    name: "Estado"
  }
];

export const TableDailySales = ({
  pageNumber,
  setPageNumber,
  pageSize,
  setPageSize,
  pagination,
  reportData
}) => {
  const displayStage = reportData?.dailyDataSales?.map((item) => {
    return (
      <GridCells
        key={item.id}
        id={item.id}
        productId={item.productId}
        productName={item.productName}
        quantitySold={item.quantitySold}
        dateSold={item.dateSold}
        quantityInStock={item.quantityInStock}
        dateInStock={item.dateInStock}
        status={item.status}
      />
    );
  });

  const pageCount = Math.ceil(pagination.totalItems / pageSize);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="AppPaginationTeacher mt-8">
      <div className="py-4 w-full">
        <GridItemsHeader params={paramsOfTable} styleTable="grid-cols-7" />
        {displayStage}

        <div className="hidden md:flex mb-1 flex-row justify-between">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            initialPage={pageNumber}
            breakLabel={"..."}
            marginPagesDisplayed={3}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
          <GridFooter pageSize={pageSize} setPageSize={setPageSize} />
        </div>
      </div>
    </div>
  );
};

const GridCells = ({
  key,
  id,
  productId,
  productName,
  quantitySold,
  dateSold,
  quantityInStock,
  dateInStock,
  status
}) => {
  const [loading, setLoading] = useState(false);

  return loading ? (
    <SpinnerLoading />
  ) : (
    <>
      <div
        key={id * Math.random()}
        className="hidden md:block bg-white rounded-lg w-full py-3 pr-2 my-2"
      >
        <div className="grid grid-cols-7 w-full">
          <div className="grid justify-center items-center">
            <p className="text-center">#00{productId}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{productName}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{dateSold}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{quantitySold}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{dateInStock}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{quantityInStock}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">
              {status === "OK" ? (
                <RiCheckDoubleLine size="25" color="green" />
              ) : (
                <RiCloseLine size="25" color="red" />
              )}
            </p>
          </div>
        </div>
      </div>
      {/* // Div de mobile */}
      <div
        key={id * Math.random()}
        className="md:hidden bg-white rounded-lg w-full p-4 my-2"
      >
        <div className="grid grid-cols-2 w-full">
          <div className="grid justify-center items-center">
            <p className="text-center">#00{productId}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{productName}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{dateSold}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{quantitySold}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{dateInStock}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">{quantityInStock}</p>
          </div>
          <div className="grid justify-center items-center">
            <p className="text-center">
              {status === "OK" ? (
                <RiCheckDoubleLine size="25" color="green" />
              ) : (
                <RiCloseLine size="25" color="red" />
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}