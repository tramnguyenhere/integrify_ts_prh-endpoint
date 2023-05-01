import axios, { AxiosError } from "axios";
import { Business } from "./types/business";

const baseUrl = 'https://avoindata.prh.fi/bis/v1'

const fetchData = async <T>(endpoint: string) => {
    try {
        const result = await axios<T>(endpoint)
        return result.data
    } catch (e) {
        const error = e as AxiosError
        console.error(error.message);   
    }
}

/**
 * 
 * @param businessId bussiness id
 * @returns specific data for one company
 */
const fetchCompaniesDetails = async (businessId: string) => {
    try {
      const response = await axios.get(
        `${baseUrl}/${businessId}`
      );
      const items = response.data.results[0];
      return items;
    } catch (error) {
      console.error(error + "error fetching company details");
    }
  };

/**
 * 
 * @param maxResults total number of results
 * @param resultFrom the number of results to be skipped
 * @param streetAddressPostCode the postal code address
 * @returns all the companies suit the query
 */
const fetchCompanies = async (maxResults: number, resultFrom: number, streetAddressPostCode: string) => {
    try {
        const url = `${baseUrl}?maxResults=${maxResults}&resultFrom=${resultFrom}&streetAddressPostCode=${streetAddressPostCode}`;

        const companiesResult = await fetchData<{ results: Business[] }>(url)

        const businesses = companiesResult?.results
    
        if (businesses?.length) {
            for (let i = 0; i < businesses?.length; i++) {
                const businessId = businesses[i]?.businessId;
                const companyDetails = await fetchCompaniesDetails(businessId);
                businesses[i] = { ...businesses[i], ...companyDetails }
            }   
        }

        return businesses;
     
    } catch (error) {
        console.error(error)
        return []
    }
   
  }


export const displayData = async (maxResults: number, resultFrom: number, streetAddressPostCode: string) => {
    const result = await fetchCompanies(maxResults, resultFrom, streetAddressPostCode);

    console.log(
      `List of companies with details based on the params: maxResult: ${maxResults}, resultFrom:  ${resultFrom} and streetAddressPostCode:  ${streetAddressPostCode}`
    );

    const convertObjectToString = (_key: string, value: any) => {
        if (
          value === null ||
          value === undefined ||
          typeof value === "string" ||
          typeof value === "number" ||
          Array.isArray(value)
        ) {
          return value;
        }
      
        const entries = Object.entries(value).map(([k, v]) => [
          k,
          typeof v === "object" ? JSON.parse(JSON.stringify(v)) : v,
        ]);
        return Object.fromEntries(entries);
    };
    
    console.log(JSON.stringify(result, convertObjectToString, 2));
  };
