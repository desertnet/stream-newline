# stream-newline

Ensure stream ends with a newline

## Usage

```javascript
var streamNewline = require("stream-newline")

// A stream that may or may not have a newline at the end
var fileStream = fs.createReadStream("README.txt")

// Pipe fileStream to stdout and guarantee a newline at the end
fileStream.pipe(streamNewline()).pipe(process.stdout)
```

## API

### streamNewline([opts])

Creates a new stream that ensures there will be a newline at the end. The optional `opts` argument is an options object that can contain the following properties:

  * `eol`: A custom end-of-line sequence. Defaults to `os.EOL` (will be `\n` on POSIX, `\r\n` on Windows).
