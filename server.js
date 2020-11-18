/************* DIRECTIVES *************/
const express = require('express')
const postsRouter = require('./posts/posts-router')


/*********  SERVER  *******/
const server = express()
server.use(express.json())
server.use('/api/posts', postsRouter)


/************ DEFAULT *************/
server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Posts API</h2>
    <p>Welcome</p>
  `)
})

module.exports = server
