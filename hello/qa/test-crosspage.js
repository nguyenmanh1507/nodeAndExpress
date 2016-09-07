var Browser = require('zombie'),
  assert = require('chai').assert

var browser

// describe('test test', function(){
//   const browser = Browser()
//
//   it('test 1', function(done) {
//     const referrer = 'http://localhost:3000/tours/hood-river'
//     browser.visit(referrer)
//     browser.assert.text('title', 'Meadowlark Travel')
//     done()
//   })
// })

suite('Cross-page Test', function() {
  setup(function() {
    browser = new Browser()
  })

  test('requesting a group rate quote from the hood river tour page should populate the referrer field', function(done) {
    var referrer = 'http://localhost:3000/tours/hood-river'
    browser.visit(referrer, function() {
      browser.clickLink('.request-group-rate', function() {
        // assert(browser.assert.element('[name="referrer"]').value === referrer)
        browser.assert.input('[name=referrer]', referrer)
        done()
      })
    })
  })

  test('requesting a group rate quote from the oregon coast tour page should populate the referrer field', function(done) {
    var referrer = 'http://localhost:3000/tours/oregon-coast'
    browser.visit(referrer, function() {
      browser.clickLink('.request-group-rate', function() {
        assert(browser.field('referrer').value === referrer)
        done()
      })
    })
  })

  test('visiting the "request group rate" page dirctly should result in an empty referrer field', function(done) {
    var referrer = 'http://localhost:3000/tours/request-group-rate'
    browser.visit(referrer, function() {
      browser.assert.input('[name=referrer]', '')
      done()
    })
  })
})
