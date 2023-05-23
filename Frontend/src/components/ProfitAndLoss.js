import React from 'react';


const ProfitAndLoss = ({statementData}) => {
  // const statementData = [
  //   { name: 'Revenue', amount: 1500000 },
  //   { name: 'Grossprofit', amount: 1020000 },
  //   { name: 'Income', amount: 480000 },
  //   { name: 'Cost Of Sales', amount: 120000 },
  //   { name: 'Expenses', amount: 360000 },
  //   { name: 'Assets', amount: 30000 },
  //   { name: 'Cash in the bank', amount: 330000 },
  //   { name: 'Liabilites', amount: 99000 },
  //   { name: 'Equitity', amount: 231000 },
  // ];

  return (
    <div className="p-6  bg-white rounded-xl shadow-md space-y-6 ">
      <div className="ml-2 ">
        <h2 className="text-4xl font-bold mb-5 text-black text-center">Profit & Loss</h2>
        <table className=" table-auto border-collapse border border-gray-800 w-full">
          <tbody>
            {statementData.map((item, index) => (
              <tr key={index} className="text-black text-2xl">
              <td className="border-t-2 border-b-2 border-l-2 border-r-0 border-black px-4 py-2 text-left">{item.name}</td>
              <td className="border-t-2 border-b-2 border-l-0 border-r-2 border-black px-4 py-2 text-right bg-gray-300 rounded shadow">{item.amount.toLocaleString()}</td>
            </tr>
            
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitAndLoss;
