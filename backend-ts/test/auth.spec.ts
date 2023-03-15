import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from './server.spec';
import Users from '../src/models/Users';

chai.should();
chai.use(chaiHttp);

//Clear The User collection after unit test
after(async () => { 
    await Users.deleteMany({});
})

/**
 * Test the Sign Up API end Point
 */
describe('Test POST User Sign Up End Point', () => {
    it('It should create a new user', (done) => {
        const userSeed = {
            name: 'John Smith',
            email: 'john.smith@mailinator.com',
            password: '123456',
          };
          chai
            .request(app)
            .post('/auth/signup')
            .send(userSeed)
              .end((err, res) => {
                  expect(err).to.be.null;
                  expect(res).to.have.status(201);
                  expect(res.body).to.be.a('object');
                  done();
            });
      });
});
  

/**
 * Test the Login API end point
 */
describe('Test POST Auth Login API end point', () => {
    it('It should validate and login the luser', (done) => {
        const userSeed = {
            email: 'john.smith@mailinator.com',
            password: '123456',
          };
          chai
            .request(app)
            .post('/auth/login')
            .send(userSeed)
              .end((err, res) => {
                  const returnResponse = res.body;
                 // console.log(res.body);
                  expect(err).to.be.null;
                  expect(res).to.have.status(200);
                  expect(res.body).to.be.a('object');
                  returnResponse.should.have.property('success');
                  returnResponse.should.have.property('message').and.to.be.a('string');
                  returnResponse.should.have.property('userInfo').and.to.be.a('object');
                  returnResponse.should.have.property('token');
                  returnResponse.should.have.property('refreshToken');
                  done();
              });
    });
});