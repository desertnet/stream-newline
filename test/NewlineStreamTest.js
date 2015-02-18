"use strict"

var assert = require("assert")
var os = require("os")

var streamify = require("stream-array")
var concat = require("concat-stream")

var NewlineStream = require("../lib/NewlineStream.js")

describe("NewlineStream", function () {
  var newlineStream

  var pipeIntoNewlineStream = function () {
    var args = Array.prototype.slice.call(arguments)
    var cb = args.pop()
    return streamify(args).pipe(newlineStream).pipe(concat(cb))
  }

  beforeEach(function () {
    newlineStream = new NewlineStream()
  })

  it("should not modify streams that end with a newline", function (done) {
    pipeIntoNewlineStream("foobar" + os.EOL, function (result) {
      assert.equal("foobar" + os.EOL, result.toString())
      return done()
    })
  })
})