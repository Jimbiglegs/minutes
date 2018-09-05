// file contains code repeated amongst multiple files
function isEmpty(obj) {
    if(!obj || obj === null) {
        return true;
    }

    if(Array.isArray(obj) && obj.length === 0) {
        return true;
    }

    if(typeof obj === 'string' && obj.trim() === '') {
        return true;
    }

    return false;
}

//exporting it make it available to other files
module.exports = {
    isEmpty: isEmpty
};