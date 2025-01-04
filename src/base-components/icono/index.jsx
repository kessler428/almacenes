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
} from "react-icons/ri";

function Icono({ icono, size }) {
  switch (icono) {
    case "bar-chart-box-line":
        return <RiBarChartBoxLine size={size} />;
    case "shield-user-line":
        return <RiShieldUserLine size={size} />;
    case "article-line":
        return <RiArticleLine size={size} />;
    case "profile-fill":
        return <RiProfileLine size={size} />;
    case "grid-line":
        return <RiGridLine size={size} />;
    case "money-dollar-circle-line":
        return <RiMoneyDollarCircleLine size={size} />;
    case "shopping-cart-2-line":
        return <RiShoppingCart2Line size={size} />;
    case "bank-card-line":
        return <RiBankCardLine size={size} />;
    case "refund-2-line":
        return <RiRefund2Line size={size} />;
    case "credit":
        return <RiHandCoinLine size={size} />;
    case "tiendas":
        return <RiSettings2Line size={size} />;
    default:
        return null;
  }
}

export default Icono;
