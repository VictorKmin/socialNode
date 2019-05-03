const express = require('express');
const path = require('path');
const app = express();

const indexPath = path.join(__dirname, 'index.html');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const createUser = require('./controllers/user/createUser');
const getById = require('./controllers/user/getById');
const getByName = require('./controllers/user/getByName');

app.get('/', (req, res) => {
    res.sendFile(indexPath)
});

app.post('/user', createUser);
app.get('/user/:id', getById);
app.get('/user', getByName);

app.use('*', (req, res)=> {
    res.status(404).json('Oops')
});

app.listen(3000, err => {
    if (err) console.log(err);
    console.log('Server listen on port 3000');
});
