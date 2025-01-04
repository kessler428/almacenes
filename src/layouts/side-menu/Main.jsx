import { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { linkTo } from "./index";
import logoUrl from "@/assets/images/logo.png";
import classnames from "classnames";
import Icono from "@/base-components/icono";
import TopBar from "@/components/top-bar/Main";
import MobileMenu from "@/components/mobile-menu/Main";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main";
import { useSelector } from "react-redux";
import { fetchConToken } from "../../helpers/fetch";

function Main() {
  const navigate = useNavigate();
  const location = useLocation();

  const [modules, setModules] = useState([]);

  const { Access } = useSelector((state) => state.auth);

  useEffect(() => {
    const obtenerModulos = async () => {
      const resp = await fetchConToken('modules');
      const body = await resp.json();

      if (Access.modulos) {
        const modulosDisponibles = body.module.filter((modulo) =>
          Access.modulos.includes(modulo.id)
        );
        setModules(modulosDisponibles);
      } else {
        setModules([]);
      }
    };
    obtenerModulos();
  }, [Access.modulos]);

  return (
    <div className="py-2 bg-principal">
      <MobileMenu modulos={modules} />
      <div className="flex mt-[4.7rem] md:mt-0">
        <nav className="side-nav">
          <div className="intro-x flex items-center justify-center pt-4">
            <Link to="/admin">
              <img alt="ASEMBIS Plan" className="w-44" src={logoUrl} />
            </Link>
          </div>
          <div className="side-nav__divisor my-6"></div>
          <ul>
            {modules?.map((modulo, menuKey) =>
              modulo == "divisor" ? (
                <li
                  className="side-nav__divisor my-6"
                  key={modulo + menuKey}
                ></li>
              ) : (
                <li key={modulo + menuKey}>
                  <SideMenuTooltip
                    tag="a"
                    content={modulo.name}
                    href={modulo.route}
                    className={classnames({
                      "side-menu": true,
                      "side-menu--active": location.pathname.includes(
                        modulo.route
                      ),
                    })}
                    onClick={(event) => {
                      event.preventDefault();
                      linkTo(modulo, navigate);
                    }}
                  >
                    <div className="side-menu__icon">
                      <Icono icono={modulo.icon} size={20} />
                    </div>
                    <div className="side-menu__title">{modulo.name}</div>
                  </SideMenuTooltip>
                </li>
              )
            )}
          </ul>
        </nav>
        <div className="content">
          <TopBar />
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;