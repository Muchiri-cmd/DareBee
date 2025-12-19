import axios from "axios";
import { rapidAPIKey } from "./apiKey";

const baseURL = 'https://exercisedb.p.rapidapi.com'

const apiCall = async(url, params) => {
    try {
        const options = {
            method: 'GET',
            url,
            params,
            headers: {
                'x-rapidapi-key': rapidAPIKey,
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
              }              
        };
        const res = await axios.request(options);
        return res.data
    } catch(error){
        console.log('error', error.message)
    }
}

export const getExercisesByBodyPart = async (bodyPart) => {
    return await apiCall(
      `${baseURL}/exercises/bodyPart/${bodyPart.name}`,
    );
  };
  