process.env.NODE_ENV = 'test'

var chai  = require('chai')
  , mocha = require('mocha')

global.assert = chai.assert
global.expect = chai.expect

chai.use(require('chai-as-promised'))
