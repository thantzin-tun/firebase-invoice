import React from "react";
import { ContextHook } from "../Context";
import { Col } from "react-bootstrap";
import { string, object, number } from 'yup'
import { ModalCom } from "../components/modal/Modal";
import { MyForm } from "../components";

export const ProductPage = () => {
  const { product, setProduct, getProduct } = ContextHook();
  const fields = [
    {
      name: "brand",
      label: "Brand",
      initialValue: "",
      type: string().required("Enter brand type")
    },
    {
      name: "stock",
      label: "Stock",
      initialValue: "",
      type: string().required("Enter item stock")
    },
    {
      name: "price",
      label: "Price",
      initialValue: "",
      type: string().required("Enter item price")
    }
  ]

  const filterProduct = (id, e) => {
    if (id === "all") {
      getProduct();
    } else {
      let filterproduct = product.filter((data) => {
        return data.id === id;
      });
      setProduct(filterproduct);
    }
  };

  console.log("Product Page is running");

  return (
    <>
      <Col xs={6}>
        <div className="flex">

          <div className="dropdown relative">
            <button
              className="
          dropdown-toggle
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-bold
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg active:text-white
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        "
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{ backgroundColor: "#06603b" }}
            >
              Filter By Product Brand
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="caret-down"
                className="w-2 ml-2"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path
                  fill="currentColor"
                  d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
                ></path>
              </svg>
            </button>
            <ul
              className="
          dropdown-menu
          w-full
          absolute
          hidden
          bg-white
          text-base
          z-50
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          m-0
          bg-clip-padding
          border-none
        "
              aria-labelledby="dropdownMenuButton1"
            >
              <li
                onClick={(e) => filterProduct("all", e)}
                className=" hover:bg-green-700 dropdown-item
                text-sm
                py-2
                px-4
                font-semibold
                w-full
                whitespace-nowrap
                bg-transparent
                text-gray-700 hover:text-white transition ease-linear duration-200
                flex justify-between items-end
                "
              >
                All
              </li>
              {product.map((data, index) => (
                <li
                  key={index}
                  onClick={(e) => filterProduct(data.id, e)}
                  className=" hover:bg-green-700 dropdown-item
                text-sm
                py-2
                px-4
                font-semibold
                w-full
                whitespace-nowrap
                bg-transparent
                text-gray-700 hover:text-white transition ease-linear duration-200
                flex justify-between items-end
                "
                >
                  {data.brand}
                </li>
              ))}
            </ul>
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
                        -
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Brand
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Stock
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Price (For One)
                      </th>
                      <th
                        scope="col"
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map((data, index) => (
                      <tr
                        className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        key={index}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {index + 1}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.brand}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.stock}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {data.price}
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {
                            data.stock > 0 ?
                              <button
                                type="button"
                                className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md focus:shadow-l"
                                style={{ backgroundColor: "#06603b" }}
                              >
                                Instock
                              </button>
                              :
                              <button type="button" className="inline-block px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-green-600 hover:shadow-lg duration-150 ease-in-out" style={{ backgroundColor: "red" }}>Out of Stock</button>
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="inline-block px-6 py-2.5 text-white text-xs leading-tight rounded shadow-md hover:shadow-lg font-semibold mt-5"
          data-bs-toggle="modal"
          data-bs-target="#exampleModalLg"
          style={{ background: "#06603b" }}
        >
          Add New Item
        </button>

        <ModalCom>
          <MyForm fields={fields} />
        </ModalCom>

      </Col>
    </>
  );
};
