import { useEffect, useState } from "react";
import { Input, SpinnerLoading, Title } from "../../../components";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchConToken } from "../../../helpers/fetch";

export const AddLocationOne = () => {

    const { id } = useParams();
    
    const [value, setValue] = useState('');

    const [esNuevo, setEsNuevo] = useState(false);
    
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!esNuevo, id !== 'nuevo') {
          const getProduct = async () => {
            setLoading(false);
            const resp = await fetchConToken(`locations1/${id}`);
            const data = await resp.json();
            setLoading(false);
            setValue(data.catalog.value);
          };
          getProduct();
        }
    }, []);

    useEffect(() => {
        if(id === "nuevo") {
        setEsNuevo(true);
        } else {
        setEsNuevo(false);
        }
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
    
        const url = esNuevo ? "locations1" : `locations1/${id}`;
        const method = esNuevo ? "POST" : "PUT";
    
        const resp = await fetchConToken(url, {
            value: value,
        }, method);

        setLoading(false);
    
        if (resp.status === 201 || resp.status === 200) {
          Swal.fire({
            title: "Éxito",
            text: `Se ha ${esNuevo ? 'agregado' : 'editado'} la ubicación exitosamente`,
            icon: "success",
    
          }).then((result) => {
            if (result.isConfirmed) {
                navigate("/admin/ubicacion-uno");
            }
          }); 
        } else {
          Swal.fire("Error", "Ha ocurrido un error.", "error");
        }
      };

    return (
        <div>
            {loading && <SpinnerLoading />}
            <Title
                title={esNuevo ? "Agregar Ubicación" : "Editar Ubicación"}
            />
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-md mt-4">
                <Input
                    nameLabel="Ubicación"
                    type="text"
                    name="name"
                    value={value}
                    handleInputChange={(e) => setValue(e.target.value)}
                    required={true}
                />
                <div className="flex justify-end">
                    <Link to={-1}>
                        <button
                            type="button"
                            className="border py-2 px-4 rounded-md mt-4 mr-4"
                        >
                            Regresar
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className="bg-secundario text-white font-bold py-2 px-4 rounded-md mt-4"
                    >
                        {esNuevo ? "Agregar" : "Actualizar"}
                    </button>
                </div>
            </form>
        </div>
    );
}