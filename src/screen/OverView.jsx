import React ,{useEffect, useState}from 'react';
import {Col} from 'react-bootstrap'
import { ContextHook } from "../Context";

import { Link } from 'react-router-dom';


export const OverView = () => {
  const { invoice, getInvoice } = ContextHook();

  const [invoiceList,setInvoiceList] = useState([]);

  const handleChange = (e) => {
      e.preventDefault();
      let result = invoice.filter((invoice) => {
          return (invoice.customerName).toLowerCase().includes((e.target.value).toLowerCase()); 
      })
      if(result.length > 0){
        setInvoiceList(result);
      }
      console.log(result);
  }

  useEffect(() => {
      setInvoiceList(invoice);
  },[invoice])

    return(
        <>
           
        <Col xs={6}>

        <div className="flex ml-6 items-center mb-4">
            <div className="xl:w-72">
              <form>
                <div className="input-group relative flex flex-wrap items-stretch w-full">
                  <input
                    type="search"
                    className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-70 focus:outline-none"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon2"
                    onChange={(e) =>handleChange(e)}
                  />
                  <button
                    className="btn px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                    type="submit"
                    id="button-addon2"
                    style={{ backgroundColor: "#06603b" }}
                  >
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="search"
                      className="w-4"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                      ></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
           
        </Col>



        <Col sm={12}>

        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8  h-96 overflow-y-scroll">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-white border-b">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Invoice ID
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Customer Name
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Total Amount
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                       -
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                        invoiceList.length > 0 && invoiceList.map((data,index) => (
                          <tr
                          className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                          key={index}
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {data.invoiceName}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {data.customerName}
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                              {
                                data?.info?.reduce((acc, current) => {
                                    return Number(acc) + Number(current.total);
                                },0)
                              }
                          </td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <Link to={`/page/${data.id}`}>
                            <button
                              type="button"
                              className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md focus:shadow-l"
                              style={{ backgroundColor: "#06603b" }}
                            >
                              
                              View
                              
                            </button>
                              </Link>
                          </td>
                        </tr>
                        ))
                      }
                     
                 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

   

      </Col>
        
        </>
    )
}