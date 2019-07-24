const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(fileUpload());

const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');
const friendRouter = require('./routes/friendRouter');

app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/friend', friendRouter);

app.use((req, res, next) => {
    const err = new Error('Page not found');
    err.status = 404;
    next(err)
});

app.use((err, req, res, next) => {
    let e;
    const isSql = err.parent;
    if (isSql) e = err.parent.sqlMessage;
    res
        .status(err.status || 500)
        .json({
            success: false,
            message: e || err.message || 'Unknown Error'
        })
});

app.listen(3000, err => {
    if (err) console.log(err);
    console.log('Server listen on port 3000');
});


module.exports = app; // just for testing
