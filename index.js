const http = require('http')
const server = http.createServer()

console.log(process.env);
server.listen(process.env.PORT, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${process.env.PORT}`)
})
