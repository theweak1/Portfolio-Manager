import React from 'react';

const ProfitAndLoss = () => {
  const statementData = [
    { name: 'Sales', amount: 1500000 },
    { name: 'Cost of Goods Sold', amount: 1020000 },
    { name: 'Gross Profit', amount: 480000 },
    { name: 'Operating Expenses', amount: 120000 },
    { name: 'Operating Income', amount: 360000 },
    { name: 'Interest Expense', amount: 30000 },
    { name: 'Income Before Taxes', amount: 330000 },
    { name: 'Income Taxes', amount: 99000 },
    { name: 'Net Income', amount: 231000 },
  ];
  console.log(JSON.stringify({ statementData }));
  return (
    <div className="flex items-center justify-end">
      <div className="ml-2">
        <h2 className="text-2xl font-bold mb-5 text-black">Income Statement</h2>
        <table className="table-auto border-collapse border border-gray-800 w-full">
          <tbody>
            {statementData.map((item, index) => (
              <tr key={index} className="text-black">
                <td className="border-2 border-black px-4 py-2 text-left">{item.name}</td>
                <td className="border-2 border-black px-4 py-2 text-right">{item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfitAndLoss;
