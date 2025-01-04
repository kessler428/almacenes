import dom from "@left4code/tw-starter/dist/js/dom";
import errorAcceso from "@/assets/images/error-access.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function NoAutorizado() {
  useEffect(() => {
    dom("body").removeClass("main").removeClass("login").addClass("error-page");
  }, []);

  return (
    <>
      <div>
        <div className="container">
          {/* BEGIN: Error Page */}
          <div className="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
            <div className="-intro-x lg:mr-20">
              <img
                alt="No autorizado"
                className="h-48 lg:h-auto"
                src={errorAcceso}
              />
            </div>
            <div className="text-white mt-10 lg:mt-0">
              <div className="intro-x text-xl lg:text-3xl font-medium mt-5">
                Lo sentimos. No está autorizado para ingresar a esta página.
              </div>
              <div className="intro-x text-lg mt-3">
                Si considera que esto es un error por favor comuníquese con la administración del sistema.
              </div>
              <Link to="/admin">
                <button className="intro-x btn py-3 px-4 text-white border-white dark:border-darkmode-400 dark:text-slate-200 mt-10">
                  Volver a inicio
                </button>
              </Link>
            </div>
          </div>
          {/* END: Error Page */}
        </div>
      </div>
    </>
  );
}

export default NoAutorizado;
