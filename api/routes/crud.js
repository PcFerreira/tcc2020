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
        readFile(datasetsPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }
            let jsonDataset = JSON.parse(data)
            let keys = Object.keys(jsonDataset);
            let randomNum = keys[Math.floor(keys.length*Math.random())]
            res.send(jsonDataset[randomNum]);
        });
    });

    app.post('/data', (req, res) => {
        readFile(data => {
            const newKey = Object.keys(data).length + 1;

            data[newKey.toString()] = req.body; 

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('new data inserted');
            });
        }, true);
    });

    app.put('/data', (req, res) => {
        readFile(data => {
            let jsonDataset = JSON.parse(data)
            let keys = Object.keys(jsonDataset);
            let randomNum = keys[Math.floor(keys.length*Math.random())]
            data[randomNum] = req.body;

            writeFile(JSON.stringify(data, null, 2), () =>{
                res.status(200).send(`data key:${randomNum} updated`);
            });
        }, true);
    });

    app.delete('/data', (req, res) => {
        readFile(data => {
            let jsonDataset = JSON.parse(data)
            let keys = Object.keys(jsonDataset);
            let randomNum = keys[Math.floor(keys.length*Math.random())]
            delete data[randomNum];

            writeFile(JSON.stringify(data, null, 2), () =>{
                res.status(200).send(`data key:${randomNum} removed`);
            })

        }, true);
    })
}
module.exports = jsonCrud;