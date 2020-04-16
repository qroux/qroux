const fs = require('fs')

const requestHandler = (req, res) => {
  const url = req.url
  const method = req.method

  if (url === '/message' && method === 'POST') {
    const body = []
    req.on('data', (chunk) => {
      body.push(chunk)
    })
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString()
      const message = parsedBody.split('=')[1]
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
      })
    })
  } else {
    res.setHeader('Content-Type', 'text/html')
    res.write('<html><h1>Default page</h1><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></html>')
    return res.end()
  }
}

module.exports = requestHandler
