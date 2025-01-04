import { logout } from "../../redux/slices/auth/thunks";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

function Main() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const closeSession = () => {
    Swal.fire({
      text: "¿Desea cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout(token));
        navigate("/");
      }
    });
  };
  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="top-bar">
        {/* BEGIN: Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          className="-intro-x mr-auto flex justify-end w-full"
        >
          <button
            onClick={closeSession}
            className="flex flex-row justify-center items-center rounded-lg p-2 hover:underline hover:text-principal hover:bg-gray-300"
          >
            <p className="text-lg">Cerrar sesión</p>
          </button>
        </nav>
      </div>
    </>
  );
}

export default Main;
