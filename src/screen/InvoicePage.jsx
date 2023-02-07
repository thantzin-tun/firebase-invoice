import React, { useRef, useState, useReducer, useEffect } from "react";
import { Col } from "react-bootstrap";
import { ContextHook } from "../Context";
import { AiFillDelete, AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'


const initialState = {
  brandName: null,
  qty: null,
  price: null,
  total: null,
}

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "brandName":
      return { ...state, brandName: payload }
    case "qty":
      return { ...state, qty: payload, total: state.price * payload }
    case "price":
      return { ...state, price: payload, total: state.qty * payload }
    case "reset":
      return payload
    default:
      return state
  }
}


export const InvoicePage = () => {

  const invoiceNameRef = useRef();
  const customerNameRef = useRef();

  const [productNumber, setProductNumber] = useState(0);


  const [state, dispatch] = useReducer(reducer, initialState);
  const { product, addInvoice } = ContextHook();

  const [bol,setBol] = useState(false);


  const [invoiceInfo, setInvoiceInfo] = useState([
    {
      brandName: "",
      qty: "",
      price: "",
      total: ""
    }
  ]);

  const showPrice = (id) => {
    let hasPrice = product.find((item) => item.id === id);
    if (hasPrice) {
      dispatch({ type: 'price', payload: hasPrice.price });
      setProductNumber(hasPrice.stock);
    }
  }


  const addMore = async () => {
    const emptyObject = Object.values(state).every(value => value === null);
    if (emptyObject) {
      alert("Fill complete invoice");
      return;
    }
    setInvoiceInfo((prevState) => [...prevState, state]);
    dispatch({ type: "reset", payload: initialState })
  }

  const removeRow = (index) => {
    let newList = [...invoiceInfo];
    newList.splice(index, 1);
    setInvoiceInfo(newList);
  }


  const checkout = () => {
    if (!invoiceNameRef.current.value || !customerNameRef.current.value) {
      alert("Fill Invoice Name and Customer Name");
    }
    else {
      let empty = Object.values(invoiceInfo[1]).some(value => value === "");
      if (empty) {
        alert("Invoice At least One item");
      }
      else {
        setBol(!bol);
        addInvoice(customerNameRef.current.value, invoiceNameRef.current.value, invoiceInfo);
        setTimeout(() => {
          setBol(false)
      },4000)
      }
    }
  }


  return (
    <>
      <Col xs={12}>

        <button type="button" className="inline-block px-6 mb-5 py-2.5 text-black text-lg leading-tight 
        rounded shadow-md hover:shadow-lg font-semibold">New Invoice</button>

        <div className="flex items-center">

          <div className="flex items-center mr-5">
            <label htmlFor="exampleFormControlInput1" className="form-label inline-block text-gray-700 mr-3"
            >Invoice Name</label>
            <input
              autoComplete="off"
              type="text"
              className="
        form-control
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
      "
              id="exampleFormControlInput1"
              ref={invoiceNameRef}
            />

          </div>

          <div className="flex items-center">
            <label htmlFor="exampleFormControlInput1" className="form-label inline-block text-gray-700 mr-3"
            >Customer Name</label>
            <input
              type="text"
              autoComplete="off"
              className="
        form-control
        px-3
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
      "
              id="exampleFormControlInput1"
              ref={customerNameRef}
            />

          </div>

        </div>

        <div className="w-full h-0.5 bg-lime-600 my-5"></div>

        {
          bol
            ?
            <div className="bg-gray-300 rounded-lg py-5 px-6 text-sm text-gray-800 mb-3 w-96" role="alert">
              Invoice Create Successfully! <Link to="/overview" className="font-bold text-lime-600">Go To Overview Page</Link>
            </div>
            :
            ""

        }


        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="py-2 inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="text-left">
                  <thead>
                    <tr>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                        Brand Name
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                        Qty
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                        Price
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                        Total Amount
                      </th>
                      <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">

                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      invoiceInfo.map((data, index) => (

                        <tr key={index} className=" text-center">
                          <div className="flex justify-center">
                            <div className="xl:w-52 mr-3">
                              <select className="form-control appearance-none
                px-3
                py-1.5
                w-full
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding bg-no-repeat
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example"


                                onChange={(e) => {
                                  showPrice(e.target.childNodes[e.target.selectedIndex].getAttribute("data-id"));
                                  dispatch({ type: "brandName", payload: e.target.value })
                                }}

                                name="brandName"
                              >
                                <option>Brand Name</option>
                                {
                                  product.map((data, index) => (
                                    <option value={data.brand} data-id={data.id} key={index}>{data.brand}</option>
                                  ))
                                }
                              </select>
                            </div>
                          </div>

                          <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                            <input
                              name="qty"
                              type="number"
                              disabled={state.brandName === null ? true : false}
                              autoComplete="off"
                              min="0"
                              max={productNumber}
                              className="
                  form-control
                  px-3
                  py-1
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  mr-3
                "
                              id="exampleFormControlInput1"
                              onChange={(e) =>
                                dispatch({ type: "qty", payload: e.target.value })
                              }
                            />


                          </td>

                          <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                            <input

                              value={invoiceInfo[index + 1]?.price === null ? 0 : invoiceInfo[index + 1]?.price}
                              name="price"
                              type="number"
                              disabled={true}
                              className="
                  form-control
                  px-3
                  py-1
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  mr-3
                "
                              id="exampleFormControlInput1"

                            />

                          </td>

                          <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">


                            {invoiceInfo[index + 1]?.total === "" ? 0 : invoiceInfo[index + 1]?.total}


                          </td>

                          <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap flex items-center">
                            {
                              invoiceInfo.length !== 1 &&
                              <button style={{ backgroundColor: "red" }} onClick={() => removeRow(index)} type="button" className="inline-block px-3 py-2 text-white font-bold text-xs leading-tight rounded shadow-md hover:shadow-lg mr-3  focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out">
                                <AiFillDelete color="white" />
                              </button>
                            }
                            {
                              invoiceInfo.length - 1 === index &&
                              <button style={{ backgroundColor: "purple" }} onClick={addMore} type="button" className="inline-block px-3 py-2 bg-lime-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-150 ease-in-out">
                                <AiOutlinePlus color="white" />
                              </button>
                            }
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

        <div className="flex items-center">
          <button type="button" className="inline-block px-6 py-2.5 text-white text-xs leading-tight 
        rounded shadow-md hover:shadow-lg font-semibold" style={{ backgroundColor: "#06603b" }} onClick={checkout}>Checkout</button>

        </div>

      </Col>
    </>
  )
}
