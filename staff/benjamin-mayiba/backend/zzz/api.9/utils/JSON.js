const fs = require('fs')

function parseFromFile(file, callback) {
    fs.readFile(file, 'utf8', (error, json) => {
        if (error) {
            callback(error);
            return;
        }

        // Verifica si la cadena JSON está vacía
        if (!json.trim()) {
            callback(null, []);  // Devuelve un array vacío si el archivo está vacío
            return;
        }

        try {
            const data = JSON.parse(json);
            callback(null, data);
        } catch (parseError) {
            callback(parseError);
        }
    });
}



function stringifyToFile(file, data, callback) {
    const json = JSON.stringify(data, null, 4)

    fs.writeFile(file, json, error => {
        if (error) {
            callback(error)

            return
        }

        callback(null)
    })
}

module.exports = {
    parse: JSON.parse,
    parseFromFile,
    stringify: JSON.stringify,
    stringifyToFile
}