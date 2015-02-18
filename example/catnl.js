#!/usr/bin/env node

"use strict"

var fs = require("fs")
var streamNewline = require("..")

// A stream that may or may not have a newline at the end
var fileStream = fs.createReadStream(process.argv[2])

// Pipe fileStream to stdout and guarantee a newline at the end
fileStream.pipe(streamNewline()).pipe(process.stdout)
