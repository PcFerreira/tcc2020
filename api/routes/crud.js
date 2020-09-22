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
            let jsonDataset = JSON.parse(data)
            let keys = Object.keys(jsonDataset);
            let randomNum = keys[Math.floor(keys.length*Math.random())]
            res.send(jsonDataset[randomNum]);
        });
    });
}
module.exports = jsonCrud;