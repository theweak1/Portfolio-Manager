import axios from 'axios';

var baseUrl = process.env.CODAT_BASE_URL;
var authHeaderValue = process.env.CODAT_AUTHORIZATION_HEADER;

var codatApiClient = axios.create({
	baseURL: baseUrl,
	headers: {
		Authorization: authHeaderValue,
		'Content-Type': 'application/json;charset=UTF-8'
	}
});

async function createCompany(companyName) {
	try {
		const response = await codatApiClient.post('/companies', {
			name: companyName,
			description: 'Any additional information about the company'
		});

		return response.data;
	} catch (error) {
		throw error;
	}
}

async function deleteCompany(companyId) {
	try {
		const response = await codatApiClient.delete(`/companies/${companyId}`);

		return response.data;
	} catch (error) {
		throw error;
	}
}

async function getBalanceSheet(companyId, periodLength, periodsToCompare) {
	try {
		const response = await codatApiClient.get(
			`/companies/${companyId}/data/financials/balanceSheet`,
			{
				params: {
					periodLength: periodLength,
					periodsToCompare: periodsToCompare
				}
			}
		);

		return response.data;
	} catch (error) {
		throw error;
	}
}

async function getTransactions(companyId, integrationId) {
	try {
		const response = await codatApiClient.get(
			`/companies/${companyId}/connections/${integrationId}/data`
		);

		return response.data;
	} catch (error) {
		throw error;
	}
}
export { createCompany, deleteCompany, getBalanceSheet };
