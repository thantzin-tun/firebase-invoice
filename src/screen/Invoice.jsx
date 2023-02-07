import React, { useEffect, useRef } from 'react'
import { ContextHook } from '../Context';
import { useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';


export const Invoice = () => {
  const { getInvoiceByID, singleInvoice } = ContextHook();
  const { invoiceID } = useParams();

  const componentRef = useRef();


  useEffect(() => {
    getInvoiceByID(invoiceID);
    total();
  }, []);

  const total = () => {
    let total = 0;
    singleInvoice?.info?.reduce((acc, current) => (
      total = Number(acc) + Number(current.total)
    ), 0)
    return total
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <section className=" mt-10" ref={componentRef}>
        <div className="max-w-3xl mx-auto bg-white">
          <article className="overflow-hidden">
            <div className="bg-[white] rounded-b-md">
              <div className="">
                <div className="space-y-6 text-slate-700">
                  <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                    Laptops And Accessories
                  </p>
                </div>
              </div>


              <div className="py-4">
                <div className="flex w-full">
                  <div className="grid grid-cols-3 gap-12">
                    <div className="text-sm font-light text-slate-500 flex items-center">
                      <p className="text-sm font-normal text-slate-700">
                        Invoice Number:
                      </p>
                      <p className='ml-2'>{singleInvoice.invoiceName}</p>
                    </div>
                    <div className="text-sm font-light text-slate-500 flex items-center">
                      <p className="text-sm font-normal text-slate-700">
                        Customer Name:
                      </p>
                      <p className='ml-2'>{singleInvoice.customerName}</p>
                    </div>
                  </div>
                </div>
              </div>


              <div className="">
                <div className="flex flex-col mx-0 mt-8">
                  <table className="min-w-full divide-y divide-slate-500">
                    <thead>
                      <tr>
                        <th scope="col" className="py-3.5 pl-4 pr-1 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                          Item Name
                        </th>
                        <th scope="col" className="hidden py-1 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                          Price
                        </th>
                        <th scope="col" className="hidden py-1 px-3 text-right text-sm font-normal text-slate-700 sm:table-cell">
                          Qty
                        </th>
                        <th scope="col" className="py-3.5 pl-3 pr-1 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                          Total Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        singleInvoice?.info?.map((data, index) => {
                            return (
                              <tr className="border-b border-slate-200" key={index}>
                                <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                  <div className="font-medium text-slate-700">{data.brandName}</div>
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                  {data.price}
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-right text-slate-500 sm:table-cell">
                                  {data.qty}
                                </td>
                                <td className="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                  {data.total} kyats
                                </td>
                              </tr>
                            )
                        })
                      }
                    </tbody>
                    <tfoot>
                      <tr>
                        <th scope="row" colSpan="3" className="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                          Subtotal
                        </th>
                
                        <td className="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                          {
                            total()
                          }
                          <span className='ml-2'>kyats</span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan="3" className="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                          Tax
                        </th>
                       
                        <td className="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                          500 kyats
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" colSpan="3" className="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                          Total
                        </th>
                       
                        <td className="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                          {total() + 500} kyats
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
        <button
        type="button"
        className="inline-block px-6 py-2.5 text-white text-xs leading-tight rounded shadow-md hover:shadow-lg font-semibold mt-5"
        data-bs-toggle="modal"
        data-bs-target="#exampleModalLg"
        style={{ background: "#06603b" }}
        onClick={handlePrint}
      >
        Print Invoice
      </button>
    </>
  )
}





