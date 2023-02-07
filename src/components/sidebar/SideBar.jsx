import React from "react";
import { Link } from "react-router-dom";
import { SideBarStyle } from "./SideBarStyle";
import {MdOutlineProductionQuantityLimits} from 'react-icons/md'
import {TbFileInvoice} from 'react-icons/tb'
import {IoMdNotificationsOutline} from 'react-icons/io'

export const SideBarCom = () => {
  return (
    <>
      <SideBarStyle bgColor="#06603b" buttonBg="#2a7857" color="white">
        <h1 style={{ color: "lightblue", marginBottom: "30px",fontSize:"1.5rem"}}>Dashboard</h1>
        <Link to="/" className="link">
          <MdOutlineProductionQuantityLimits size="20px" style={{marginRight:"10px"}}/>
          Product
        </Link>
        <Link to="/invoice" className="link">
        <TbFileInvoice size="20px" style={{marginRight:"10px"}}/>
          Invoice
        </Link>
        <Link to="/overview" className="link">
        <TbFileInvoice size="20px" style={{marginRight:"10px"}}/>
          Overview
        </Link>
      </SideBarStyle>
    </>
  )
}