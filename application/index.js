const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000;

// Import all function modules

const addToWallet = require('./1_addToWallet');
const addDocHash = require('./2_addDocHash');
const getDocData = require('./3_getDocData');


// Define Express app settings
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('title', 'Doc App');

app.get('/', (req, res) => res.send('Hi There, Welcome to the Doc App'));

app.post('/addToWallet', (req, res) => {
    addToWallet.execute(req.body.certificatePath, req.body.privateKeyPath).then (() => {
        console.log('User Credentials added to wallet');
        const result = {
            status: 'success',
            message: 'User credentials added to wallet'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});

app.post('/addDocHash', (req, res) => {
    addDocHash.execute(req.body.hashId, req.body.metadata).then (() => {
        console.log('Add new doc request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Add new doc request  submitted on the Network is success'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});


app.post('/getDocData', (req, res) => {
    getDocData.execute(req.body.hashId).then (() => {
        console.log('Get doc details request submitted on the Network');
        const result = {
            status: 'success',
            message: 'Get doc details request submitted on the Network is success'
        };
        res.json(result);
    })
    .catch((e) => {
        const result = {
            status: 'error',
            message: 'Failed',
            error: e
        };
        res.status(500).send(result);
    });
});



app.listen(port, () => console.log(`Distributed Document App listening on port ${port}!`));
