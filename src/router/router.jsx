import { Routes,Route } from "react-router-dom";

import { ProductPage, InvoicePage,OverView, Invoice} from "../screen";


export const AppRoute = () => {
    return (
        <>
            <Routes>
              <Route path="/" element={<ProductPage />}/>
              <Route path="/invoice" element={<InvoicePage />}/>
              <Route path="/overview" element={<OverView />}/>
              <Route path="/page/:invoiceID" element={<Invoice />}/>
            </Routes>
        </>
    )
}