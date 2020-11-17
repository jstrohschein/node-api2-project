/******** Directives ***********/
const express = require('express')
const router = express.Router()
const posts = require('./posts-model')
const { check, validationResult } = require('express-validator')



/************ CREATE ***************/
router.post('/', [

  check('title').isLength({ min: 1 }),
  check('contents').isLength({ min: 1 })

], (req, res) => {

  const errors = validationResult(req)

  if(!errors.isEmpty()){
    res.status(400).json({ message: "please provide name and bio for the user" })
  }

  if(errors.isEmpty()){
    const post = req.body
    posts.insert(post, post.id)
    res.status(201).json(post)
  }

  else{
    res.status(500).json({ message: 'DB error' })
  }

})

router.post('/:id/comments', validatePostID, [check('text').isLength({ min: 1 })], (req, res) => {

  errors = !errors.isEmpty()
  
  if(errors){
    res.status(400).json({ message: 'Please provide text for the comment' })
  }
  
  if(!errors){
    const comment = req.body
    posts.insertComment(comment)
      .then(comment => {
        res.status(201).json(comment)
      })
      .catch(err => {
        res.status(500).json({ message: 'DB error' })
      })
  }

})



/************ READ ***************/
router.get('/', (req, res) => {
    posts.find(req.query)
      .then(posts => {
        res.status(200).json(posts)
      })
      .catch(err => {
        res.status(500).json({ message: 'DB error' })
      })
})

router.get('/:id', validatePostID, (req, res) => {

  const { id } = req.params

  const post = posts.findById(id)

  if (post) {
    posts.insert(post)
      .then(post => {
        res.status(200).json(post)
      })
      .catch(err => {
        res.status(500).json({ message: 'db error' })
      }) 
  }

  else{
    res.status(404).json({ message: 'Not found' })
  }
   
  
})

router.get('/:id/comments', validateCommentID, (req, res) => {

  const {id} = req.params

  const comment = posts.findCommentById(id)

  if (comment) {
    posts.insertComment(comment)
      .then(comment => {
        res.status(200).json(comment)
      })
      .catch(err => {
        res.status(500).json({ messagee: 'db error' })
      })
  } else {
    res.status(500).json({ messag: 'DB error' })
  }
})



/************ UPDATE ***************/
router.put('/:id', validatePostID, [check('title').isLength({ min: 1 }), check('contents').isLength({ min: 1 })], (req, res) => {

  const { id } = req.params
  const errors = !errors.isEmpty()
  const post = posts.findById(id)

  if (post && !errors) {
    posts.insert(post)
      .then(post => {
        res.status(200).json(post)
      })
      .catch(err => {
        res.status(500).json({ message: 'db error' })
      }) 
  }

  if(errors){
    res.status(400).json({ messag: 'Please provide a title and contents for the post' })
  }
  else{
    res.status(404).json({ message: 'Not found' })
  }
})



/************* DELETE ***************/
router.delete('/:id', validatePostID, (req, res) => {

  const { id } = req.params

  const post = posts.findById(id)

  if (post) {
    posts.remove(id)
      .then(post => {
        res.status(200).json(post)
      })
      .catch(err => {
        res.status(500).json({ message: 'db error' })
      }) 
  }

  else{
    res.status(404).json({ message: 'Not found' })
  }

})



//MIDDLEWARE

function validateBody(req, res, next){
  const body = req.body
  if(req.body && Object.keys(req.body).length > 0){
    next()
  }
  else{
    res.status(400).json({ message: 'missing body' })
  }
}

function validatePostID(req, res, next) {
  const {id} = req.params
  posts.findById(id)

  .then(post=>{
    if(post){
      req.post = post
      next()
    }else{
      res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    }
  })

  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'DB error' })
  })
}

function validateCommentID(req, res, next) {
  const {id} = req.params
  posts.findCommentById(id)

  .then(post=>{
    if(post){
      req.post = post
      next()
    }else{
      res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    }
  })

  .catch(err => {
    console.log(err)
    res.status(500).json({ message: 'DB error' })
  })
}


module.exports = router