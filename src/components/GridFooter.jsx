import React from "react";

export const GridFooter = ({ pageSize, setPageSize }) => {

  const handleSelect = (e) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <>
      <div className="flex justify-between">
        <div className="flex">
          <div className="flex justify-between m-5 text-gray-500 px-3 rounded-lg xl:px-1">
            <select
              value={pageSize}
              onChange={handleSelect}
              className="cursor-pointer bg-white border-none outline-none py-1.5 w-16 px-3 rounded-md "
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};
