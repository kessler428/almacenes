import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { fetchConToken } from '../../../helpers/fetch';
import { INVOICE_TYPE } from '../../../utils/constants';
import { Input } from '../../Input'
import { Select2 } from '../../Select2'

export const PaymentsDetails = ({listOfProducts, provider, setLoading}) => {

  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [listOfPayments, setListOfPayments] = useState([]);
  const [invoiceType, setInvoiceType] = useState('');
  const [insertDate, setInsertDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const getTypesOfPayments = async () => {
      const resp = await fetchConToken('invoices/types');
      const data = await resp.json();
      setListOfPayments(data.invoiceTypes);
    }
    getTypesOfPayments();
  }, []);  

  useEffect(() => {
    let total = 0;
    listOfProducts.forEach((product) => {
      total += product.subTotal;
    });
    setTotal(total);
  }, [listOfProducts]);

  const createInvoice = async () => {

    if(amount < total){
      return Swal.fire('Error', 'El monto ingresado es menor al total de la factura', 'error');
    }

    if(invoiceType === ''){
      return Swal.fire('Error', 'Debe seleccionar un tipo de pago', 'error');
    }

    if(provider.value === ''){
      return Swal.fire('Error', 'Debe seleccionar un cliente', 'error');
    }

    if(amount === 0){
      return Swal.fire('Error', 'Debe ingresar un monto', 'error');
    }

    setLoading(true);

    const invoiceDetails = listOfProducts.map((product) => {
      return {
        productId: product.id,
        stock: Number(product.amount),
        priceBought: Number(product.purchasePrice),
        priceSold: Number(product.salePrice),
      }
    });

    const data = {
      providerId: provider.value,
      insertDate: insertDate,
      dueDate: dueDate,
      invoiceTypeId: invoiceType,
      subtotal: total,
      total: invoiceType === INVOICE_TYPE.CONTADO ? amount : total,
      products: invoiceDetails
    }

    const resp = await fetchConToken('products/providers', data, 'POST');
    const body = await resp.json();

    setLoading(false);

    if(resp.ok){
      Swal.fire({
        title: 'Exito.!',
        text: 'Factura creada exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        if(result.isConfirmed){
          window.location.reload();
        }
      });
    }else{
      Swal.fire('Error', body.message, 'error');
    }
  };

  return (
    <>
      <div className='flex flex-row space-x-12 mt-4'>
        <div className='w-1/2'>
          <Select2
            nameLabel='Tipo de pago'
            name='paymentType'
            className='mt-4'
            labelClassName='text-lg font-semibold'
            value={invoiceType}
            datos={listOfPayments}
            handleInputChange={(e) => setInvoiceType(e.target.value)}
          />
          <Input
            nameLabel='Fecha de emisión'
            value={insertDate}
            handleInputChange={(e) => setInsertDate(e.target.value)}
            type='date'
            placeholder='Monto'
          />
          {
            invoiceType == INVOICE_TYPE.CONTADO && (
              <Input
                nameLabel='Monto'
                nameInput='amount'
                value={amount}
                handleInputChange={(e) => setAmount(e.target.value)}
                type='number'
                placeholder='Monto'
              />
            )
          }
          {
            invoiceType == INVOICE_TYPE.CREDITO && (
              <Input
                nameLabel='Fecha de vencimiento'
                value={dueDate}
                handleInputChange={(e) => setDueDate(e.target.value)}
                type='date'
                placeholder='Monto'
              />
            )
          }
        </div>
        <div className='w-1/2 pt-4'>
          <h1 className='font-semibold text-lg'>Detalles del pago</h1>
          <hr className='my-4' />
          <h2>
            Total: {
              Intl.NumberFormat('es-NI', {
                style: 'currency',
                currency: 'NIO'
              }).format(total)
            }
          </h2>
          <hr className='my-4' />
          {amount > 0 && (
            <h2>
              Vuelto:
              {Intl.NumberFormat('es-NI', {
                  style: 'currency',
                  currency: 'NIO'
              }).format(amount - total)}
            </h2>
          )}
        </div>
      </div>
      <div
        className='flex flex-row justify-end'
      >
        <button
          className='bg-principal text-white rounded-md px-4 py-2 mt-4'
          onClick={createInvoice}
        >
          Facturar
        </button>
      </div>
    </>
  )
}
