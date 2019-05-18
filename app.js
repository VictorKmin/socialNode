const express = require('express');
const path = require('path');
const app = express();

const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

const indexPath = path.join(__dirname, 'index.html');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', async (req, res) => {
    // let pool = require('./dataBase/index');
    // let [query] = await pool.promise().query('SELECT * FROM user');
    // console.log(query);
    res.sendFile(indexPath)
});
const userRouter = require('./routes/userRouter');

app.use('/user', userRouter);

app.use('*', (req, res) => {
    res.status(404).json('Oops')
});

app.listen(3000, err => {
    if (err) console.log(err);
    console.log('Server listen on port 3000');
});
