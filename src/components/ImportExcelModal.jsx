import React, { useState } from "react";
import { Modal } from "./Modal";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";
import * as XLSX from "xlsx";
import { fetchConToken } from "../helpers/fetch";
import { ModalForm } from "./ModalForm";
import Swal from "sweetalert2";

export const ImportExcelModal = ({ isOpen, onClose, refreshProducts }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file)
      return Swal.fire("Error", "Por favor selecciona un archivo", "error");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      console.log(formData);

      const response = await fetchConToken("products/import", formData, "POST");

      if (response.ok) {
        Swal.fire("Éxito", "Productos importados correctamente", "success");
        refreshProducts();
        onClose();
      } else {
        const result = await response.json();
        if (result.errors) {
          Swal.fire({
            title: "Errores encontrados",
            html: result.errors.map((error) => `<p>${error}</p>`).join(""),
            icon: "error"
          });
        } else {
          Swal.fire("Error", "Error al importar productos", "error");
        }
      }
    } catch (error) {
      console.error("Error al importar:", error);
      Swal.fire(
        "Error",
        "Hubo un problema al importar el archivo. Por favor intenta de nuevo.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([
      {
        Ubicacion: "",
        Codigo: "",
        Nombre: "",
        Categoria: "",
        "Unidad de medida": "",
        Stock: "",
        "Stock mínimo": "",
        "Costo unitario": "",
        "Costo IVA": "",
        "Precio de venta": "",
        "Precio IVA": "",
        Estado: "activo/inactivo"
      }
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla");
    XLSX.writeFile(wb, "Plantilla_Productos.xlsx");
  };

  return (
    <ModalForm>
      <div className="bg-white p-6 w-full max-w-md">
        <div className="p-4 flex flex-col gap-3 items-center">
          {/* Botón de descarga de plantilla */}
          <button
            onClick={handleDownloadTemplate}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm"
          >
            <AiOutlineDownload size={18} /> Descargar plantilla
          </button>

          {/* Input de carga de archivo */}
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            className="border p-2 w-full text-sm rounded-lg"
          />

          {/* Botón de subida de archivo */}
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={handleUpload}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm w-full justify-center"
              disabled={loading}
            >
              <AiOutlineUpload size={18} />
              {loading ? "Subiendo..." : "Subir archivo"}
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition"
              onClick={() => onClose(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </ModalForm>
  );
};
