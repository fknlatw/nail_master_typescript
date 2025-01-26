export const isObjectEmpty = (obj: any): boolean => {
    for(let key in obj){
        if(obj[key] === ""){
            return true;
        }  
    }
        return false;
   }