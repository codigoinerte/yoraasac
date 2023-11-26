import axios from 'axios';
import { backendApi } from '../api';
import { StockHistorialHelado } from '../panel/interfaces';

export const useStockHeladosHistory = () => {
  
    const rutaEndpoint = '/stock-historial-helado';    
    
    const loadStockHelado = async () =>{
        
        try {
            
            const { data } = await backendApi.get<StockHistorialHelado>(rutaEndpoint);

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
