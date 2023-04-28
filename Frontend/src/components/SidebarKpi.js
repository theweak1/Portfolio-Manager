import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../index.css';
import * as FaIcons from "react-icons/fa";//menu icon
import * as AiIcons from "react-icons/ai";//x icon

export default function SidebarKpi (){
    const [menuKpi, setMenuKpi] = useState(false);
    return(    
        <>
            <div className="fixed flex justify-end right-0 top-1/5 h-3/6 md:h-4/6 w-14 md:w-20 bg-white shadow-md">{/*navbar*/}
                <Link to="#k" className="m-4 md:m-5 text-2xl md:text-4xl bg-none text-darkGrey ">{/*menu-bars*/}
                    <FaIcons.FaBars onClick={()=>setMenuKpi(!menuKpi)} />{/*menu icon and action*/}
                </Link>
            </div>

            <nav className={menuKpi ? "fixed flex justify-end w-52 md:w-64 top-1/5 h-3/6 md:h-4/6 right-0 transition-all duration-[100ms] ease-linear bg-white shadow-md" 
                                    : "fixed flex justify-end w-52 md:w-64 top-1/5 h-3/6 md:h-4/6 -right-full transition-all duration-[100ms] ease-linear bg-white shadow-md"}>
                        <ul className="w-full" onClick={()=>setMenuKpi(!menuKpi)}> {/*nav-menu-items*/}   {/*nav-menu shown(false) -left-full*/}
                            
                            {/*where the close(X) icon is located*/}
                            <li className="flex justify-end items-center h-12 md:h-16 w-full bg-darkGrey">{/*container for x*/}
                                <Link to="#k" className=" mr-44 md:mr-52 text-2xl md:text-4xl bg-none text-white">{/*menu-cross (x)*/}
                                    <AiIcons.AiOutlineClose />{/*close icon and action*/}
                                </Link>
                            </li>

                        </ul>


            </nav>
        </>
    )
};
