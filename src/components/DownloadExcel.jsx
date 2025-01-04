import React from 'react'
import { useSelector } from 'react-redux';

export const DownloadExcel = () => {
  const { Access } = useSelector((state) => state.auth);
  return (
    <>
      {
        Access.store === null && (
        <div
          className="flex justify-end m-4"
        >
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Descargar excel
          </button>
        </div>
        )
      }
    </>
  )
}
