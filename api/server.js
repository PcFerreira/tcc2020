const express = require('express');

const bodyParser = require('body-parser');

const apiMetrics = require('prometheus-api-metrics');


const app = express();

const fs = require('fs');

app.use(apiMetrics());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


const routes = require('./routes/router')(app, fs);

const server = app.listen(3500, () => {
    console.log('listening on port %s...', server.address().port);
});