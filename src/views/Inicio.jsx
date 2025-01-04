import { Lucide, Litepicker } from "@/base-components";
import ReportLineChart from "@/components/report-line-chart/Main";
import ReportPieChart from "@/components/report-pie-chart/Main";
import ReportDonutChart from "@/components/report-donut-chart/Main";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchConToken } from "../helpers/fetch";
import { SpinnerLoading } from "../components/SpinnerLoading";
import moment from "moment/moment";
import Swal from "sweetalert2";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Main() {
  const { Access } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  const [salesReportFilter, setSalesReportFilter] = useState();
  const [data, setData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [infoInvoice, setInfoInvoice] = useState(null);
  const [priceLastMonth, setPriceLastMonth] = useState(0);
  const [priceThisMonth, setPriceThisMonth] = useState(0);

  useEffect(() => {
    const getInfoIndex = async () => {
      const resp = await fetchConToken(
        Access.store === null ? "admin" : `admin/${Access.store.id}`
      );

      const body = await resp.json();

      setData(body.data);
      setNotifications(body.notifications);
      setStoreData(body.storeData);
      setLoading(false);
    };
    getInfoIndex();
    getInfoInvoice();
  }, []);

  const getInfoInvoice = async () => {
    const resp = await fetchConToken(
      `reports/info-sales-month?startDate=2024-01-01&endDate=2024-04-01`
    );

    const body = await resp.json();

    setInfoInvoice(body.data);

    const priceLastMonth = body.data[body.data.length - 2].totalSales;
    const priceThisMonth = body.data[body.data.length - 1].totalSales;

    setPriceLastMonth(priceLastMonth);
    setPriceThisMonth(priceThisMonth);
  };

  useEffect(() => {
    if (notifications?.length > 0) {
      showAlert(0);
    }
  }, [notifications]);

  const showAlert = (index) => {
    Swal.fire({
      title: "Notificación",
      text: notifications.map((notification) => notification.value)[index],
      showCancelButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "Cerrar"
    }).then((result) => {
      if (result.isConfirmed) {
        if (index < notifications.length - 1) {
          showAlert(index + 1);
        }
        deleteNotification(notifications[index].id);
      }
    });
  };

  const deleteNotification = async (id) => {
    const resp = await fetchConToken(`notifications/${id}`, {}, "PATCH");
    const body = await resp.json();
    if (body.ok) {
      getInfoIndex();
    }
  };

  return loading ? (
    <SpinnerLoading />
  ) : (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <div className="grid grid-cols-12 gap-6">
          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="intro-y flex items-center h-10">
              <h2 className="text-xl font-medium truncate mr-5 first-letter:uppercase">
                {Access.name}
              </h2>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="ShoppingCart"
                        className="report-box__icon text-primary"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {data.facturasDelDia}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Ventas totales
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="CreditCard"
                        className="report-box__icon text-pending"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {Intl.NumberFormat("es-NI", {
                        style: "currency",
                        currency: "NIO"
                      }).format(data.dineroCaja === null ? 0 : data.dineroCaja)}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Dinero en caja
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Monitor"
                        className="report-box__icon text-warning"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {/* formatera numero */}
                      {data.sumaStock
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Total de productos
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="User"
                        className="report-box__icon text-success"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {data.usuariosRegistrados}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Usuarios Registrados
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Sales Report */}
          {Access.id === 1 && (
            <>
              <div className="col-span-12 lg:col-span-6 mt-8">
                <div className="intro-y block sm:flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Reporte de ventas
                  </h2>
                  <div className="sm:ml-auto mt-3 sm:mt-0 relative text-slate-500">
                    <Lucide
                      icon="Calendar"
                      className="w-4 h-4 z-10 absolute my-auto inset-y-0 ml-3 left-0"
                    />
                    <Litepicker
                      value={salesReportFilter}
                      onChange={setSalesReportFilter}
                      options={{
                        autoApply: false,
                        singleMode: false,
                        numberOfColumns: 2,
                        numberOfMonths: 2,
                        showWeekNumbers: true,
                        dropdowns: {
                          minYear: 2020,
                          maxYear: null,
                          months: true,
                          years: true
                        }
                      }}
                      className="form-control sm:w-56 box pl-10"
                    />
                  </div>
                </div>
                {/* <div className="intro-y box p-5 mt-12 sm:mt-5">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex">
                      <div>
                        <div className="text-primary dark:text-slate-300 text-lg xl:text-xl font-medium">
                          {Intl.NumberFormat("es-NI", {
                            style: "currency",
                            currency: "NIO"
                          }).format(priceThisMonth)}
                        </div>
                        <div className="mt-0.5 text-slate-500">Mes actual</div>
                      </div>
                      <div className="w-px h-12 border border-r border-dashed border-slate-200 dark:border-darkmode-300 mx-4 xl:mx-5"></div>
                      <div>
                        <div className="text-slate-500 text-lg xl:text-xl font-medium">
                          {Intl.NumberFormat("es-NI", {
                            style: "currency",
                            currency: "NIO"
                          }).format(priceLastMonth)}
                        </div>
                        <div className="mt-0.5 text-slate-500">Mes pasado</div>
                      </div>
                    </div>
                  </div>

                  <BarChartComponent data={infoInvoice} />
                </div> */}
              </div>
              {/* END: Sales Report */}
              {/* BEGIN: Weekly Top Seller */}
              <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
                <div className="intro-y flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Ventas de las tiendas
                  </h2>
                </div>
                <div className="intro-y box p-5 mt-5">
                  <div className="mt-3">
                    <ReportPieChart height={213} />
                  </div>
                  <div className="w-52 sm:w-auto mx-auto mt-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="truncate">17 - 30 Years old</span>
                      <span className="font-medium ml-auto">62%</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                      <span className="truncate">31 - 50 Years old</span>
                      <span className="font-medium ml-auto">33%</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                      <span className="truncate">&gt;= 50 Years old</span>
                      <span className="font-medium ml-auto">10%</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* END: Weekly Top Seller */}
              {/* BEGIN: Sales Report */}
              <div className="col-span-12 sm:col-span-6 lg:col-span-3 mt-8">
                <div className="intro-y flex items-center h-10">
                  <h2 className="text-lg font-medium truncate mr-5">
                    Sales Report
                  </h2>
                </div>
                <div className="intro-y box p-5 mt-5">
                  <div className="mt-3">
                    <ReportDonutChart height={213} />
                  </div>
                  <div className="w-52 sm:w-auto mx-auto mt-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="truncate">17 - 30 Years old</span>
                      <span className="font-medium ml-auto">62%</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                      <span className="truncate">31 - 50 Years old</span>
                      <span className="font-medium ml-auto">33%</span>
                    </div>
                    <div className="flex items-center mt-4">
                      <div className="w-2 h-2 bg-warning rounded-full mr-3"></div>
                      <span className="truncate">&gt;= 50 Years old</span>
                      <span className="font-medium ml-auto">10%</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* END: Sales Report */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;

const BarChartComponent = ({ data }) => {
  // Función para capitalizar la primera letra de una cadena
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // convertir los datos legibles
  data = data.map((item) => {
    const month = moment(item.month, "M").format("MMMM");
    const capitalizedMonth = capitalizeFirstLetter(month);
    const totalSales = item.totalSales;
    const price = Intl.NumberFormat("es-NI", {
      style: "currency",
      currency: "NIO"
    }).format(totalSales);

    return {
      ...item,
      month: capitalizedMonth,
      totalSales: totalSales,
      price: price
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis dataKey="totalSales" />
        {/* <Tooltip /> */}
        <Tooltip
          formatter={(value) =>
            Intl.NumberFormat("es-NI", {
              style: "currency",
              currency: "NIO"
            }).format(value)
          }
        />
        <Legend />
        <Bar dataKey="totalSales" fill="#00879D" name="Total de ventas" />
      </BarChart>
    </ResponsiveContainer>
  );
};
