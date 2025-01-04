import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormInventory } from "../../components/admin/add-inventory/FormInventory";
import { Title } from "../../components/Title";

export const AddInventory = () => {

  const { id } = useParams();

  const [esNuevo, setEsNuevo] = useState(false);

  useEffect(() => {
    if(id === "nuevo") {
      setEsNuevo(true);
    } else {
      setEsNuevo(false);
    }
  }, [id])

  return (
    <>
      <Title
        title={esNuevo ? "Agregar Producto" : "Editar Producto"}
      />
      <FormInventory id={id} esNuevo={esNuevo} />
    </>
  );
};
