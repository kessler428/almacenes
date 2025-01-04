import React from "react";
import { RiSearchLine, RiCloseLine } from "react-icons/ri";

export const GridSearchBar = ({ filtro, setFiltro }) => {
  return (
      <div className="flex w-full md:w-[220px] mt-2 md:mt-0 justify-between items-center flex-row bg-white rounded-lg">
        <input
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
          }}
          className="border-none outline-none w-[140px] rounded-lg focus:ring-0 focus:ring-offset-0"
          placeholder="Buscar..."
          type="text"
        />
        {filtro && (
          <RiCloseLine
            onClick={() => setFiltro("")}
            className="text-[#707070] mr-4 cursor-pointer"
          />
        )}
        <RiSearchLine className="text-[#707070] mr-4" />
      </div>
  );
};
