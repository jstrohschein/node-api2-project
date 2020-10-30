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

  else{
    const post = req.body
    posts.insert(post, post.id)
    res.status(201).json(post)
  }

})

router.post('/:id/comments', (req, res) => {

  

})



/************ READ ***************/
router.get('/', (req, res) => {

})

router.get('/:id', (req, res) => {

})

router.get('/:id/comments', (req, res) => {

})



/************ UPDATE ***************/
router.put('/:id', (req, res) => {

})



/************* DELETE ***************/
router.delete('/:id', (req, res) => {

})

module.exports = router