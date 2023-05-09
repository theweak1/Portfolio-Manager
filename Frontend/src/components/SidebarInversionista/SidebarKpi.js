import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../../index.css';
// import * as FaIcons from "react-icons/fa";//menu icon
// import * as AiIcons from "react-icons/ai";//x icon

import {FaBars} from 'react-icons/fa'
import { AiOutlineClose} from 'react-icons/ai'

export default function SidebarKpi (){
    const [menuKpi, setMenuKpi] = useState(false);
    return(    
        <>
            <div className="fixed flex justify-center right-0 top-32 h-72 sm:h-80 md:h-96 w-12 sm:w-14 md:w-16 transition-all duration-[250ms] ease-out bg-white shadow-md">{/*navbar*/}
                <Link to="#k" className="p-3 text-xl sm:text-2xl md:text-3xl bg-none text-darkGrey ">{/*menu-bars*/}
                    <FaBars onClick={()=>setMenuKpi(!menuKpi)} />{/*menu icon and action*/}
                </Link>
            </div>

             {/*open and close the menu*/}         {/*kpi-menu when hidden/active(true) right-0*/}
            <nav className={menuKpi ? "fixed flex justify-center w-44 sm:w-52 md:w-60 top-32 h-72 sm:h-80 md:h-96 right-0 transition-all duration-[250ms] ease-out bg-white shadow-md" 
                                    : "fixed flex justify-center w-44 sm:w-52 md:w-60 top-32 h-72 sm:h-80 md:h-96 -right-full transition-all duration-[250ms] ease-in bg-white shadow-md"}>
                        <ul className="w-full" onClick={()=>setMenuKpi(!menuKpi)}> {/*kpi-menu-items*/}   {/*kpi-menu shown(false) -right-full*/}
                            
                            {/*where the close(X) icon is located*/}
                            <li className="flex justify-start items-start p-3 bg-white border-b-4 border-yellow">{/*container for x*/}
                                <Link to="#k" className=" text-xl sm:text-2xl md:text-3xl text-darkGrey">{/*menu-cross (x)*/}
                                    <AiOutlineClose />{/*close icon and action*/}
                                </Link>
                            </li>

                        </ul>


            </nav>
        </>
    )
};
