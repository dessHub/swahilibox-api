/* global process, describe, it */
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

let server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('General API.', () => {
  it('GET / should return a template.', (done) => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        if (err) return done(err);
        res.should.have.status(200);
        done();
      });
  });
});