const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const dataBase = require('../dataBase').getInstance();

chai.use(chaiHttp);

const token =
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkthcmlzaGEiLCJzZXhfaWQiOjIsImlhdCI6MTU1OTkyMTU5MCwiZXhwIjoxNTYyNTEzNTkwfQ.HbsayOdjQj5tKyneU9mj2E_MScpJ3vRNuAQzTnmsA14`


/**
 * Method to get users by name. Must return array of users by name of surname
 */

describe('GET /user', () => {
    it('must return users by name', done => {

        chai.request(app)
            .get('/user')
            .set({'Authorization': token})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.should.have.property('success');
                res.body.msg.should.be.a('array');
                res.body.success.should.be.a('boolean').eqls(true);
                done();
            });
    });
});


/**
 * Method to register new user
 */

describe('POST /user', () => {
    it('must register new user', done => {

        const UserModel = dataBase.getModel('User');

        const user = {
            email: 'kery22@mail.ru',
            password: '1',
            name: 'Karinka',
            surname: 'Karinivna',
            sex: 1
        };

        // delete inserted user after test
        afterEach(()=> {
            UserModel.destroy({
                where: {
                    email: 'kery22@mail.ru'
                }
            })
        });

        chai.request(app)
            .post('/user')
            .send(user)
            .end((err, res) => {
                console.log(res.body);
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('msg').a('object');
                res.body.should.have.property('success').a('boolean').eqls(true);
                done();
            });
    });
});
