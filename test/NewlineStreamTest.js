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

  it("should append a newline to a stream that does not have one", function (done) {
    pipeIntoNewlineStream("foobar", function (result) {
      assert.equal("foobar" + os.EOL, result.toString())
      return done()
    })
  })

  it("should be able to use custom newline sequences", function (done) {
    newlineStream = new NewlineStream({ eol: "!!\n" })
    pipeIntoNewlineStream("foob", "ar", function (result) {
      assert.equal("foobar!!\n", result.toString())
      return done()
    })
  })
})
