"use strict"

var TransformStream = require("stream").Transform
var inherits = require("util").inherits

var NewlineStream = module.exports = function () {
  TransformStream.call(this)
}
inherits(NewlineStream, TransformStream)

NewlineStream.prototype._transform = function (chunk, encoding, cb) {
  return cb(null, chunk)
}

NewlineStream.prototype._flush = function (cb) {
  return cb()
}
