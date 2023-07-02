import moment from 'moment';

type tipo = 'date' | 'datetime';

export const DateNow = (tipo: tipo = 'date') => {
    
    let dateNow;

    if(tipo == 'datetime'){

        dateNow = moment(new Date()).format("yyyy-MM-DD hh:mm").toString();
        dateNow.replace(" ", "T")
    }else{
        dateNow = moment(new Date()).format("yyyy-MM-DD").toString();
    }
        
    return dateNow;
}
