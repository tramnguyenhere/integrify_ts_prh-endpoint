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

export default fetchData