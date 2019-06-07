const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should;

chai.use(chaiHttp);

/**
 * Test for get token on authorization
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
                console.log(res);
                // should(res).have.status(200);
                res.status.should.equal(200);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                res.body.msg.should.be.a('string');
                // token validation by RegEx
                res.body.message.should.have.property('msg')
                    .match(/^[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$/);
                done();
            });
    });
});


/**
 * Method to
 */


describe('GET /user', () => {
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
            email: 'vlad@test.com',
            password: 'test'
        };

        chai.request(app)
            .get('user/')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('msg');
                // res.body.message.should.have.property('token');
                // res.body.message.should.have.property('accessToken').eql('Some value');
                done();
            });
    });
});
