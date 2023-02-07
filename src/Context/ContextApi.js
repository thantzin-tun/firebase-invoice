import {createContext,useState,useEffect} from 'react';
import { db } from "../Firabase";
import {addDoc, collection,getDocs,doc,getDoc} from 'firebase/firestore'

export  const FirebaseContext = createContext(null);

export const ContextHook = () => {
     //productState
    const [product,setProduct] = useState([]);

    const [invoice,setInvoice] = useState([]);
    const [singleInvoice,setSingleInvoice] = useState({});

    const product_data= collection(db,"Laptops");
    const invoice_data= collection(db,"Invoice");

   const getProduct = async () => {
        const data = await getDocs(product_data);
        setProduct(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
    } 

    const addProduct = async (item) => {
        await addDoc(product_data,{brand: item.brand,stock: item.stock,price: item.price})
    } 

    const getInvoice = async () => {
        const data = await getDocs(invoice_data);
        setInvoice(data.docs.map((doc) => ({...doc.data(),id:doc.id})));
    } 


    //get Invoice By ID
    const getInvoiceByID  = async (id) => {
        const singleInvoice = doc(db, 'Invoice',id); 
        const data = await getDoc(singleInvoice);
        setSingleInvoice(data.data());
    }

    const addInvoice = async (customerName,invoiceName,info) => {
        let newinfo = info?.slice(1);
        await addDoc(invoice_data,{
            customerName:customerName,
            info:newinfo,
            invoiceName:invoiceName,
        });
    }

    const updateInvoice = async () => {

    }

    const deleteInvoice = async () => {

    }
    
    useEffect(() => {
        getProduct();
        getInvoice();
        addInvoice();
        },[]);


  return {
      product,
      addInvoice,
      updateInvoice,
      deleteInvoice,
      setProduct,
      getProduct,
      addProduct,
      invoice,
      getInvoiceByID,
      singleInvoice,
      getInvoice
  }
}


export const Context = ({children}) => {
    const { state, getProduct, updateProductStock, addInvoice, updateInvoice, deleteInvoice } = ContextHook();
        return(
            <FirebaseContext.Provider value={{ state, getProduct, updateProductStock, addInvoice, updateInvoice, deleteInvoice }}>
                {children}
            </FirebaseContext.Provider>
        )
}