import React from "react";
import Adminnav from "./adminnav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faUser, faCartShopping, faArrowTrendUp } from '@fortawesome/free-solid-svg-icons';
import ApexChart from './Apex-chart';
import "./Admin.css";
import DataTable from "./salestable";

const Admin = () => {




  return (
    <>
    
    
    <div className="allpagediv">
      <Adminnav />
      <div className="top189">
        <h1>Dashboard</h1> </div>

      <div className="details1243">
        <div className="totaluser">
          <div className="icon1">
            <FontAwesomeIcon className="usericonbackground" icon={faUser} />
            <FontAwesomeIcon className="usericon" icon={faUser} />
          </div>
          <div className="title1">
            <h5>Total Users</h5>
            <h2>120</h2>
          </div>
          <div className="graph">
            <ApexChart color="#a030f5dc" />
          </div>
          <div className="changes121">
            <FontAwesomeIcon className="uparrowtrend1" icon={faArrowTrendUp} />
            <h5 className="change19911"> +2% </h5>
          </div>
        </div>

        <div className="totalproduct">
          <div className="icon2">
            <FontAwesomeIcon className="bagiconbackground" icon={faBagShopping} />
            <FontAwesomeIcon className="bagicon" icon={faBagShopping} />
          </div>
          <div className="title2">
            <h5>Total Products</h5>
            <h2>120</h2>
          </div>
          <div className="graph">
            <ApexChart color="#eec344" />
          </div>
          <div className="changes122">
            <FontAwesomeIcon className="uparrowtrend2" icon={faArrowTrendUp} />
            <h5 className="change19912"> +1% </h5>
          </div>
        </div>

        <div className="totalsales">
          <div className="icon3">
            <FontAwesomeIcon className="carticonbackground" icon={faCartShopping} />
            <FontAwesomeIcon className="carticon" icon={faCartShopping} />
          </div>
          <div className="title3">
            <h5>Total Sales</h5>
            <h2>120</h2>
          </div>
          <div className="graph">
            <ApexChart color="#2c9bf7ef" />
          </div>
          <div className="changes123">
            <FontAwesomeIcon className="uparrowtrend3" icon={faArrowTrendUp} />
            <h5 className="change19913"> +12% </h5>
          </div>
        </div>
      </div>

      <div className="bodypart">
        <div className="salesdetails">
          <DataTable />
          
        </div>

       
      </div>
      </div>
    </>
  );
};

export default Admin;
