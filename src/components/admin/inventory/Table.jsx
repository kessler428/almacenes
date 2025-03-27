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

const PRODUCTS_ADMIN_HEADERS = [
  {
    name: "Ubicación"
  },
  {
    name: "Codigo"
  },
  {
    name: "Nombre"
  },
  {
    name: "Categoria"
  },
  {
    name: "Unidad de medida"
  },
  {
    name: "Stock"
  },
  {
    name: "Estado"
  },
  {
    name: "Acciones"
  }
];

export const Table = () => {
  const { Access } = useSelector((state) => state.auth);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(TAMANIO_PAGINA_POR_DEFECTO);
  const [loadProducts, setLoadProducts] = useState(false);
  const [respStore, setRespStore] = useState(Access.store?.id || "");
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 0
  });

  const fetchInventory = async () => {
    setLoading(true);
    const resp = await fetchConToken(
      `products?page=${pageNumber}&size=${pageSize}&search=${filter}`
    );
    const body = await resp.json();
    setProducts(body.productsFilter);
    setPagination(body.paginationData);
    setLoading(false);
  };

  const fetchProjects = async () => {
    setLoading(true);
    const resp = await fetchConToken("projects?pagination=false");
    const body = await resp.json();
    setProjects(body.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    fetchInventory();
  }, [pageNumber, pageSize, loadProducts, respStore, filter]);

  const debouncedFilterProducts = useCallback(
    debounce((newFilter) => {
      setFilter(newFilter);
      fetchInventory();
    }, 1000),
    []
  );

  const handleFilterChange = (newFilter) => {
    debouncedFilterProducts(newFilter);
  };

  const renderProviders = products.map(
    (item) => (
      console.log(item),
      (
        <GridCells
          key={item.id}
          id={item.id}
          location1={item.location1}
          code={item.code}
          name={item.name}
          serial={item.serial}
          unitMeasurement={item.unitMeasurement}
          stock={item.stock}
          status={item.status}
          loadProducts={loadProducts}
          setLoadProducts={setLoadProducts}
          projects={projects}
        />
      )
    )
  );

  const pageCount = Math.ceil(pagination.totalItems / pageSize);

  return (
    <>
      <Header
        nombre="+ Crear productos"
        filtro={filter}
        setFiltro={handleFilterChange}
        pagination={pagination}
        showButton
        showFilter
        totalAfiliados={pagination.totalItems}
        numeroDePagina={pageNumber}
        tamanioDePagina={pageSize}
        respStore={respStore}
        urlXlsx={"reports"}
        setRespStore={setRespStore}
        isInventory
        dailyReport
      />
      {loading ? (
        <SpinnerLoading />
      ) : (
        <div className="AppPaginationTeacher">
          {products.length > 0 ? (
            <>
              <div className="py-4 w-full">
                <GridItemsHeader
                  params={PRODUCTS_ADMIN_HEADERS}
                  styleTable="grid-cols-8"
                />
                {renderProviders}
              </div>
              <div className="hidden md:flex mb-1 flex-row justify-between">
                <ReactPaginate
                  previousLabel="<"
                  nextLabel=">"
                  initialPage={pageNumber}
                  pageCount={pageCount}
                  onPageChange={({ selected }) => setPageNumber(selected)}
                  containerClassName="paginationBttns"
                  previousLinkClassName="previousBttn"
                  nextLinkClassName="nextBttn"
                  disabledClassName="paginationDisabled"
                  activeClassName="paginationActive"
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
