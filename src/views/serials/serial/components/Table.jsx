import React, { useCallback, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { GridCells } from "./GridCells";

import '../../../../components/stylePaginate.css'
import { fetchConToken } from "../../../../helpers/fetch";
import { debounce } from "../../../../utils/functions";
import { SpinnerLoading } from "../../../../components/SpinnerLoading";
import { TAMANIO_PAGINA_POR_DEFECTO } from "../../../../utils/constants";
import { Header } from "../../../../components/Header";
import { GridFooter } from "../../../../components/GridFooter";
import { GridItemsHeader } from "../../../../components/GridItemsHeader";

const paramsOfTable = [
  {
    name: "Identificador",
  },
  {
    name: "Ubicación",
  },
  {
    name: "Estado",
  },
  {
    name: "Acciones",
  },
]

export const Table = () => {

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(TAMANIO_PAGINA_POR_DEFECTO);

  const [providers, setProviders] = useState([]);
  const [getClient, setGetClient] = useState(false);

  const [filtro, setFiltro] = useState("");

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  });

  const getClients = async ({
    pageNumber = 0,
    pageSize,
    paramFiltro,
  }) => {
    setLoading(true);
    
    const resp = await fetchConToken(`serials?page=${pageNumber}&size=${pageSize}&search=${paramFiltro}`);
    const body = await resp.json();

    setProviders(body.catalogs);
    setPagination(body.paginationData);
    
    setLoading(false);
  };

  useEffect(() => {
    getClients({
      pageNumber,
      pageSize,
      paramFiltro: filtro,
    });
  }, [pageNumber, pageSize, getClient]);

  const filtrarAfiliados = useCallback(debounce((nuevoFiltro) => {
    getClients(nuevoFiltro);
  }, 1000), []);

  const manejarFiltro = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
    filtrarAfiliados({
      paramFiltro: nuevoFiltro,
      pageSize,
    });
  };

  const displayStage = providers?.map((item) => {
    return (
      <GridCells
        key={item.id}
        id={item.id}
        name={item.value}
        status={item.status}
        getClient={getClient}
        setGetClient={setGetClient}
      />
    );
  });

  const pageCount = Math.ceil(pagination.totalItems / pageSize);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <Header
        nombre="+ Nuevo Serial"
        filtro={filtro}
        setFiltro={manejarFiltro}
        pagination={pagination}
        showButton={true}
        showFilter={false}
        totalAfiliados={pagination.totalItems}
        numeroDePagina={pageNumber}
        tamanioDePagina={pageSize}
      />
      {loading ? (
        <SpinnerLoading />
      ) : (
        <div className="AppPaginationTeacher mt-8">
          {providers.length > 0 ? (
            <>
              <div className="py-4 w-full">
                <GridItemsHeader params={paramsOfTable} styleTable='grid-cols-4' />
                {displayStage}
              </div>
              <div className="mb-1 hidden md:flex flex-row justify-between">
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
            </>
          ) : (
            <div className="flex justify-center items-center h-80">
              <h1 className="text-2xl font-bold">No hay datos</h1>
            </div>
          )}
        </div>
      )}
    </>
  );
};
