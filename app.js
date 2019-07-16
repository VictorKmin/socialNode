const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const friendRouter = require('./routes/friendRouter');

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/friend', friendRouter);

app.use('*', (req, res) => {
    res.status(404).json('Oops')
});

app.listen(3000, err => {
    if (err) console.log(err);
    console.log('Server listen on port 3000');
});


module.exports = app; // just for testing
