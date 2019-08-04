const express = require('express');
const app = express();
const {resolve: resolvePath} = require('path');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const chalk = require('chalk'); // development

const dataBase = require('./dataBase').getInstance();
dataBase.setModels();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(resolvePath(__dirname, 'public')));
app.use(cors());
app.use(fileUpload());

global.appRoot = __dirname;

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
    res
        .status(err.status || 500)
        .json({
            success: false,
            message: err.message || 'Unknown Error',
            controller: err.controller
        })
});

app.listen(3000, err => {
    if (err) console.log(err);
    console.log('Server listen on port 3000');
    console.log(chalk.magenta(`                                                                                                         
   SSSSSSSSSSSSSSS      OOOOOOOOO             CCCCCCCCCCCCCIIIIIIIIII               AAA               LLLLLLLLLLL             
 SS:::::::::::::::S   OO:::::::::OO        CCC::::::::::::CI::::::::I              A:::A              L:::::::::L             
S:::::SSSSSS::::::S OO:::::::::::::OO    CC:::::::::::::::CI::::::::I             A:::::A             L:::::::::L             
S:::::S     SSSSSSSO:::::::OOO:::::::O  C:::::CCCCCCCC::::CII::::::II            A:::::::A            LL:::::::LL             
S:::::S            O::::::O   O::::::O C:::::C       CCCCCC  I::::I             A:::::::::A             L:::::L               
S:::::S            O:::::O     O:::::OC:::::C                I::::I            A:::::A:::::A            L:::::L               
 S::::SSSS         O:::::O     O:::::OC:::::C                I::::I           A:::::A A:::::A           L:::::L               
  SS::::::SSSSS    O:::::O     O:::::OC:::::C                I::::I          A:::::A   A:::::A          L:::::L               
    SSS::::::::SS  O:::::O     O:::::OC:::::C                I::::I         A:::::A     A:::::A         L:::::L               
       SSSSSS::::S O:::::O     O:::::OC:::::C                I::::I        A:::::AAAAAAAAA:::::A        L:::::L               
            S:::::SO:::::O     O:::::OC:::::C                I::::I       A:::::::::::::::::::::A       L:::::L               
            S:::::SO::::::O   O::::::O C:::::C       CCCCCC  I::::I      A:::::AAAAAAAAAAAAA:::::A      L:::::L         LLLLLL
SSSSSSS     S:::::SO:::::::OOO:::::::O  C:::::CCCCCCCC::::CII::::::II   A:::::A             A:::::A   LL:::::::LLLLLLLLL:::::L
S::::::SSSSSS:::::S OO:::::::::::::OO    CC:::::::::::::::CI::::::::I  A:::::A               A:::::A  L::::::::::::::::::::::L
S:::::::::::::::SS    OO:::::::::OO        CCC::::::::::::CI::::::::I A:::::A                 A:::::A L::::::::::::::::::::::L
 SSSSSSSSSSSSSSS        OOOOOOOOO             CCCCCCCCCCCCCIIIIIIIIIIAAAAAAA                   AAAAAAALLLLLLLLLLLLLLLLLLLLLLLL`));
});


module.exports = app; // just for testing
