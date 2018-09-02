// file contains code repeated amongst multiple files
function isEmpty(string) {
    if (!string) {
        return true;
    }

    if (string === '' || string.length == 0) {
        return true;
    }

    return false;
}

//exporting it make it available to other files
module.exports = {
    isEmpty: isEmpty
};