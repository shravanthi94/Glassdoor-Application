const app = require('../index');
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
      email: 'netflix1@gmail.com',
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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZiNDM3ODc2YzQ4NWE1MTkwOGVjODQwIiwibmFtZSI6IlNocmF2YW50aGkiLCJlbWFpbCI6InNocmFAbWFpbC5jb20iLCJ1c2VydHlwZSI6InN0dWRlbnQifSwiaWF0IjoxNjA3MDM0MzA1LCJleHAiOjE2MTMwMzQzMDV9.UFDeILyQZP7QM5M5IcfJacDaGxhO6nT-_ps7aNxiuR4',
    )
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Update Student Profile Test', () => {
  chai
    .request(url)
    .post('/student/profile/basic')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWZiNDM3ODc2YzQ4NWE1MTkwOGVjODQwIiwibmFtZSI6IlNocmF2YW50aGkiLCJlbWFpbCI6InNocmFAbWFpbC5jb20iLCJ1c2VydHlwZSI6InN0dWRlbnQifSwiaWF0IjoxNjA3MDM0MzA1LCJleHAiOjE2MTMwMzQzMDV9.UFDeILyQZP7QM5M5IcfJacDaGxhO6nT-_ps7aNxiuR4',
    )
    .send({
      name: 'Shravanthi S Bhoopalam',
      email: 'shra@gmail.com',
    })
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});

it('Admin Get Gll New Reviews To Approve', () => {
  chai
    .request(url)
    .get('/admin/review/newreviews')
    .set(
      'x-auth-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6eyJpZCI6MSwibmFtZSI6IkJoYXZhbmEiLCJlbWFpbCI6ImJoYXZhbmFAZ21haWwuY29tIiwidXNlcnR5cGUiOiJhZG1pbiJ9LCJpYXQiOjE2MDcwMzQzNTUsImV4cCI6MTYxMzAzNDM1NX0.t4m-iYvL2dCxxFhoj-I5Ct09r7rd4WHTzwV_90TkSr4',
    )
    .end(function (err, res) {
      expect(res).to.have.status(200);
    });
});
