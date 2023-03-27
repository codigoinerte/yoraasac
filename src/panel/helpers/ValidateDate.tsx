import { isValid } from "date-fns";

export const ValidateDate = (value:any) => {
    
    if(value == ''|| value == null) return true;

    if (!isValid(new Date(value))) {
      return "Debe ingresar una fecha válida";
    }
  };