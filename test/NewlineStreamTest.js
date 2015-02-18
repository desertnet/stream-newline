"use strict"

var assert = require("assert")
var os = require("os")

var streamify = require("stream-array")
var concat = require("concat-stream")

var NewlineStream = require("../lib/NewlineStream.js")

describe("NewlineStream", function () {
  var nlStream

  var pipeIntoNewlineStream = function () {
    var args = Array.prototype.slice.call(arguments)
    var cb = args.pop()
    return streamify(args).pipe(nlStream).pipe(concat(cb))
  }

  beforeEach(function () {
    nlStream = new NewlineStream()
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

  it("should be able to append custom newline sequences", function (done) {
    nlStream = new NewlineStream({ eol: "!!\n" })
    pipeIntoNewlineStream("foob", "ar", function (result) {
      assert.equal("foobar!!\n", result.toString())
      return done()
    })
  })

  it("should be able to recognize custom newline sequences", function (done) {
    nlStream = new NewlineStream({ eol: "!!\r\n" })
    pipeIntoNewlineStream("foo", "bar!!\r\n", function (result) {
      assert.equal("foobar!!\r\n", result.toString())
      return done()
    })
  })

  it("should not freak out when newline sequences span chunks", function (done) {
    nlStream = new NewlineStream({ eol: "\r\n" })
    pipeIntoNewlineStream("foo\r", "\n", function (result) {
      assert.equal("foo\r\n", result.toString())
      return done()
    })
  })
})
