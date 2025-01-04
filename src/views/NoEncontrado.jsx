import dom from "@left4code/tw-starter/dist/js/dom";
import errorIllustration from "@/assets/images/error-illustration.svg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function NoEncontrado() {
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
                alt="No encontrado"
                className="h-48 lg:h-auto"
                src={errorIllustration}
              />
            </div>
            <div className="text-white mt-10 lg:mt-0">
              <div className="intro-x text-8xl font-medium">404</div>
              <div className="intro-x text-xl lg:text-3xl font-medium mt-5">
                Oops. Esta página no existe.
              </div>
              <div className="intro-x text-lg mt-3">
                Probablemente ha ingresado mal la dirección o esta página ha
                sido trasladada.
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

export default NoEncontrado;
