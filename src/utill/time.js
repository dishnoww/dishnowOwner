
// time = "yyyy-MM-dd hh:mm:ss" 


export const getyyyyMMdd = (time) => {
    return time.substring(0,10);
}
export const getyyyy = (time) => {
    return time.substring(0,3);
}
export const getMM = (time) => {
    return time.substring(5,6);
}
export const getdd = (time) => {
    return time.substring(8,9);
}


export const gethhmmss = (time) => {
    return time.substring(11);
}
export const gethh = (time) => {
        return time.substring(11, 13);
}
export const getmm = (time) => {
        return time.substring(14, 16);
}



export const NtoNN = (number) => {
    return (!number ? '00' : number < 10 ? '0' : '') + number;
} 

export const _pushParse = (time) => {
    let newTime = time.substring(0, 10);
    newTime += ' ' + time.substring(11, 19);
    return newTime;
}
