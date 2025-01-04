import React from 'react'

export const Select2 = ({
  nameLabel,
  datos,
  name,
  value,
  handleInputChange,
  className,
  labelClassName
}) => {
  return (
    <div className='mt-4'>
      <label className={labelClassName}>{nameLabel}</label>
      <select
        className={`rounded-md w-full ${ className }`}
        name={name}
        value={value}
        onChange={handleInputChange}
      >
        <option value="select">Por favor seleccione una opción</option>
        {datos?.map((dato) => (
          <option key={dato.id} value={dato.id}>{
            dato.company ? dato.company : dato.value
          }</option>
        ))}
      </select>
    </div>
  )
}