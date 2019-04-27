const express = require('express');
const path = require('path');
const app = express();

const db = [
    {
        name: 'Dima',
        surname: 'Petrov',
        password: '12345',
        email: 'dimasik@mail.ru',
        id: 1
    }
];
const indexPath = path.join(__dirname, 'index.html');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.sendFile(indexPath)
});

app.post('/user', (req, res) => {
    const {name, surname, password, email} = req.body;
    // const id = db.length + 1;
    console.log(name);
    console.log(email);
    const user = {
        id: db.length + 1,
        name,
        surname,
        password,
        email
    };
    db.push(user);
    console.log('USER IS CREATED');
    res.redirect('/')
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    let user = db.find(user => user.id == userId);
    if (!user) user = 'User is not found';
    res.json(user);
});

app.use('*', (req, res)=> {
    res.status(404).json('Oops')
});

app.listen(3000, err => {
    if (err) console.log(err);
    console.log('Server listen on port 3000');
});