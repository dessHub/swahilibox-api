/* global process, describe, it */
'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);

describe('General API.', function () {
  it('GET / should return a template.', function (done) {
    chai.request(server).get('/').end(function (err, res) {
      if (err) return done(err);
      res.should.have.status(200);
      done();
    });
  });
});