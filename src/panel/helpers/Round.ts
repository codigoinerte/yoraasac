export const Round = (value: any, decimals: number) => {
   
    let formatNumber:number = 0;
    if(typeof value != 'number') formatNumber = parseFloat(value);
    else formatNumber = value;

    const factor = Math.pow(10, decimals);
    return Math.round(formatNumber * factor) / factor;
}
