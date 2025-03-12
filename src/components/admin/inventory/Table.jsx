import React, { useCallback, useEffect, useState } from "react";
import { GridCells } from "./GridCells";
import ReactPaginate from "react-paginate";
import "../../stylePaginate.css";
import { GridFooter } from "../../GridFooter";
import { fetchConToken } from "../../../helpers/fetch";
import { Header } from "../../Header";
import { debounce } from "../../../utils/functions";
import { SpinnerLoading } from "../../SpinnerLoading";
import { TAMANIO_PAGINA_POR_DEFECTO } from "../../../utils/constants";
import { GridItemsHeader } from "../../GridItemsHeader";
import { useSelector } from "react-redux";

const productsAdmin = [
  {
    name: "Ubicación 1",
  },
  {
    name: "Ubicación 2",
  },
  {
    name: "Nombre",
  },
  {
    name: "Precio Unit",
  },
  {
    name: "Serial",
  },
  {
    name: "Stock",
  },
  {
    name: "Status",
  },
  {
    name: "Unidad de medida",
  },
  {
    name: "Acciones",
  },
];

export const Table = () => {
  const { Access } = useSelector((state) => state.auth);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(TAMANIO_PAGINA_POR_DEFECTO);
  const [loadProducts, setLoadProducts] = useState(false);
  const [respStore, setRespStore] = useState(Access.store ? Access.store.id : '');

  const [providers, setProviders] = useState([]);
  const [projects, setProjects] = useState([]);

  const [filtro, setFiltro] = useState("");

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0,
  });

  const getInventory = async ({ pageNumber = 0, pageSize, paramFiltro }) => {
    setLoading(true);

    const resp = await fetchConToken(
      `products?page=${pageNumber}&size=${pageSize}&search=${paramFiltro}`
    );
    const body = await resp.json();

    setProviders(body.data.rows);
    setPagination(body.paginationData);

    setLoading(false);
  };

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    setLoading(true);
    
    const resp = await fetchConToken(`projects?page=0&size=1000`);
    const body = await resp.json();

    setProjects(body.catalogs);
    
    setLoading(false);
  };


  useEffect(() => {
    getInventory({
      pageNumber,
      pageSize,
      paramFiltro: filtro,
    });
  }, [pageNumber, pageSize, loadProducts, respStore]);

  const filterProducts = useCallback(
    debounce((nuevoFiltro) => {
      getInventory(nuevoFiltro);
    }, 1000),
    []
  );

  const manejarFiltro = (nuevoFiltro) => {
    setFiltro(nuevoFiltro);
    filterProducts({
      paramFiltro: nuevoFiltro,
      pageSize,
    });
  };

  const displayStage = providers?.map((item) => {
    return (
      <GridCells
        key={item.id}
        id={item.id}
        location1={item.location1.value}
        location2={item.location2.value}
        name={item.name}
        priceUnit={item.priceUnit}
        serial={item.location2.value}
        status={item.status}
        stock={item.stock}
        unitMeasurement={item.unitMeasurement.value}
        loadProducts={loadProducts}
        setLoadProducts={setLoadProducts}
        projects={projects}
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
        nombre="producto"
        filtro={filtro}
        setFiltro={manejarFiltro}
        urlXlsx={`reports/inventory-excel${ respStore !== '' ? `?store=${respStore}` : '' }`}
        pagination={pagination}
        showButton={true}
        showFilter={true}
        totalAfiliados={pagination.totalItems}
        numeroDePagina={pageNumber}
        tamanioDePagina={pageSize}
        respStore={respStore}
        setRespStore={setRespStore}
        isInventory={true}
        dailyReport={true}
      />
      {loading ? (
        <SpinnerLoading />
      ) : (
        <div className="AppPaginationTeacher">
          {providers.length > 0 ? (
            <>
              <div className="py-4 w-full">
                <GridItemsHeader
                  params={productsAdmin}
                  styleTable="grid-cols-9"
                />
                {displayStage}
              </div>
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
