import React from 'react';
import Image from "next/image";
import invoice from "../../public/invoice1.png";


const Sidebar = () => {
  return (
    <>
    
    <div className="sidebar">
    <div className="radialBackground"></div>
      <div className="sidebar__container">
        
        <div className="sidebar__header">
          <div className="sidebar__logo">
            <h2>
              <span>
              NEXT
                </span>
                 
              <span>INVOICE</span>
            </h2>
          </div>
        </div>

        <div className="sidebar__bottom">
            <Image src={invoice} alt="Invoice Logo" width="75" height="75"/>
        </div>

      </div>
      
    </div>
    </>
    )
}

export default Sidebar;