import {
  RiBarChartBoxLine,
  RiShieldUserLine,
  RiArticleLine,
  RiProfileLine,
  RiGridLine,
  RiMoneyDollarCircleLine,
  RiShoppingCart2Line,
  RiBankCardLine,
  RiRefund2Line,
  RiHandCoinLine,
  RiSettings2Line,
  RiMapPinLine,
  RiQrCodeLine,
  RiDatabase2Line,
  RiHistoryLine,
  RiRulerLine
} from "react-icons/ri";

// Mapeo de iconos
const iconMap = {
  "bar-chart-box-line": RiBarChartBoxLine,
  "shield-user-line": RiShieldUserLine,
  "article-line": RiArticleLine,
  "profile-fill": RiProfileLine,
  "grid-line": RiGridLine,
  "money-dollar-circle-line": RiMoneyDollarCircleLine,
  "shopping-cart-2-line": RiShoppingCart2Line,
  "bank-card-line": RiBankCardLine,
  "refund-2-line": RiRefund2Line,
  credit: RiHandCoinLine,
  tiendas: RiSettings2Line,

  "map-pin-line": RiMapPinLine, // Ubicaciones
  "qr-code-line": RiQrCodeLine, // Códigos
  "database-2-line": RiDatabase2Line, // Serial, Historial Stock
  "history-line": RiHistoryLine, // Historial envíos
  "ruler-line": RiRulerLine
};

function Icono({ icono, size = 24 }) {
  const IconComponent = iconMap[icono]; // Obtiene el icono del mapeo

  return IconComponent ? <IconComponent size={size} /> : null;
}

export default Icono;
