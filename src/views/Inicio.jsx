import { Lucide } from "@/base-components";
import { useState } from "react";
import { useEffect } from "react";
import { fetchConToken, fetchSinToken } from "@/helpers/fetch";
import Swal from "sweetalert2";
import { SpinnerLoading } from "../components/SpinnerLoading";

const initState = {
  transaccionesDiarias: 0,
  dineroEnCaja: 0,
  totalProductos: 0,
  inversionTotal: 0,
  gananciasTotales: 0
};

function Main() {
  const [data] = useState({
    transaccionesDiarias: 150,
    dineroEnCaja: 125000,
    totalProductos: 3500,
    inversionTotal: 500000,
    gananciasTotales: 750000
  });

  const [notifications, setNotifications] = useState([]);
  const [getAdmin, setGetAdmin] = useState(initState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getInfoIndex = async () => {
      setLoading(true);
      const resp = await fetchConToken("admin");

      const body = await resp.json();

      setNotifications(body.notification);
      setGetAdmin({
        stockInput: body.stockInput,
        stockOutput: body.stockOutput,
        totalCost: body.totalCost,
        totalProfit: body.totalProfit,
        totalSale: body.totalSale
      });

      setLoading(false);
    };
    getInfoIndex();
  }, []);

  useEffect(() => {
    if (notifications?.length > 0) {
      showAlert(0);
    }
  }, [notifications]);

  const showAlert = (index) => {
    Swal.fire({
      title: "Notificación",
      text:
        "El producto [" +
        notifications[index].name +
        "] con codigo [" +
        notifications[index].code +
        "] se encuentra en bajo stock",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (index < notifications.length - 1) {
          showAlert(index + 1);
        }
      }
    });
  };

  return loading ? (
    <SpinnerLoading />
  ) : (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 mt-8">
        <h2 className="text-xl font-medium truncate mr-5 first-letter:uppercase">
          Panel Administrativo
        </h2>
        <div className="grid grid-cols-12 gap-6 mt-5">
          <InfoCard
            icon="ShoppingCart"
            value={getAdmin.stockInput}
            label="Historial de entradas al dia de hoy"
            color="text-primary"
          />
          <InfoCard
            icon="ShoppingCart"
            value={getAdmin.stockOutput}
            label="Historial de salidas al dia de hoy"
            color="text-warning"
          />
          <InfoCard
            icon="DollarSign"
            value={getAdmin.totalCost}
            label="Costo total de productos"
            color="text-success"
          />
          <InfoCard
            icon="DollarSign"
            value={getAdmin.totalSale}
            label="Precio venta de productos"
            color="text-danger"
          />
          <InfoCard
            icon="DollarSign"
            value={getAdmin.totalProfit}
            label="Utilidad totales"
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
