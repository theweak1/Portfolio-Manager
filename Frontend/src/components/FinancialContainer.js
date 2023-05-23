import React, { useState, useEffect } from 'react';
import KpiDisplay from './KpiDisplay';
import ProfitAndLoss from './ProfitAndLoss';
import { useContext } from 'react';
import { AuthContext } from '../shared/context/auth-context';
import { useHttpClient } from '../shared/hooks/http-hook';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';

const changeFinancials = [
  { revenue: 45000, costOfGoodsSold: 2000, allExpenses: 3000, operatingExpenses: 2000, cashInBank: 10000 },
  { revenue: 35000, costOfGoodsSold: 7000, allExpenses: 3000, operatingExpenses: 4000, cashInBank: 20000 },
  { revenue: 65000, costOfGoodsSold: 2000, allExpenses: 4000, operatingExpenses: 3000, cashInBank: 80000 },
];

const changeStatement = [
  { name: 'Revenue', amount: 1500000 },
  { name: 'Grossprofit', amount: 1020000 },
  { name: 'Income', amount: 480000 },
  { name: 'Cost Of Sales', amount: 120000 },
  { name: 'Expenses', amount: 360000 },
  { name: 'Assets', amount: 30000 },
  { name: 'Cash in the bank', amount: 330000 },
  { name: 'Liabilites', amount: 99000 },
  { name: 'Equitity', amount: 231000 },
];

const FinancialsContainer = ({startupId}) => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const currentDate = new Date();
const previousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);

const isoDate = previousMonth.toISOString();
//   useEffect(() => {
//   setStatementData([
//     { name: 'Revenue', amount: 0 },
//     { name: 'Grossprofit', amount: 0 },
//     { name: 'Income', amount: 0 },
//     { name: 'Cost Of Sales', amount: 0 },
//     { name: 'Expenses', amount: 0 },
//     { name: 'Assets', amount: 0 },
//     { name: 'Cash in the bank', amount: 0 },
//     { name: 'Liabilites', amount: 0 },
//     { name: 'Equitity', amount: 0 }
//   ])

//   const fetchstatementData =async() => {
//     if(!auth.token || !startupId)
//     {}else{
//       try{
//         const responseData = await sendRequest(`${
//           process.env.REACT_APP_BACKEND_URL}/startup/kpi/${auth.userId}`,"GET",
//             JSON.stringify({periodLength: 1,
//               periodToCompare:1,
//               startMonth:isoDate
//             })
//           ,
//           {
//             Authorization: "Bearer " + auth.token
//           }
//           );

//           setStatementData( responseData)
//       }catch(err) {}};}
//       fetchstatementData()
// },[sendRequest,auth.token,startupId])



  const [monthlyFinancials, setMonthlyFinancials] = useState([
    { revenue: 9000, costOfGoodsSold: 800, allExpenses: 1500, operatingExpenses: 1000, cashInBank: 20000 },
      { revenue: 15000, costOfGoodsSold: 5000, allExpenses: 7000, operatingExpenses: 4000, cashInBank: 30000 },
      { revenue: 25000, costOfGoodsSold: 3000, allExpenses: 4000, operatingExpenses: 5000, cashInBank: 60000 },
      { revenue: 95000, costOfGoodsSold: 8000, allExpenses: 5000, operatingExpenses: 2000, cashInBank: 90000 },
      { revenue: 15000, costOfGoodsSold: 6000, allExpenses: 2000, operatingExpenses: 9000, cashInBank: 20000 },
      { revenue: 45000, costOfGoodsSold: 2000, allExpenses: 3000, operatingExpenses: 2000, cashInBank: 10000 },
      { revenue: 35000, costOfGoodsSold: 7000, allExpenses: 3000, operatingExpenses: 4000, cashInBank: 20000 },
      { revenue: 65000, costOfGoodsSold: 2000, allExpenses: 4000, operatingExpenses: 3000, cashInBank: 80000 },
      { revenue: 55000, costOfGoodsSold: 2000, allExpenses: 4000, operatingExpenses: 2000, cashInBank: 10000 },
      { revenue: 35000, costOfGoodsSold: 3000, allExpenses: 5000, operatingExpenses: 2000, cashInBank: 50000 },
      { revenue: 15000, costOfGoodsSold: 5000, allExpenses: 7000, operatingExpenses: 4000, cashInBank: 30000 },
      { revenue: 25000, costOfGoodsSold: 2000, allExpenses: 2000, operatingExpenses: 2000, cashInBank: 20000 }
  ]);
  const [statementData, setStatementData] = useState([
    { name: 'Revenue', amount: 1500 },
    { name: 'Grossprofit', amount: 1020 },
    { name: 'Income', amount: 48000 },
    { name: 'Cost Of Sales', amount: 12000 },
    { name: 'Expenses', amount: 36000 },
    { name: 'Assets', amount: 30000},
    { name: 'Cash in the bank', amount: 3300 },
    { name: 'Liabilites', amount: 990 },
    { name: 'Equitity', amount: 23100 }
  ]);

  const updateFinancials = () => {
    setMonthlyFinancials(changeFinancials);
    setStatementData(changeStatement);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
    <div className="flex justify-around ">
      <div className=" w-1/2 p-4 mr-2">
        <ProfitAndLoss statementData={statementData} />
      </div>
      <div className=" p-4 ml-2">
        <KpiDisplay monthlyFinancials={monthlyFinancials} startupId={startupId}/>
      </div>
    </div>
    </React.Fragment>
  );
  
};

export default FinancialsContainer;
