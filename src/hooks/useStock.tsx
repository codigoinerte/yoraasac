import axios from 'axios';
import { backendApi } from '../api';
import { StockData } from '../panel/interfaces';

export const useStock = () => {
  
    const rutaEndpoint = '/stock';
    
    const loadStockHelado = async () =>{
        
        try {
            
            const { data } = await backendApi.get<StockData>(rutaEndpoint);

            return data;

        } catch (error) {
            
            if (axios.isAxiosError(error)) {

                const { response } = error??{};
                const { message = '' } = response?.data ?? {};

                return message;                

            } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
            }
        }
    }

    
    return {        
        loadStockHelado,        
    }
}
