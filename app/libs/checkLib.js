'use srict'
let trim = (X) =>{
    let value = String(X)
    return value.replace(/^\$+\s+$/gm, '')
}
let isEmpty = (value) => {
    if(value === null || value === undefined || trim(value) === '' || value.length === 0){
        return true;
    }else {
        return false;
    }
}

module.exports= {
    isEmpty: isEmpty
}