import React, { useState, useEffect } from 'react';

const KpiDisplay = () => {
  const [timeframe, setTimeframe] = useState('monthly');
    //When we add the json data we can change the array to something like; let monthlyFinancials = kpiData 
  let monthlyFinancials = [
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
    { revenue: 25000, costOfGoodsSold: 2000, allExpenses: 2000, operatingExpenses: 2000, cashInBank: 20000 },
  ];

  const [financials, setFinancials] = useState([monthlyFinancials[monthlyFinancials.length - 1]]);
  
  useEffect(() => {
    const lastThreeMonths = monthlyFinancials.slice(-3);
    setFinancials(lastThreeMonths);
  }, []);

  useEffect(() => {
    const timeframeLength = timeframe === 'monthly' ? 1 : timeframe === 'trimester' ? 3 : 12;
    const newFinancials =
      timeframe === 'monthly'
        ? monthlyFinancials.slice(-2)
        : monthlyFinancials.slice(-timeframeLength);
  
    setFinancials(newFinancials);
  }, [timeframe]);

  const calculateKpis = (financialsArray) => {
    const totalRevenue = financialsArray.reduce((total, month) => total + month.revenue, 0);
    const totalCostOfGoodsSold = financialsArray.reduce((total, month) => total + month.costOfGoodsSold, 0);
    const totalAllExpenses = financialsArray.reduce((total, month) => total + month.allExpenses, 0);
    const totalOperatingExpenses = financialsArray.reduce((total, month) => total + month.operatingExpenses, 0);
  
    const grossProfit = ((totalRevenue - totalCostOfGoodsSold) / totalRevenue).toFixed(2);
    const netProfit = ((totalRevenue - totalAllExpenses) / totalRevenue).toFixed(2);
    const operatingRatio = (totalOperatingExpenses / totalRevenue).toFixed(2);
  
    let revenueGrowth = '0';
    if (financialsArray.length >= 2) {
      const currentRevenue = financialsArray[financialsArray.length - 1].revenue;
      const previousRevenue = financialsArray[financialsArray.length - 2].revenue;
      revenueGrowth = ((currentRevenue / previousRevenue) - 1).toFixed(2);
    } else if (financialsArray.length === 1) {
      revenueGrowth = 'N/A';
    }
    const cashBurnMonths = monthlyFinancials.length >= 3 ? 3 : monthlyFinancials.length;
    const lastMonthsExpenses = monthlyFinancials.slice(-cashBurnMonths).reduce((total, month) => total + month.operatingExpenses, 0);
    const cashBurnRate = (lastMonthsExpenses / cashBurnMonths).toFixed(2); // Always calculated based on the last three months or less
    const runway = cashBurnRate !== '0.00' ? (financialsArray[financialsArray.length - 1].cashInBank / cashBurnRate).toFixed(2) : '0';
  
    return { grossProfit, netProfit, operatingRatio, revenueGrowth, cashBurnRate, runway };
  };
  
  

  const kpis = calculateKpis(financials);
  console.log(JSON.stringify({ monthlyFinancials }));

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-semibold">KPIs</h2>
      <div className="flex space-x-4">
        <button
          className={`py-2 px-4 rounded ${timeframe === 'monthly' ? 'bg-yellow text-black font-bold' : 'bg-white text-black  border-2 border-yellow'}`}
          onClick={() => setTimeframe('monthly')}
        >
          Monthly
        </button>
        <button
          className={`py-2 px-4 rounded ${timeframe === 'trimester' ? 'bg-yellow text-black font-bold' : 'bg-white text-black  border-2 border-yellow'}`}
          onClick={() => setTimeframe('trimester')}
        >
          Trimester
        </button>
        <button
          className={`py-2 px-4 rounded ${timeframe === 'yearly' ? 'bg-yellow text-black font-bold' : 'bg-white text-black  border-2 border-yellow'}`}
          onClick={() => setTimeframe('yearly')}
        >
          Yearly
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(kpis).map(([key, value]) => (
          <div key={key} className="p-4 bg-gray-100 rounded shadow">
            <h3 className="font-semibold text-lg">{key.charAt(0).toUpperCase() + key.slice(1)}</h3>
            <p className="text-gray-700">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KpiDisplay;
