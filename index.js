/******** DIRECTIVES *******/
const server = require('./server')


//Start server
const PORT = 5000
server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})











