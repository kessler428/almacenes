import dom from "@left4code/tw-starter/dist/js/dom";
import logo from "@/assets/images/logo.png";
import { useEffect, useState } from "react";

import { LoginForm } from "../components/login/LoginForm";
import { ReestablecerContraseña } from "../components/login/ReestablecerContraseña";

function Login() {

  const [inicioDeSesion, setInicioDeSesion] = useState(1);

  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  return (
    <>
      <div className="container sm:px-10">
        <div className="block xl:grid grid-cols-2 gap-4">
          <div className="hidden xl:flex flex-col min-h-screen">
            <div className="my-auto">
              <img
                alt="Endopoints Logo"
                className="-intro-x w-[70%] -mt-16"
                src={logo}
              />
              <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                ¡Bienvenido a la plataforma <br />
                de administracion!
              </div>
            </div>
          </div>
          <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
            {
              inicioDeSesion === 1 ? (
                <LoginForm setInicioDeSesion={setInicioDeSesion} />
              ) : (
                <ReestablecerContraseña setInicioDeSesion={setInicioDeSesion} />
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;