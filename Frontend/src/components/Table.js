import React, { useState,useEffect } from 'react';

function Table() {
  const [data, setData] = useState([
    ['', '', 0, 0, 0, 0, 0, 0],
    ['', '', 0, 0, 0, 0, 0, 0]
  ]);

  const [membersData, setMembersData] = useState([
    ['', 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0]
  ]);

  const [preRoundData, setPreRoundData] = useState([
    ['', 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0]
  ]);

  const [seedRoundData, setSeedRoundData] = useState([
    ['', 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0]
  ]);

  const [seriesRoundData, setSeriesRoundData] = useState([
    ['', 0, 0, 0, 0, 0, 0, 0],
    ['', 0, 0, 0, 0, 0, 0, 0]
  ]);

 

  const [shares, setShares] = useState(0);
  const [sharePrice, setSharePrice] = useState(0);
  const[preMoneyValuation, setPreMoneyValuation] = useState(0);
  const[preMoneyValuationSeed, setPreMoneyValuationSeed] = useState(0);
  const[preMoneyValuationSeriesRound, setPreMoneyValuationSeriesRound] = useState(0);
  
  const[angelRound, setAngelRound] = useState(0);
  const[seedRound, setSeedRound] = useState(0);
  const [seriesRound, setSeriesRound] = useState(0);
  const [angelPriceShareValue, setAngelPriceShareValue] = useState(0);
  const [seedPriceShareValue, setSeedPriceShareValue] = useState(0);
  const [seriesPriceShareValue, setSeriesPriceShareValue] = useState(0);

  const handleAddRow = () => {
    setData([...data, ['', 0, 0, 0, 0, 0, 0, 0]]);
  };

  const handleAddRowMembers = () => {
    setMembersData([...membersData, ['', 0, 0, 0, 0, 0, 0, 0]]);
  };

  const handleAddRowPreRound = () => {
    setPreRoundData([...preRoundData, ['', 0, 0, 0, 0, 0, 0, 0]]);
  };

  const handleAddRowSeedRound = () => {
    setSeedRoundData([...seedRoundData, ['', 0, 0, 0, 0, 0, 0, 0]]);
  };

  const handleAddRowSeriesRound = () => {
    setSeriesRoundData([...seriesRoundData, ['', 0, 0, 0, 0, 0, 0, 0]]);
  };

  const handleInputChange = (event, rowIndex, columnIndex) => {
    const newData = [...data];
    if (columnIndex === 2) {
      newData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
    } else if (columnIndex === 3) {
      newData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newData[rowIndex][2] = newData[rowIndex][3] * sharePrice;
      newData[rowIndex][5] = newData[rowIndex][3];

    } else if (columnIndex === 4 ) {
      newData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newData[rowIndex][7] = (newData[rowIndex][4] + newData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
    } 
    else if (columnIndex === 5) {
      newData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newData[rowIndex][6] = newData[rowIndex][5] / handleSumAllShareOwnership();
    } 
    else if (columnIndex === 6) {
      newData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
     
    } 
    else{
      newData[rowIndex][columnIndex] = event.target.value.trim();
      newData[rowIndex][7] = (newData[rowIndex][4] + newData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
    }
    setData(newData);
  };

  const handleInputChangeMembers = (event, rowIndex, columnIndex) => {
    const newMembersData = [...membersData];
    if (columnIndex === 2) {
      newMembersData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
    } else if (columnIndex === 3) {
      newMembersData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newMembersData[rowIndex][5] = newMembersData[rowIndex][3];
    } else if (columnIndex === 4 ) {
      newMembersData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newMembersData[rowIndex][7] = (newMembersData[rowIndex][4] + newMembersData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
    } 

    else if (columnIndex === 5) {
      newMembersData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newMembersData[rowIndex][2] = newMembersData[rowIndex][5] * sharePrice;
      newMembersData[rowIndex][6] = newMembersData[rowIndex][5] / handleSumAllShareOwnership();
    } 
    
    else if (columnIndex === 6) {
      newMembersData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
     
    } 
    else{
      newMembersData[rowIndex][columnIndex] = event.target.value.trim() ;
      newMembersData[rowIndex][7] = (newMembersData[rowIndex][4] + newMembersData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
    }
    setMembersData(newMembersData);
  };

  const handleInputChangePreRound = (event, rowIndex, columnIndex) => {
    const newPreRoundData = [...preRoundData];
    if (columnIndex === 1) {
      newPreRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
    } else if (columnIndex === 2) {
      newPreRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      const angelPrice = angelPriceShare();
      newPreRoundData[rowIndex][3] = angelPrice !== 0 ? newPreRoundData[rowIndex][2] / angelPrice : 0;
      newPreRoundData[rowIndex][5] = newPreRoundData[rowIndex][3]; // Update column 5 with the new value
    } else if (columnIndex === 3) {
      newPreRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newPreRoundData[rowIndex][5]=newPreRoundData[rowIndex][3];
      const angelPrice = angelPriceShare();
      newPreRoundData[rowIndex][3] = angelPrice !== 0 ? newPreRoundData[rowIndex][2] / angelPrice : 0;
    } else if (columnIndex === 4) {
      newPreRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newPreRoundData[rowIndex][7] = (newPreRoundData[rowIndex][4] + newPreRoundData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
    } else if (columnIndex === 5) {
      
      newPreRoundData[rowIndex][6] = newPreRoundData[rowIndex][5] / handleSumAllShareOwnership();
    } else {
      newPreRoundData[rowIndex][columnIndex] = event.target.value.trim();
      newPreRoundData[rowIndex][7] = (newPreRoundData[rowIndex][4] + newPreRoundData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
    }
    setPreRoundData(newPreRoundData);
  };
  
  

  const handleInputChangeSeedRound = (event, rowIndex, columnIndex) => {
    const newSeedRoundData = [...seedRoundData];
    if (columnIndex === 2) {
      newSeedRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      const seedPrice = seedPriceShare();
      
      newSeedRoundData[rowIndex][3] = seedPrice !== 0 ? newSeedRoundData[rowIndex][2] / seedPrice : 0;
    } else if (columnIndex === 3) {
      newSeedRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      
    } else if (columnIndex === 4 ) {
      newSeedRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newSeedRoundData[rowIndex][7] = (newSeedRoundData[rowIndex][4] + newSeedRoundData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
    } 
    else if (columnIndex === 5 ) {
      newSeedRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newSeedRoundData[rowIndex][6] = newSeedRoundData[rowIndex][5] / handleSumAllShareOwnership();
    }
      else{
        newSeedRoundData[rowIndex][columnIndex] = event.target.value.trim() ;
        newSeedRoundData[rowIndex][7] = (newSeedRoundData[rowIndex][4] + newSeedRoundData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
      }
    setSeedRoundData(newSeedRoundData);
  };
  
  const handleInputChangeSeriesRound = (event, rowIndex, columnIndex) => {
    const newSeriesRoundData = [...seriesRoundData];
    if (columnIndex === 2) {
      newSeriesRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      const seriesPrice = seriesPriceShare();
      
      newSeriesRoundData[rowIndex][3] = seriesPrice !== 0 ? newSeriesRoundData[rowIndex][2] / seriesPrice : 0;
    } else if (columnIndex === 3) {
      newSeriesRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      
    } else if (columnIndex === 4 ) {
      newSeriesRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      
    } 
    else if (columnIndex === 5 ) {
      newSeriesRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newSeriesRoundData[rowIndex][6] = newSeriesRoundData[rowIndex][5] / handleSumAllShareOwnership();
      newSeriesRoundData[rowIndex][7] = (newSeriesRoundData[rowIndex][4] + newSeriesRoundData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
    }
    else if (columnIndex === 6 ) {
      newSeriesRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
    }
    else if (columnIndex === 7 ) {
      newSeriesRoundData[rowIndex][columnIndex] = event.target.value.trim() === '' ? 0 : parseInt(event.target.value, 10);
      newSeriesRoundData[rowIndex][6] = newSeriesRoundData[rowIndex][5] / handleSumAllShareOwnership();
    }
      else{
        newSeriesRoundData[rowIndex][columnIndex] = event.target.value.trim() ;
        
      }
    setSeriesRoundData(newSeriesRoundData);
  };
  const handleNumberOfShares = (event) => {
    setShares(event.target.value.trim() === '' ? 0 : parseFloat(event.target.value, 10));
  };

  const handleSharePrice = (event) => {
    setSharePrice(event.target.value.trim() === '' ? 0 : parseFloat(event.target.value, 10));
  };

  const handlePreMoneyValuation= (event) => {
    setPreMoneyValuation(event.target.value.trim() === '' ? 0 : parseFloat(event.target.value, 10));
  };

  const handlePreMoneyValuationSeed = (event) => {
    setPreMoneyValuationSeed(event.target.value.trim() === '' ? 0 : parseFloat(event.target.value, 10));
  };

  const handlePreMoneyValuationSeriesRound = (event) => {
    setPreMoneyValuationSeriesRound(event.target.value.trim() === '' ? 0 : parseFloat(event.target.value, 10));
  };

  
  const handleAngelRound = (event) => {
    setAngelRound(event.target.value.trim() === '' ? 0 : parseFloat(event.target.value, 10));
  };

  const handleSeedRound = (event) => {
    setSeedRound(event.target.value.trim() === '' ? 0 : parseFloat(event.target.value, 10));
  };

  const handleSeriesRound = (event) => {
    setSeriesRound(event.target.value.trim() === '' ? 0 : parseFloat(event.target.value, 10));
  };

  const investmentAmountSum = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i][2];
    }
    return sum;
  };

  const membersInvestmentAmountSum = () => {
    let sum = 0;
    for (let i = 0; i < membersData.length; i++) {
      sum += membersData[i][2];
    }
    return sum;
  };

  const preRoundInvestmentAmountSum = () => {
    let sum = 0;
    for (let i = 0; i < preRoundData.length; i++) {
      sum += preRoundData[i][2];
    }
    return sum;
  };

  const seedRoundInvestmentAmountSum = () => {
    let sum = 0;
    for (let i = 0; i < seedRoundData.length; i++) {
      sum += seedRoundData[i][2];
    }
    return sum;
  };

  const serieseRoundInvestmentAmountSum = () => {
    let sum = 0;
    for (let i = 0; i < seriesRoundData.length; i++) {
      sum += seriesRoundData[i][2];
    }
    return sum;
  };

  

const handleSumAllInvestmentAmount = () => {
let sum = 0;
sum = investmentAmountSum() + membersInvestmentAmountSum() + preRoundInvestmentAmountSum() + seedRoundInvestmentAmountSum() + serieseRoundInvestmentAmountSum();
return sum;
};

  const angelSubtotal = () => {
    let total = 0;
    total = numberOfShares() + numberOfMemberShares();
    return total;
  };

  const seedSubtotal = () => {
    let total = 0;
    total = angelSubtotal() + numberOfPreRoundShares();
    return total;
  };

  const seriesSubtotal = () => {
    let total = 0;
    total = seedSubtotal() + numberOfSeedRoundShares();
    return total;
  };

  const PostMoneyValuation = () => {
    let total = 0;
    total = angelRound + preMoneyValuation;
    return total;
  };

  const PostMoneyValuationSeed = () => {
    let total = 0;
    total = seedRound + preMoneyValuationSeed;
    return total;
  };

  const PostMoneyValuationSeriesRound = () => {
    let total = 0;
    total = seriesRound + preMoneyValuationSeriesRound;
    return total;
  };

  const angelPercent = () => {
    const valuation = PostMoneyValuation();
    if (valuation === 0) {
      return "";
    }
    const total = angelRound / valuation;
    if (isNaN(total)) {
      return "";
    }
    return "%" + total;
  };

  const seedPercent = () => {
    const valuation = PostMoneyValuationSeed();
    if (valuation === 0) {
      return "";
    }
    const total = seedRound / valuation;
    if (isNaN(total)) {
      return "";
    }
    return "%" + total;
  };
  
  const seriesRoundPercent = () => {
    const valuation = PostMoneyValuationSeriesRound();
    if (valuation === 0) {
      return "";
    }
    const total = seriesRound / valuation;
    if (isNaN(total)) {
      return "";
    }
    return "%" + total;
  };
  

  const angelPriceShare = () => {
    const subtotal = angelSubtotal();
    if (subtotal === 0 || preMoneyValuation === 0) {
      return 0;
    }
    const total = preMoneyValuation / subtotal;
    return total;
  };
  

  const seedPriceShare = () => {
    const subtotal = seedSubtotal();
    if (subtotal === 0 || preMoneyValuation === 0) {
      return 0;
    }
    const total = preMoneyValuationSeed / subtotal;
    return total;
  };

  const seriesPriceShare = () => {
    const subtotal = seriesSubtotal();
    if (subtotal === 0 || preMoneyValuation === 0) {
      return 0;
    }
    const total = preMoneyValuationSeriesRound / subtotal;
    return total;
  };


  const numberOfShares = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i][3];
    }
    return sum;
  };

  const numberOfMemberShares = () => {
    let sum = 0;
    for (let i = 0; i < membersData.length; i++) {
      sum += membersData[i][3];
    }
    return sum;
  };

  const numberOfPreRoundShares = () => {
    let sum = 0;
    for (let i = 0; i < preRoundData.length; i++) {
      sum += preRoundData[i][3];
    }
    return sum;
  };

  const numberOfSeedRoundShares = () => {
    let sum = 0;
    for (let i = 0; i < seedRoundData.length; i++) {
      sum += seedRoundData[i][3];
    }
    return sum;
  };

  const numberOfSeriesRoundShares = () => {
    let sum = 0;
    for (let i = 0; i < seriesRoundData.length; i++) {
      sum += seriesRoundData[i][3];
    }
    return sum;
  };

  const optionShares = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i][4];
    }
    return sum;
  };

  const MembersOptionShares = () => {
    let sum = 0;
    for (let i = 0; i < membersData.length; i++) {
      sum += membersData[i][4];
    }
    return sum;
  };

  const handleSumAllOptionShares = () => {
    let sum = 0;
    sum = optionShares() + MembersOptionShares();
    return sum;
    };
    

  const sharesOwnership = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i][5];
    }
    return sum;
  };

  const MemberSharesOwnership = () => {
    let sum = 0;
    for (let i = 0; i < membersData.length; i++) {
      sum += membersData[i][5];
    }
    return sum;
  };

  const preRoundSharesOwnership = () => {
    let sum = 0;
    for (let i = 0; i < preRoundData.length; i++) {
      sum += preRoundData[i][5];
    }
    return sum;
  };

  
  const seedRoundSharesOwnership = () => {
    let sum = 0;
    for (let i = 0; i < seedRoundData.length; i++) {
      sum += seedRoundData[i][5];
    }
    return sum;
  };

  const seriesRoundSharesOwnership = () => {
    let sum = 0;
    for (let i = 0; i < seriesRoundData.length; i++) {
      sum += seriesRoundData[i][5];
    }
    return sum;
  };

  const handleSumAllShareOwnership = () => {
    let sum = 0;
    sum = sharesOwnership() + MemberSharesOwnership() + preRoundSharesOwnership() + seedRoundSharesOwnership() + seriesRoundSharesOwnership(); 
    return sum;
    };
//Sums values of the Ownership percentaje on each rows


  const percentOwnership = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i][6];
    }
    return sum;
  };

  const percentOwnershipMembers = () => {
    let sum = 0;
    for (let i = 0; i < membersData.length; i++) {
      sum += membersData[i][6];
    }
    return sum;
  };

  const percentOwnershipPreRound = () => {
    let sum = 0;
    for (let i = 0; i < preRoundData.length; i++) {
      sum += preRoundData[i][6];
    }
    return sum;
  };

  const percentOwnershipSeedRound = () => {
    let sum = 0;
    for (let i = 0; i < seedRoundData.length; i++) {
      sum += seedRoundData[i][6];
    }
    return sum;
  };

  const percentOwnershipSeriesRound = () => {
    let sum = 0;
    for (let i = 0; i < seriesRoundData.length; i++) {
      sum += seriesRoundData[i][6];
    }
    return sum;
  };

  const sumOfOwnershipPercent = () => {
    let sum = 0;
    sum = percentOwnership() + percentOwnershipMembers() + percentOwnershipPreRound() + percentOwnershipSeedRound() + percentOwnershipSeriesRound();
    return sum*100;
  };

  const dilutedOwnership = () => {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i][7];
    }
    return sum;
  };

  const dilutedOwnershipMembers = () => {
    let sum = 0;
    for (let i = 0; i < membersData.length; i++) {
      sum += membersData[i][7];
    }
    return sum;
  };

  const dilutedOwnershipPreRound = () => {
    let sum = 0;
    for (let i = 0; i < preRoundData.length; i++) {
      sum += preRoundData[i][7];
    }
    return sum;
  };

  const dilutedOwnershipSeedRound = () => {
    let sum = 0;
    for (let i = 0; i < seedRoundData.length; i++) {
      sum += seedRoundData[i][7];
    }
    return sum;
  };

  const dilutedOwnershipSeriesRound = () => {
    let sum = 0;
    for (let i = 0; i < seriesRoundData.length; i++) {
      sum += seriesRoundData[i][7];
    }
    return sum;
  };

  const dilutedOwnershipSum = () => {
    let sum = 0;
    sum = dilutedOwnership() + dilutedOwnershipMembers() + dilutedOwnershipPreRound() + dilutedOwnershipSeedRound() + dilutedOwnershipSeriesRound();
    return sum*100;
  };

  useEffect(() => {
    // Update column 6 when handleSumAllShareOwnership() changes
    const newData = [...data];
    newData.forEach((row, rowIndex) => {
      const result = newData[rowIndex][5] / handleSumAllShareOwnership();
      newData[rowIndex][6] = isNaN(result) ? "" : result;
    });
    if (JSON.stringify(newData) !== JSON.stringify(data)) {
      setData(newData);
    }
  }, [handleSumAllShareOwnership, data]);
  
  useEffect(() => {
    // Update column 7 when handleSumAllOptionShares() or handleSumAllShareOwnership() changes
    const newData = [...data];
    newData.forEach((row, rowIndex) => {
      const result = (newData[rowIndex][4] + newData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
      newData[rowIndex][7] = isNaN(result) ? "" : result;
    });
    if (JSON.stringify(newData) !== JSON.stringify(data)) {
      setData(newData);
    }
  }, [handleSumAllOptionShares, handleSumAllShareOwnership, data]);
  
  useEffect(() => {
    // Update column 6 when handleSumAllShareOwnership() changes
    const newMembersData = [...membersData];
    newMembersData.forEach((row, rowIndex) => {
      const result = newMembersData[rowIndex][5] / handleSumAllShareOwnership();
      newMembersData[rowIndex][6] = isNaN(result) ? "" : result;
    });
    if (JSON.stringify(newMembersData) !== JSON.stringify(membersData)) {
      setData(newMembersData);
    }
  }, [handleSumAllShareOwnership, membersData]);
  
  useEffect(() => {
    // Update column 7 when handleSumAllOptionShares() or handleSumAllShareOwnership() changes
    const newMembersData = [...membersData];
    newMembersData.forEach((row, rowIndex) => {
      const result = (newMembersData[rowIndex][4] + newMembersData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
      newMembersData[rowIndex][7] = isNaN(result) ? "" : result;
    });
    if (JSON.stringify(newMembersData) !== JSON.stringify(membersData)) {
      setData(newMembersData);
    }
  }, [handleSumAllOptionShares, handleSumAllShareOwnership, membersData]);

  useEffect(() => {
    // Update column 6 when handleSumAllShareOwnership() changes
    const newPreRoundData = [...preRoundData];
    newPreRoundData.forEach((row, rowIndex) => {
      const result = newPreRoundData[rowIndex][5] / handleSumAllShareOwnership();
      newPreRoundData[rowIndex][6] = isNaN(result) ? "" : result;
    });
    if (JSON.stringify(newPreRoundData) !== JSON.stringify(preRoundData)) {
      setData(newPreRoundData);
    }
  }, [handleSumAllShareOwnership, preRoundData]);
  
  useEffect(() => {
    // Update column 7 when handleSumAllOptionShares() or handleSumAllShareOwnership() changes
    const newPreRoundData = [...preRoundData];
    newPreRoundData.forEach((row, rowIndex) => {
      const result = (newPreRoundData[rowIndex][4] + newPreRoundData[rowIndex][5]) / (handleSumAllOptionShares() + handleSumAllShareOwnership());
      newPreRoundData[rowIndex][7] = isNaN(result) ? "" : result;
    });
    if (JSON.stringify(newPreRoundData) !== JSON.stringify(preRoundData)) {
      setData(newPreRoundData);
    }
  }, [handleSumAllOptionShares, handleSumAllShareOwnership, preRoundData]);
  
  useEffect(() => {
    const calculatedAngelPriceShare = angelPriceShare();
    setAngelPriceShareValue(calculatedAngelPriceShare);
  }, [angelPriceShare]);

  useEffect(() => {
    const calculatedSeedPriceShare = seedPriceShare();
    setSeedPriceShareValue(calculatedSeedPriceShare);
  }, [seedPriceShare]);

  useEffect(() => {
    const calculatedSeriesPriceShare = seriesPriceShare();
    setSeriesPriceShareValue(calculatedSeriesPriceShare);
  }, [seriesPriceShare]);
  
  

  console.log(JSON.stringify({ data, membersData, preRoundData, seedRoundData, 
    seriesRoundData ,shares, sharePrice, angelRound,preMoneyValuation,
    seedRound, preMoneyValuationSeed,seriesRound,preMoneyValuationSeriesRound})); 
  


  return (
    <div>
      <div>
      <table className="w-full table-fixed">
        <thead>
          <tr className="   text-white bg-darkGrey">
            <th>Name</th>
            <th></th>
            <th>Investment amount</th>
            <th>#shares</th>
            <th>Option shares</th>
            <th>Issued and outstandings # shares Ownership as of today's date</th>
            <th>% Ownership as of today's date</th>
            <th>% fully diluted ownership as of today's date</th>
          </tr>
          <tr>
            <th className="text-white bg-lightGrey border-black">Founders</th>
          </tr>
          <tr>
            <th className="text-white bg-lightGrey border-black">#Shares</th>
            <th className='border border-black'>
              <input
              className='bg-yellow bg-opacity-50 w-full'
                type="number"
                value={shares}
                onChange={handleNumberOfShares}
              />
            </th>
            <th>{shares == numberOfShares() ? 'Check: True' : 'Check: False'}</th>
          </tr>
          <tr>
            <th className="text-white bg-lightGrey border-black">Price per shares</th>
            <th className='border border-black'>
              <input
                className='bg-yellow bg-opacity-50 w-full'
                type="number"
                value={sharePrice}
                onChange={handleSharePrice}
              />
            </th>
            <th></th>
          </tr>
          <tr className="text-white bg-grey border-black">
            <th>Founders</th>
            <th></th>
            <th>{investmentAmountSum()}</th>
            <th>{numberOfShares()}</th>
            <th>{optionShares()}</th>
            <th>{sharesOwnership()}</th>
            <th>{percentOwnership()} </th>
            <th>{dilutedOwnership()} </th>
          </tr>
        </thead>
        <tbody >
  {data.map((row, rowIndex) => (
    <tr key={rowIndex} className="border-black border-2 " >
      {row.map((cell, columnIndex) => (
        <td key={columnIndex} className="border-black border-2">
          <input
          className={`${columnIndex === 0 ||columnIndex === 1 || columnIndex === 3 ||columnIndex === 4 ? 'bg-yellow bg-opacity-50 w-full' : ''}`}
            type="text"
            value={cell}
            onChange={(event) => handleInputChange(event, rowIndex, columnIndex)}
            readOnly={columnIndex === 2 ||  columnIndex === 5 ||columnIndex === 6 || columnIndex ===  7}
          />
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>
     

      <button onClick={handleAddRow} className='w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg'>Add Row</button>
    </div>
    {/* SECOND TABLE STARTS HERE */}
    <div>
    <table className="w-full table-fixed">
        <thead>
          <tr >
            <th className="text-white bg-lightGrey border-black">New Team & Advisors</th>
          </tr>
          <tr>
            <th className="text-white bg-lightGrey border-black">#Shares</th>
            <th className='border border-black'>
              <input
               className='bg-yellow bg-opacity-50 w-full'
                type="number"
                value={shares}
                onChange={handleNumberOfShares}
              />
            </th>
            <th></th>
          </tr>
          <tr>
            <th className="text-white bg-lightGrey border-black">Price per shares</th>
            <th className='border border-black'>
              <input
                className='bg-yellow bg-opacity-50 w-full'
                type="number"
                value={sharePrice}
                onChange={handleSharePrice}
              />
            </th>
            <th></th>
          </tr>
          <tr className="text-white bg-grey border-black">
            <th>Member</th>
            <th>Option/Purchase Price</th>
            <th>{membersInvestmentAmountSum()}</th>
            <th>{numberOfMemberShares()}</th>
            <th>{MembersOptionShares()}</th>
            <th>{MemberSharesOwnership()}</th>
            <th>{percentOwnershipMembers()} </th>
            <th>{dilutedOwnershipMembers()} </th>
          </tr>
        </thead>
        <tbody className="">
  {membersData.map((row, rowIndex) => (
    <tr key={rowIndex} className="border-black ">
      {row.map((cell, columnIndex) => (
        <td key={columnIndex} className="border-black border-2">
          <input
            className={`${columnIndex === 0|| columnIndex === 1 || columnIndex === 3 || columnIndex === 4 ? 'bg-yellow bg-opacity-50 w-full' : ''}`}
            type="text"
            value={cell}
            onChange={(event) => handleInputChangeMembers(event, rowIndex, columnIndex)}
            readOnly={columnIndex === 2 || columnIndex === 5 || columnIndex === 6 || columnIndex ===  7}
          />
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>
     

      <button onClick={handleAddRowMembers} className='w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg'>Add Row</button>
    </div>
    {/* //THIRD TABLE STARTS HERE */}
    <div>
    <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="text-white bg-grey border-black">PRE-SEED Round</th>
            <th className="border border-black">
              <input
                className='bg-yellow bg-opacity-50 w-full'
                type="number"
                value={angelRound}
                onChange={handleAngelRound}
              />
            </th>
            <th>{angelPercent()}</th>
          </tr>
          
          <tr>
            <th className="text-white bg-lightGrey border-black">Pre-Money Valuation</th>
            <th className="border border-black">
              <input
                className='bg-yellow bg-opacity-50 w-full'
                type="number"
                value={preMoneyValuation}
                onChange={handlePreMoneyValuation}
              />
            </th>
            
          </tr>
          <tr>
            <th className="text-white bg-lightGrey border-black">Post-Money Valuation</th>
            <th>{PostMoneyValuation()}</th>
            <th>{angelRound == preRoundInvestmentAmountSum() ? 'Check: True' : 'Check: False'}</th>
            
            <th className="text-white bg-lightGrey border-black">Subtotal: </th>
            <th>{angelSubtotal()}</th>
          </tr>
          <tr>
            <th className="text-white bg-lightGrey border-black">Price per Share</th>
            <th>{angelPriceShare()}</th>
          </tr>
          <tr className="text-white bg-grey border-black">
            <th>PRE-SEED ROUND</th>
            <th></th>
            <th>{preRoundInvestmentAmountSum()}</th>
            <th>{numberOfPreRoundShares()}</th>
            <th></th>
            <th>{preRoundSharesOwnership()}</th>
            <th>{percentOwnershipPreRound()} </th>
            <th>{dilutedOwnershipPreRound()} </th>
          </tr>
        </thead>
        <tbody>
  {preRoundData.map((row, rowIndex) => (
    <tr key={rowIndex} className="border-black border-2">
      {row.map((cell, columnIndex) => (
        <td key={columnIndex} className="border-black border-2">
          <input
            className={`${columnIndex === 0 ||columnIndex === 1 || columnIndex === 2 ? 'bg-yellow bg-opacity-50 w-full' : ''}`}
            type="text"
            value={cell}
            onChange={(event) => handleInputChangePreRound(event, rowIndex, columnIndex)}
            readOnly={columnIndex === 3 ||columnIndex === 4 ||columnIndex === 5 ||  columnIndex === 6 || columnIndex ===  7}
          />
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>
     

      <button onClick={handleAddRowPreRound} className='w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg'>Add Row</button>
    </div>
    {/* //TABLE 4 STARTS HERE SEEDROUND */}
    <div>
    <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="text-white bg-grey border-black">SEED ROUND</th>
            <th className="border border-black">
              <input
                className='bg-yellow bg-opacity-50 w-full'
                type="text"
                value={seedRound}
                onChange={handleSeedRound}
              />
            </th>
            <th>{seedPercent()}</th>
            </tr>
            <tr>
            <th className="text-white bg-lightGrey border-black">Pre-Money Valuation</th>
            <th className="border border-black">
              <input
                className='bg-yellow bg-opacity-50 w-full'
                type="text"
                value={preMoneyValuationSeed}
                onChange={handlePreMoneyValuationSeed}
              />
            </th>
            <th className="text-white bg-lightGrey border-black">Subtotal: </th>
            <th>{seedSubtotal()}</th>
            </tr>
            <tr>
            <th className="text-white bg-lightGrey border-black">Post-Money Valuation</th>
            <th>{PostMoneyValuationSeed()}</th>
            <th>{seedRound == seedRoundInvestmentAmountSum() ? 'Check: True' : 'Check: False'}</th>
            </tr>
            <tr>
            <th className="text-white bg-lightGrey border-black">Price per Share</th>
            <th>{seedPriceShare()}</th>
            </tr>
            <tr className="text-white bg-grey border-black">
              <th >SEED ROUND</th>
              <th></th>
            <th>{seedRoundInvestmentAmountSum()}</th>
            <th>{numberOfSeedRoundShares()}</th>
            <th></th>
            <th>{seedRoundSharesOwnership()}</th>
            <th>{percentOwnershipSeedRound()} </th>
            <th>{dilutedOwnershipSeedRound()} </th>
          </tr>
        </thead>
        <tbody>
  {seedRoundData.map((row, rowIndex) => (
    <tr key={rowIndex} className="border-black border-2">
      {row.map((cell, columnIndex) => (
        <td key={columnIndex} className="border-black border-2">
          <input
            className={`${columnIndex === 0 ||columnIndex === 1 || columnIndex === 2 ? 'bg-yellow bg-opacity-50 w-full' : ''}`}
            type="text"
            value={cell}
            onChange={(event) => handleInputChangeSeedRound(event, rowIndex, columnIndex)}
            readOnly={columnIndex === 3 ||columnIndex === 4 ||columnIndex === 5 ||  columnIndex === 6 || columnIndex ===  7}
          />
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>
     

      <button onClick={handleAddRowSeedRound} className='w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg'>Add Row</button>
    </div>
    {/* //TABLE 5 STARTS HERE SERIES ROUND */}
    <div>
    <table className="w-full table-fixed">
        <thead>
          <tr>
            <th className="text-white bg-grey border-black">SERIES A ROUND</th>
            <th className='border border-black'>
              <input
                className='bg-yellow bg-opacity-50 w-full'
                type="number"
                value={seriesRound}
                onChange={handleSeriesRound}
              />
            </th>
            <th>{seriesRoundPercent()}</th>
          </tr>
          
          <tr>
            <th className="text-white bg-lightGrey border-black">Pre-Money Valuation</th>
            <th className="border border-black">
              <input
                className='bg-yellow bg-opacity-50 w-full'
                type="number"
                value={preMoneyValuationSeriesRound}
                onChange={handlePreMoneyValuationSeriesRound}
              />
            </th>
            <th className="text-white bg-lightGrey border-black">Subtotal: </th>
            <th>{seriesSubtotal()}</th>
            
          </tr>
          <tr>
            <th className="text-white bg-lightGrey border-black">Post-Money Valuation</th>
            <th>{PostMoneyValuationSeriesRound()}</th>
            <th>{seedRound == serieseRoundInvestmentAmountSum() ? 'Check: True' : 'Check: False'}</th>
            
          </tr>
          <tr>
            <th className="text-white bg-lightGrey border-black">Price per Share</th>
            <th>{seriesPriceShare()}</th>
          </tr>
          <tr className="text-white bg-grey border-black">
            <th>SERIES A ROUND</th>
            <th></th>
            <th>{serieseRoundInvestmentAmountSum()}</th>
            <th>{numberOfSeriesRoundShares()}</th>
            <th></th>
            <th>{seriesRoundSharesOwnership()}</th>
            <th>{percentOwnershipSeriesRound()} </th>
            <th>{dilutedOwnershipSeriesRound()} </th>
          </tr>
        </thead>
        <tbody>
  {seriesRoundData.map((row, rowIndex) => (
    <tr key={rowIndex} className="border-black border-2">
      {row.map((cell, columnIndex) => (
        <td key={columnIndex} className="border-black border-2">
          <input
            className={`${columnIndex === 0 ||columnIndex === 1 || columnIndex === 2 ? 'bg-yellow bg-opacity-50 w-full' : ''}`}
            type="text"
            value={cell}
            onChange={(event) => handleInputChangeSeriesRound(event, rowIndex, columnIndex)}
            readOnly={columnIndex === 3 ||columnIndex === 4 ||columnIndex === 5 ||  columnIndex === 6 || columnIndex ===  7}
          />
        </td>
      ))}
    </tr>
  ))}
</tbody>
      </table>
     

      <button onClick={handleAddRowSeriesRound} className='w-full my-5 py-2 bg-yellow shadow-lg shadow-yellow-500/50 hover:shadow-yellow-500/40 text-black font-semibold rounded-lg'>Add Row</button>
    </div>
    <div >
      <table className="w-full table-fixed">
        <thead >
          <tr >
            <th className="border-black border-2 text-white bg-grey">Total</th>
            <th className="border-black border-2"></th>
            <th className="border-black border-2 text-white bg-grey">{handleSumAllInvestmentAmount()}</th>
            <th className="border-black border-2"></th>
            <th className="border-black border-2 text-white bg-grey">{handleSumAllOptionShares()}</th>
            <th className="border-black border-2 text-white bg-grey">{handleSumAllShareOwnership()}</th>
            <th className="border-black border-2 text-white bg-grey">{sumOfOwnershipPercent()}</th>
            <th className="border-black border-2 text-white bg-grey">{dilutedOwnershipSum()}</th>


          </tr>
        </thead>
      </table>
    </div>
    </div>
    
  );
}

export default Table;
