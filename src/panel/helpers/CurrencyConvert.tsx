export const CurrencyConvert =(valor:any, onlyformat = false)=>{

    let number = parseFloat(valor);
    
    if(isNaN(number)) return (0).toFixed(2);
    
    if(onlyformat) return (number).toFixed(2);

    return new Intl.NumberFormat('es-PE', 
    {
        style: 'currency',
        currency: 'PEN'
    })
    .format(number)
    
}