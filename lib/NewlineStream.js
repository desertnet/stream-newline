"use strict"

var TransformStream = require("stream").Transform
var inherits = require("util").inherits
var os = require("os")
var bufferEqual = require("buffer-equal")

var NewlineStream = module.exports = function (opts) {
  TransformStream.call(this, { decodeStrings: true })

  opts = opts || {}
  this._newlineEOL = new Buffer(opts.eol || os.EOL)
  this._newlineWindowBuffer = new Buffer(0)
}
inherits(NewlineStream, TransformStream)

NewlineStream.prototype._transform = function (chunk, encoding, cb) {
  if (this._newlineEOL.length <= chunk.length) {
    this._newlineWindowBuffer = chunk.slice(-this._newlineEOL.length)
  }
  else {
    this._newlineWindowBuffer = Buffer.concat([this._newlineWindowBuffer, chunk])
  }

  return cb(null, chunk)
}

NewlineStream.prototype._flush = function (cb) {
  var endOfWindow = this._newlineWindowBuffer.slice(-this._newlineEOL.length)

  if (! bufferEqual(endOfWindow, this._newlineEOL)) {
    this.push(this._newlineEOL)
  }

  return cb()
}
