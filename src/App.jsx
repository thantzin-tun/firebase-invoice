import React from "react";
import { AppRoute } from "./router/router";
import { BrowserRouter} from "react-router-dom";
import { SideBarCom } from "./components";
import { Container, Row } from "react-bootstrap";
import { Context } from "./Context";
import "./App.css"

function App() {

  // const { state, getProduct, updateProductStock, addInvoice, updateInvoice, deleteInvoice } = ContextHook();

  return (
    <>
      <BrowserRouter>
        <SideBarCom />
        <Context>
          <Container style={{marginLeft:"150px",padding:"30px"}}>
            <Row>
              <AppRoute />
            </Row>
          </Container>
        </Context>
      </BrowserRouter>
    </>
  )
}


export default App;