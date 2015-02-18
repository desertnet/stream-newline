"use strict"

var NewlineStream = require("./lib/NewlineStream.js")

module.exports = function (opts) {
  return new NewlineStream(opts)
}
