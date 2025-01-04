import { getMonth, getYear } from "date-fns";
import { range } from "lodash";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
registerLocale("es", es);

export const DatePickerCP = ({
  startDate,
  setStartDate,
  finalDate,
  setFinalDate,
  agregarAnios,
  ...rest
}) => {
  const years = range(2020, getYear(new Date()) + 1, 1);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setFinalDate(end);
  };

  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className="px-2">
          <button
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className="mr-2 bg-white px-2 py-1 rounded-md border border-gray-300"
          >
            {"<"}
          </button>
          {agregarAnios && (
            <select
              value={getYear(date)}
              onChange={({ target: { value } }) => changeYear(value)}
              className="w-20 text-sm"
            >
              {years.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
            className={` ${agregarAnios ? "w-24 text-sm " : "w-40"} rounded-md`}
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className="ml-2 bg-white px-2 py-1 rounded-md border border-gray-300"
          >
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={onChange}
      selectsRange
      startDate={startDate}
      endDate={finalDate}
      locale="es"
      className="w-full rounded-md"
      {...rest}
    />
  );
};
