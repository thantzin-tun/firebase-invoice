import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { object } from 'yup'
import { ContextHook } from "../../Context";



export const MyForm = ({fields}) => {

  const { addProduct } = ContextHook();

  const initialValues = Object.fromEntries(fields.map((data) => [data.name, data.initialValue]))

  const productObject = Object.fromEntries(fields.map((data) => [data.name, data.type]))

  const productSchema = object().shape(productObject);

  const onSubmit = (values, { resetForm }) => {
      addProduct(values);
      resetForm({values:""});
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={productSchema}
        onSubmit={onSubmit}
      >
        <Form encType="multipart/form-data">

          {
            fields.map((data,index) => (

              <div className="form-group mb-4" key={index}>
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label inline-block mb-1 text-gray-700"
                >
                  {data.label}
                </label>

                <Field
                  name={data.name}
                  className="form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
                <ErrorMessage name={data.name}>
                  {(message) => (message ?
                    <div className="flex items-center">
                      <AiOutlineExclamationCircle className=" mr-1" size="15px" color="red" />
                      {message}
                    </div> : null)}
                </ErrorMessage>

                {/* <input
                  type="email"
                  className="form-control
  block
  w-full
  px-3
  py-1.5
  text-base
  font-normal
  text-gray-700
  bg-white bg-clip-padding
  border border-solid border-gray-300
  rounded
  transition
  ease-in-out
  m-0
  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                /> */}
              </div>
            ))
          }


          <button
            type="submit"
            className="inline-block px-6 py-2.5 text-white text-xs leading-tight rounded shadow-md hover:shadow-lg font-semibold mt-5"
            style={{ background: "#06603b" }}
          >
            Add
          </button>

          {/* <div className="form-group mb-1 flex items-center justify-between gap-3">

            <div className="left w-full">
              <label
                htmlfor="exampleInputEmail1"
                className="form-label inline-block mb-1 text-gray-700"
              >
                Stock
              </label>
              <input
                type="email"
                className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div className="right w-full">
              <label
                htmlfor="exampleInputEmail1"
                className="form-label inline-block mb-1 text-gray-700"
              >
                Price
              </label>
              <input
                type="email"
                className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

          </div> */}

          {/* 
          <ErrorMessage name="">
            {(message) => (message ?
              <div className="flex items-center">
                <AiOutlineExclamationCircle className=" mr-1" size="15px" color="red" />
                {message}
              </div> : null)}
          </ErrorMessage> */}


        </Form>
      </Formik>
    </>
  );
};
