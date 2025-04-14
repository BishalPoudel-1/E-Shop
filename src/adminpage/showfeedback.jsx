import React from "react";
import Adminnav from "./adminnav";

import "./showfeedback.css";

import DataTable from "./userfeedback";

const Showfeedback = () => {




  return (
    <>
    
    
    <div className="allpagediv1">
      <Adminnav />
      <div className="top1891">
        <h1>User Feedback</h1> </div>

     
    

      <div className="bodypart1">
        <div className="salesdetails1">
          <DataTable />
          
        </div>

       
      </div>
      </div>
    </>
  );
};

export default Showfeedback;
