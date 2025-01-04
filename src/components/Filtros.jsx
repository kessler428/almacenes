import { useEffect, useState } from "react";
import { fetchConToken } from "../helpers/fetch";

export const Filtros = ({access, respStore, setRespStore}) => {

  const [stores, setStores] = useState([]);

  useEffect(() => {
    const getResp = async () => {
      const resp = await fetchConToken("stores");
      const body = await resp.json();
      setStores(body.data);
    }
    getResp();
  }, []);
  
  return (
    <div>
      {
        access.store === null ? (
          <select
            value={respStore}
            onChange={({ target }) => setRespStore(target.value)}
            className={`border-none bg-white outline-none w-full md:w-48 rounded-md ${!respStore ? "text-[#707070]" : ""} `}
          >
            <option value="">Todos</option>
            {
              stores?.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))
            }
          </select>
        ) : (
          <select
            value={respStore}
            onChange={({ target }) => setRespStore(target.value)}
            className={`border-none bg-white outline-none w-full md:w-48 rounded-md ${!respStore ? "text-[#707070]" : ""} `}
          >
            <option value="">Todos</option>
            {
              stores?.map(({ id, name }) => (
                access.store.id === id && (
                  <option key={id} value={id}>{name}</option>
                )
              ))
            }
          </select>
        )
      }
    </div>
  );
};
