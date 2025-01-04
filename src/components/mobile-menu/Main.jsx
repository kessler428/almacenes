import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { helper as $h } from "@/utils";
import { sideMenu as useSideMenuStore, sideMenuUser as useSideMenuUserStore } from "@/stores/side-menu";
import { useRecoilValue } from "recoil";
import { nestedMenu } from "@/layouts/side-menu";
import { toggleMobileMenu, linkTo, enter, leave } from "./index";
import { Lucide } from "@/base-components";
import Icono from "@/base-components/icono";
import classnames from "classnames";
import dom from "@left4code/tw-starter/dist/js/dom";
import SimpleBar from "simplebar";
import { useSelector } from "react-redux";
import logoUrl from "@/assets/images/logo.png";

function Main(modulos) {
  const navigate = useNavigate();
  const location = useLocation();
  const [formattedMenu, setFormattedMenu] = useState([]);
  const sideMenuStore = useRecoilValue(useSideMenuStore);
  const sideMenuStore2 = useRecoilValue(useSideMenuUserStore);

  const { rol } = useSelector((state) => state.auth);

  const mobileMenu = () => {
    if (rol === 'Administrador') {
      return nestedMenu($h.toRaw(sideMenuStore.menu), location)
    } else {
      return nestedMenu($h.toRaw(sideMenuStore2.menu), location)
    }
  };
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);

  useEffect(() => {
    new SimpleBar(dom(".mobile-menu .scrollable")[0]);
    setFormattedMenu(mobileMenu());
  }, [sideMenuStore, location.pathname]);

  return (
    <>
      {/* BEGIN: Mobile Menu */}
      <div
        className={classnames({
          "mobile-menu md:hidden": true,
          "mobile-menu--active": activeMobileMenu,
        })}
      >
        <div className="mobile-menu-bar">
          <a href="" className="flex items-center justify-center mr-auto">
            <img
              alt="ASEMBIS Plan"
              className="w-20"
              src={logoUrl}
            />
          </a>
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mobile-menu-toggler"
          >
            <Lucide
              icon="BarChart2"
              className="w-8 h-8 text-white transform -rotate-90"
              onClick={() => {
                toggleMobileMenu(activeMobileMenu, setActiveMobileMenu);
              }}
            />
          </a>
        </div>
        <div className="scrollable">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="mobile-menu-toggler"
          >
            <Lucide
              icon="XCircle"
              className="w-8 h-8 text-white transform -rotate-90"
              onClick={() => {
                toggleMobileMenu(activeMobileMenu, setActiveMobileMenu);
              }}
            />
          </a>
          <ul className="scrollable__content py-2">
            {/* BEGIN: First Child */}
            {modulos.modulos.map((modulo, menuKey) =>
              modulo == "divisor" ? (
                <li className="menu__divisor my-6" key={modulo + menuKey}></li>
              ) : (
                <li key={modulo + menuKey}>
                  <a
                    href={modulo.subMenu ? "#" : modulo.route}
                    className={classnames({
                      menu: true,
                      "menu--active": modulo.active,
                      "menu--open": modulo.activeDropdown,
                    })}
                    onClick={(event) => {
                      event.preventDefault();
                      linkTo(modulo, navigate, setActiveMobileMenu);
                    }}
                  >
                    <div className="menu__icon">
                    <Icono icono={modulo.icon} size={20} />
                    </div>
                    <div className="menu__title">
                      {modulo.name}
                      {modulo?.subMenu && (
                        <div
                          className={classnames({
                            "menu__sub-icon": true,
                            "transform rotate-180": modulo?.activeDropdown,
                          })}
                        >
                          <Icono icono={modulo.icon} size={20} />
                        </div>
                      )}
                    </div>
                  </a>
                </li>
              )
            )}
            {/* END: First Child */}
          </ul>
        </div>
      </div>
      {/* END: Mobile Menu */}
    </>
  );
}

export default Main;
