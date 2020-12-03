const app = require('../app');
const chai = require('chai');
chai.use(require('chai-http'));
const { expect } = require('chai');

const host = 'http://localhost';
const port = '3001';
const url = `${host}:${port}`;

it('Student Login Test', () => {
  chai
    .request(url)
    .post('/student/login')
    .send({ email: 'shra@mail.com', password: 'test' })
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Company Signup Test', () => {
  chai
    .request(url)
    .post('/company/signup')
    .send({
      name: 'Netflix',
      email: 'netflix@gmail.com',
      password: 'test',
    })
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Current Student Profile Test', () => {
  chai
    .request(url)
    .get('/student/landing')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZiNDM3ODc2YzQ4NWE1MTkwOGVjODQwIiwibmFtZSI6IlNocmF2YW50aGkiLCJlbWFpbCI6InNocmFAbWFpbC5jb20iLCJ1c2VydHlwZSI6InN0dWRlbnQifSwiaWF0IjoxNjA3MDMyNzA2LCJleHAiOjE2MTMwMzI3MDZ9.dw9Y4FbBSiper-Fk_U3mkX9nMVYne1QuPp7m0RRUiBA',
    )
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Update student profile test', () => {
  chai
    .request(url)
    .post('/student/profile/basic')
    .set('x-auth-token', '')
    .send({
      name: 'Sam Jonas',
      email: 'sam.jonas@gmail.com',
    })
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Admin get all new reviews to approve', () => {
  chai
    .request(url)
    .get('/admin/review/newreviews')
    .set('x-auth-token', '')
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});
