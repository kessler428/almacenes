import { Lucide } from "@/base-components";
import { useState } from "react";
import { useEffect } from "react";
import { fetchConToken, fetchSinToken } from "@/helpers/fetch";
import Swal from "sweetalert2";

function Main() {
  const [data] = useState({
    transaccionesDiarias: 150,
    dineroEnCaja: 125000,
    totalProductos: 3500,
    inversionTotal: 500000,
    gananciasTotales: 750000
  });

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getInfoIndex = async () => {
      const resp = await fetchConToken("admin");

      const body = await resp.json();

      setNotifications(body.notification);
    };
    getInfoIndex();
  }, []);

  // useEffect(() => {
  //   if (notifications?.length > 0) {
  //     showAlert(0);
  //   }
  // }, [notifications]);

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
            label="Historial de entradas al dia de hoy"
            color="text-primary"
          />
          <InfoCard
            icon="Monitor"
            value={data.totalProductos}
            label="Historial de salidas al dia de hoy"
            color="text-warning"
          />
          <InfoCard
            icon="TrendingUp"
            value={`C$${data.gananciasTotales.toLocaleString("es-NI")}`}
            label="Costo total de productos"
            color="text-success"
          />
          <InfoCard
            icon="TrendingDown"
            value={`C$${data.inversionTotal.toLocaleString("es-NI")}`}
            label="Precio venta de productos"
            color="text-danger"
          />
          <InfoCard
            icon="TrendingDown"
            value={`C$${data.inversionTotal.toLocaleString("es-NI")}`}
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
