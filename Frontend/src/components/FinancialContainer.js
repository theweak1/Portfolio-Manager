import React, { useState } from 'react';
import KpiDisplay from './KpiDisplay';
import ProfitAndLoss from './ProfitAndLoss';

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

const FinancialsContainer = () => {
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
    { name: 'Income', amount: 480 },
    { name: 'Cost Of Sales', amount: 120 },
    { name: 'Expenses', amount: 360 },
    { name: 'Assets', amount: 300 },
    { name: 'Cash in the bank', amount: 330 },
    { name: 'Liabilites', amount: 99 },
    { name: 'Equitity', amount: 2310 }
  ]);

  const updateFinancials = () => {
    setMonthlyFinancials(changeFinancials);
    setStatementData(changeStatement);
  };

  return (
    <div style={{display: 'flex', justifyContent: 'space-around '}}>
      <ProfitAndLoss statementData={statementData} />
      <KpiDisplay monthlyFinancials={monthlyFinancials} />
      
      {/* <div>
        <UpdateFinancialsButton onUpdate={updateFinancials} />
      </div> */}
    </div>
  );
};

const UpdateFinancialsButton = ({ onUpdate }) => {
  return (
    <button onClick={onUpdate}>Update Financials</button>
  );
};

export default FinancialsContainer;
