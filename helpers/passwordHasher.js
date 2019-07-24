const bcrypt = require('bcrypt');

module.exports.hashPassword = async password => await bcrypt.hash(password, 10);
module.exports.chechHashPassword = async (password, hash) => await bcrypt.compare(password, hash);
