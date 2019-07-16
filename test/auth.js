const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

const token =
    `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkthcmlzaGEiLCJzZXhfaWQiOjIsImlhdCI6MTU1OTkyMTU5MCwiZXhwIjoxNTYyNTEzNTkwfQ.HbsayOdjQj5tKyneU9mj2E_MScpJ3vRNuAQzTnmsA14`


/**
 * Test for get token on login
 */

describe('POST auth/user', () => {
    // beforeEach(done => {
    //     console.log(UserModel);
    //     console.log(dataBase);
    //     UserModel.create({
    //         name: 'Vlad',
    //         surname: 'Pipiu',
    //         email: 'vlad@test.com',
    //         password: 'test',
    //         sex_id: 1
    //     }, () => {
    //         done();
    //     });
    // });

    it('should return token', done => {
        const user = {
            email: 'kery@mail.ru',
            password: '1'
        };

        chai.request(app)
            .post('/auth/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);

                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.msg.should.be.a('string');
                res.body.should.have.property('success');
                res.body.success.should.be.a('boolean').eqls(true);
                // token validation by RegEx
                res.body.msg.should
                    .match(/^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$/);
                done();
            });
    });
});

