var fortunes = require('../lib/fortunes.js'),
  expect = require('expect')

suite('Fortune cookie tests', function() {
  test('getFortune() should return a fortune', function() {
    expect(fortunes.getFortune()).toBeA('string')
  })
})
