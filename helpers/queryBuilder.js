const ControllerError = require('../error/ControllerError');

module.exports = (params) => {
    let query = `SELECT u.id, u.email, u.name, u.surname, s.id AS sex_id, s.label as sex_label
                 FROM user u
                 LEFT JOIN sex s on u.sex_id = s.id`;

    query = builder(params, query);

    return query;
};


function builder(params, query) {

    query += ' WHERE ';

    if (params.name) {
        query += `(u.name LIKE "%${params.name}%" OR u.surname LIKE "%${params.name}%") AND `
    }

    if (params.email) {
        query += `u.email LIKE "%${params.email}%" AND `
    }

    if (params.sex) {
        query += `s.id = ${params.sex} AND `
    }

    if (query.slice(-5) === ' AND ') {
        query = query.slice(0, -5);
    }

    if (query.slice(-7) === ' WHERE ') {
        query = query.slice(0, -7);
    }

    query += ';';

    return query;
}
