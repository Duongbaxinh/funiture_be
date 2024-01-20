const server = require('./src/app')
const PORT = 8080;
const ADDRESS = '127.0.0.1'
server.listen(PORT, () => {
    console.log(`server run at :: http://localhost:${PORT} `)
})
