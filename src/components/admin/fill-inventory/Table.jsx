import React, { useCallback, useEffect, useState } from "react";
import { GridCells } from "./GridCells";
import ReactPaginate from "react-paginate";
import "../../stylePaginate.css";
import { GridFooter } from "../../GridFooter";
import { fetchConToken } from "../../../helpers/fetch";
import { ModalForm, Select2, SpinnerLoading } from "../../../components";
import { TAMANIO_PAGINA_POR_DEFECTO } from "../../../utils/constants";
import { GridItemsHeader } from "../../GridItemsHeader";
import { useSelector } from "react-redux";
import { GridSearchBar } from "../../GridSearchBar";
import { Modal } from "../../Modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const productsAdmin = [
  {
    name: "ID",
  },
  {
    name: "Tienda",
  },
  {
    name: "Productos modificados",
  },
  {
    name: "Estado",
  },
  {
    name: "Fecha",
  },
  {
    name: "Acciones",
  },
];

export const Table = () => {

  const navigate = useNavigate();

  const [modal, setModal] = useState(false);

  const [store, setStore] = useState("");
  const [stores, setStores] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(TAMANIO_PAGINA_POR_DEFECTO);

  const [providers, setProviders] = useState([]);

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
      `inventories?page=${pageNumber}&size=${pageSize}&search=${paramFiltro}`
    );
    const body = await resp.json();

    setProviders(body.data);
    setPagination(body.paginationData);

    setLoading(false);
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

      setStores(options);
    };
    getStores();
  }, []);

  const loadNewInventory = async () => {
    const resp = await fetchConToken(
      'inventories',
      {
        storeId: store,
      },
      'POST'
    );
    const body = await resp.json();

    if (resp.status === 201) {
      navigate(`/admin/inventario/agregar/${body.data.id}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al crear el inventario",
      });
    }
  }

  useEffect(() => {
    getInventory({
      pageNumber,
      pageSize,
      paramFiltro: filtro,
    });
  }, [pageNumber, pageSize]);


  const displayStage = providers?.map((item) => {
    return (
      <GridCells
        key={item.id}
        id={item.id}
        name={item.store.name}
        isApproved={item.approved}
        isOpened={item.opened}
        storeId={item.storeId}
        date={item.createdAt}
        totalOfProducts={item.productsCount}
      />
    );
  });

  const pageCount = Math.ceil(pagination.totalItems / pageSize);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className={`w-full flex flex-col md:flex-row justify-between items-center mt-4`} >
        <div className="flex gap-4">
          <button
            onClick={() => setModal(!modal)}
            className="bg-secundario px-4 py-2 rounded-md text-white font-medium"
          >
            Modificar inventario
          </button>
        </div>
        <div
          className={`flex flex-col md:flex-row gap-4 justify-end w-full md:w-auto`}
        >
          <GridSearchBar filtro={filtro} setFiltro={setFiltro} />
        </div>
      </div>
      {loading ? (
        <SpinnerLoading />
      ) : (
        <div className="AppPaginationTeacher">
          {providers.length > 0 ? (
            <>
              <div className="py-4 w-full">
                <GridItemsHeader
                  params={productsAdmin}
                  styleTable="grid-cols-6"
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
      {modal && (
        <ModalForm>
          <div className="flex flex-col p-8 bg-white">
            <div className="w-full">
              <Select2
                nameLabel="Seleccionar una tienda"
                name="store"
                value={store}
                handleInputChange={(e) => setStore(e.target.value)}
                datos={stores}
              />
            </div>

            <div className="mt-6 gap-2 flex justify-end">
              <button
                onClick={() => setModal(!modal)}
                className="bg-secundario text-white font-bold py-1.5 px-4 rounded-lg w-full md:w-40 "
              >
                Cancelar
              </button>
              <button
                className="bg-principal text-white font-bold py1.5 px-4 rounded-lg w-full md:w-40 "
                onClick={loadNewInventory}
              >
                Modificar
              </button>
            </div>
          </div>
        </ModalForm>
      )}
    </>
  );
};
