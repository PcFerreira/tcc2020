const jsonCrud = (app, fs) => {
    
    const datasetsPath = './datasets/johnhopkins.json';

    const readFile = (callback, returnJson = false, filePath = datasetsPath, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = datasetsPath, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    app.get('/data', (req, res) => {
        fs.readFile(datasetsPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });
}
module.exports = jsonCrud;