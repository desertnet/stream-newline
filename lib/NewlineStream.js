"use strict"

var TransformStream = require("stream").Transform
var inherits = require("util").inherits
var os = require("os")
var bufferEqual = require("buffer-equal")

var NewlineStream = module.exports = function () {
  TransformStream.call(this)

  this._newlineWindowBuffer = null
}
inherits(NewlineStream, TransformStream)

NewlineStream.prototype._transform = function (chunk, encoding, cb) {
  this._newlineWindowBuffer = chunk.slice(-os.EOL.length)
  return cb(null, chunk)
}

NewlineStream.prototype._flush = function (cb) {
  var eol = new Buffer(os.EOL)
  var endOfWindow = this._newlineWindowBuffer.slice(-eol.length)

  if (! bufferEqual(endOfWindow, eol)) {
    this.push(eol)
  }

  return cb()
}
