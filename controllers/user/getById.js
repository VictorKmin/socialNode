const db = require('../../dataBase');

module.exports = (req, res) => {
    try {
        const userId = req.params.id;
        const user = db.find(user => user.id == userId);
        if (!user) throw new Error('User is not found');
        res.json(user);
    } catch (e) {
        res.json(e.message)
    }
};
