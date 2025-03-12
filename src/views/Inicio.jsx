import { Lucide } from "@/base-components";
import { useState } from "react";

function Main() {
  const [data] = useState({
    transaccionesDiarias: 150,
    dineroEnCaja: 125000,
    totalProductos: 3500,
    inversionTotal: 500000,
    gananciasTotales: 750000
  });

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 mt-8">
        <h2 className="text-xl font-medium truncate mr-5 first-letter:uppercase">
          Panel Administrativo
        </h2>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <InfoCard
            icon="ShoppingCart"
            value={data.transaccionesDiarias}
            label="Transacciones realizadas hoy"
            color="text-primary"
          />
          <InfoCard
            icon="Monitor"
            value={data.totalProductos}
            label="Cantidad total de productos"
            color="text-warning"
          />
          <InfoCard
            icon="TrendingUp"
            value={`C$${data.gananciasTotales.toLocaleString("es-NI")}`}
            label="Ganancias totales"
            color="text-success"
          />
          <InfoCard
            icon="TrendingDown"
            value={`C$${data.inversionTotal.toLocaleString("es-NI")}`}
            label="Inversión total"
            color="text-danger"
          />
        </div>
      </div>
    </div>
  );
}

const InfoCard = ({ icon, value, label, color }) => {
  return (
    <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
      <div className="report-box zoom-in">
        <div className="box p-5">
          <div className="flex">
            <Lucide icon={icon} className={`report-box__icon ${color}`} />
          </div>
          <div className="text-3xl font-medium leading-8 mt-6">{value}</div>
          <div className="text-base text-slate-500 mt-1">{label}</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
