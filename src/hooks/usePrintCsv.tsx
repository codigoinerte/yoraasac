type dataType  = Array<any> | undefined | null;
export const usePrintCsv = () => {

    const convertToCSV = (objArray:any = []) => {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line != '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }

    const getTitles = (data: dataType = [])=> {
        let titles = '';

        if(data == null || data.length == 0) return titles;

        let firstObj = data[0];

        let array = [];
        for(let i in firstObj){
            array.push(i);
        }

        titles =  array.toString();

        return titles;
    }
    const print = (data: dataType = [], fileName = 'Impresion') => {

        let titles = getTitles(data) + '\r\n';
        let csvContent = "data:text/csv;charset=utf-8,"+titles;
        let dataClean = convertToCSV(data);
            csvContent+= dataClean;
            console.log(dataClean);
        // dataClean.forEach((rowArray) => {
            
        //     row = row.join(",");
        //     csvContent += row + "\r\n";
        //   });

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", fileName);
        document.body.appendChild(link); // Required for FF
        
        link.click();
        link.remove();
    }

    return {
        print
    }
}
