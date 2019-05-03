const db = require('../../dataBase');
module.exports = (req, res) => {
    const {name, surname, password, email} = req.body;
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
};
