import React, { useState } from "react";
import { Filtros } from "./Filtros";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { GridSearchBar } from "./GridSearchBar";
import { RiFileExcel2Fill, RiBook3Line } from "react-icons/ri";
import { fetchConToken } from "../helpers/fetch";
import { ImportExcelModal } from "./ImportExcelModal";

export const Header = ({
  totalAfiliados,
  numeroDePagina,
  tamanioDePagina,
  filtro,
  setFiltro,
  nombre,
  showButton,
  showFilter,
  urlXlsx,
  respStore,
  setRespStore,
  importXlsx
}) => {
  const { Access } = useSelector((state) => state.auth);
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Función para descargar el archivo Excel
  const downloadFile = async () => {
    if (!urlXlsx) return;

    const response = await fetchConToken(urlXlsx);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${urlXlsx}.xlsx`); // Nombre del archivo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Función para manejar la carga del archivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Función para importar el archivo
  const handleImport = async () => {
    if (!file) return alert("Selecciona un archivo para importar.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const response = await fetchConToken(importXlsx, formData, "POST");
      const result = await response.json();
      alert(result.message || "Importación exitosa.");
      setModalOpen(false);
      setFile(null);
    } catch (error) {
      console.error("Error al importar:", error);
      alert("Error en la importación.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className={`w-full flex flex-col md:flex-row ${
        showButton ? "justify-between" : "justify-end"
      } items-center mt-4`}
    >
      <div className="flex gap-4">
        {showButton && (
          <Link
            to="agregar/nuevo"
            className="bg-secundario px-4 py-2 rounded-md text-white font-medium"
          >
            <p className="w-36 text-center">{nombre}</p>
          </Link>
        )}
      </div>
      {/* {totalAfiliados > 0 && (
        <div className="text-center md:text-right">
          <p className="font-bold mt-4 md:mt-0">
            Mostrando {numeroDePagina + 1} de{" "}
            {tamanioDePagina > totalAfiliados
              ? totalAfiliados
              : tamanioDePagina}{" "}
            de {totalAfiliados}
          </p>
        </div>
      )} */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {Access.store === null && showFilter && (
          <Filtros
            respStore={respStore}
            setRespStore={setRespStore}
            access={Access}
          />
        )}
        <GridSearchBar filtro={filtro} setFiltro={setFiltro} />

        {/* Botón de descarga de Excel */}
        {urlXlsx && (
          <button
            onClick={downloadFile}
            className="flex flex-row gap-2 items-center bg-green-600 text-white px-4 py-2 rounded-md"
          >
            <RiFileExcel2Fill size={20} />
            Descargar Excel
          </button>
        )}

        {/* Botón para abrir el modal de importación */}
        {importXlsx && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex flex-row gap-2 items-center bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            <RiBook3Line size={20} />
            Importar Excel
          </button>
        )}
      </div>

      {/* Modal para importar productos */}
      {modalOpen && (
        <>
          <ImportExcelModal
            onClose={() => setModalOpen(false)}
            onImport={handleImport}
            onFileChange={handleFileChange}
            uploading={uploading}
          />
        </>
      )}
    </div>
  );
};
