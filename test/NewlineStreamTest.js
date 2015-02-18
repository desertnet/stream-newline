"use strict"

var assert = require("assert")
var os = require("os")

var streamify = require("stream-array")
var concat = require("concat-stream")

var NewlineStream = require("../lib/NewlineStream.js")

describe("NewlineStream", function () {
  var newlineStream

  beforeEach(function () {
    newlineStream = new NewlineStream()
  })

  it("should not modify streams that end with a newline", function (done) {
    var testData = ["foobar" + os.EOL]
    streamify(testData).pipe(newlineStream).pipe(concat(function (result) {
      assert.equal("foobar" + os.EOL, result.toString())
      return done()
    }))
  })
})
