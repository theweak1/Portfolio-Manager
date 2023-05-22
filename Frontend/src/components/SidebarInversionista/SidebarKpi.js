import React, { useState,useContext, useEffect } from "react";
import { Link,useLocation } from "react-router-dom";
import '../../index.css';
// import * as FaIcons from "react-icons/fa";//menu icon
// import * as AiIcons from "react-icons/ai";//x icon

import {FaBars} from 'react-icons/fa'
import { AiOutlineClose} from 'react-icons/ai'

import { SidebarData } from "./SidebarData";
import CapTable from '../../routes/CapTable';
import Startups from "../../routes/Startups";
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import CFO from "../../routes/CFO";
export default function SidebarKpi (){
	const location = useLocation();

	

    const [menuKpi, setMenuKpi] = useState(false);

	const auth = useContext(AuthContext);

	const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [loadedStartups, setLoadedStartups] = useState([]);


    useEffect(() => {
		const fetchStartups = async () => {
            if(!auth.token){}
            else{
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_BACKEND_URL}/startup`,
					'GET',
					null,
					{
						Authorization: 'Bearer ' + auth.token
					}
				);
				setLoadedStartups(responseData.startups);
			} catch (err) {}}
		};
		fetchStartups();
	}, [auth.token, sendRequest]);
let captable;
let cfo;


location.pathname.includes("captable") ? captable = true : cfo = true


    return(    
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner asOverlay />
				</div>
			)}
        <div className="fixed flex justify-center right-0 top-32 h-72 sm:h-80 md:h-96 w-12 sm:w-14 md:w-16 transition-all duration-[250ms] ease-out bg-white shadow-md">{/*navbar*/}
                <div className="p-3 text-xl sm:text-2xl md:text-3xl bg-none text-darkGrey ">{/*menu-bars*/}
                    <FaBars onClick={()=>setMenuKpi(!menuKpi)} />{/*menu icon and action*/}
                </div>
            </div>

             {/*open and close the menu*/}         {/*kpi-menu when hidden/active(true) right-0*/}
            <nav className={menuKpi ? "fixed flex justify-center w-44 sm:w-52 md:w-60 top-32 h-72 sm:h-80 md:h-96 right-0 transition-all duration-[250ms] ease-out bg-white shadow-md" 
                                    : "fixed flex justify-center w-44 sm:w-52 md:w-60 top-32 h-72 sm:h-80 md:h-96 -right-full transition-all duration-[250ms] ease-in bg-white shadow-md"}>
                        <ul className="w-full" onClick={()=>setMenuKpi(!menuKpi)}> {/*kpi-menu-items*/}   {/*kpi-menu shown(false) -right-full*/}
                            
                            {/*where the close(X) icon is located*/}
                            <li className="flex justify-start items-start p-3 bg-white border-b-4 border-yellow">{/*container for x*/}
                                <div  className=" text-xl sm:text-2xl md:text-3xl text-darkGrey">{/*menu-cross (x)*/}
                                    <AiOutlineClose />{/*close icon and action*/}
                                </div>
                            </li>
									 <div className="relative overflow-y-scroll h-72 sm:h-80">
                            {loadedStartups.map((startup) => {
										 const destination = captable ? "captable":"cfo"
										 return (
											 <li key={startup.id}>
								<Link to={`/${destination}/${startup.id}`} onClick={() => setMenuKpi(!menuKpi)}>
									{/*nav-text*/}
									<span className="flex justify-start items-center p-5 mx-2 text-md sm:text-xl md:text-2xl rounded-sm text-darkGrey hover:bg-lightGrey hover:opacity-80 hover:bg-opacity-10 shadow-sm">
										{startup.companyName}
									</span>
								</Link>
							</li>
						);
					})}
					</div>
                        </ul>

            </nav>
				
            {captable &&<CapTable />}  
				{cfo && <CFO />}
            </React.Fragment>
    )
};
