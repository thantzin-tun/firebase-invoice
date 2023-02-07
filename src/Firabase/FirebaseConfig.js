import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // FireBase Data>>>>>>>>>

  // Two Collections>>>>>>>> Laptops,Invoice
  
  // Laptops Collection and Documents
  //     brand: "Asus"
  //     price: 400000
  //     stock: 21
  
  
  // ---------------------------------------------------------------------
  
  
  // Invoice
  //   customerName:"Thant Zin Tun"    
  //   info:[
  //     {
  //       brandName:"Asus",
  //       qty:2,
  //       price:500000,
  //       total:100000
  //     },
  //     {
  //       brandName:"Lenovo",
  //       qty:2,
  //       price:600000,
  //       total:1200000
  //     },
  //     .......
  //   ]    
  //   invoiceName:"INV 4"    
  
  
  // Add Product,Invoice Print and Creat Invoice
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
