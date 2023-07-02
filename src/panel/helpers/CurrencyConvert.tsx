export const CurrencyConvert =(valor:any)=>{

    let number = parseFloat(valor);
    
    if(isNaN(number)) return false;

    return new Intl.NumberFormat('es-PE', 
    {
        style: 'currency',
        currency: 'PEN'
    })
    .format(number)
    
}