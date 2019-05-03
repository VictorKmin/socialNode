const db = require('../../dataBase');

/**
 * This method using for search user by name
 * Firstly we get name from query object
 * If name is empty or not present we return all users from database
 * If name is not empty we need to filter all users by name and
 * push this users in new array.
 * Then we returns this array to front-end
 * @param req
 * @param res
 * @returns filtered - array of users which names includes name from query
 */
module.exports = (req, res) => {
    const {name} = req.query;
    if (!name) return res.json(db);
    const filtered = db.filter(user => user.name.includes(name));
    res.json(filtered);
};
