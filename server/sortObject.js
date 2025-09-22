const typeDef = {
    Timestamp: [],
    Data1: [],
    Data2: []
}

function swapDataIndex (obj = typeDef, ind1, ind2) {
    for (let k of Object.keys(obj)) {
        const temp = obj[k][ind1];
        obj[k][ind1] = obj[k][ind2];
        obj[k][ind2] = temp;
    }
}

function sortObject(obj = typeDef) {

    const newObj = {};
    for (let k of Object.keys(obj)) { //Faccio una brutta copia per sicurezza
        newObj[k] = [...obj[k]];
    }

    const indices = Array.from({length: newObj.Timestamp.length}, (_, i) => i);

    indices.sort((a, b) => {
        if (newObj.Timestamp[a] < newObj.Timestamp[b]) return -1;
        if (newObj.Timestamp[a] > newObj.Timestamp[b]) return 1;
        return 0;
    });

    const keys = Object.keys(obj);

    for (let k of keys) {
        newObj[k] = indices.map(i => newObj[k][i]);
    }

    return newObj;
}

module.exports = sortObject;