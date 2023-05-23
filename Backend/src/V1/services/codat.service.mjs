import axios from 'axios';

const baseUrl = 'https://api.codat.io';

const options = {
  method: 'GET',
  url: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: process.env.CODAT_AUTHORIZATION_HEADER,
  },
};

async function createCompany(companyName) {
  try {
    const response = await axios.request({
      ...options,
      method: 'POST',
      url: `${baseUrl}/companies`,
      data: {
        name: companyName,
        description: 'Any additional information about the company',
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

async function deleteCompany(companyId) {
  try {
    const response = await axios.request({
      ...options,
      method: 'DELETE',
      url: `${baseUrl}/companies/${companyId}`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getBalanceSheet(companyId, periodLength, periodsToCompare,startMonth) {
  try {
    const response = await axios.request({
      ...options,
      url: `${baseUrl}/companies/${companyId}/data/financials/balanceSheet`,
      params: {
        periodLength,
        periodsToCompare,
        startMonth
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getProfitAndLoss(companyId, periodLength, periodsToCompare,startMonth) {
  try {
    const response = await axios.request({
      ...options,
      url: `${baseUrl}/companies/${companyId}/data/financials/profitAndLoss`,
      params: {
        periodLength,
        periodsToCompare,
        startMonth
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export { createCompany, deleteCompany, getBalanceSheet, getProfitAndLoss };
