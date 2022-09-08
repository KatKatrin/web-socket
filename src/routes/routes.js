import express from 'express';


export const pageRouter = express.Router()

pageRouter.get('/signup', (req, res) => {

  res.render('index', {
    signUp: true,
  })
})

pageRouter.get('/signin', (req, res) => {

  res.render('index', {
    signUp: false,
  })
})

pageRouter.get('/', (req, res) => {

  res.render('index', {
    mainPage: true,
  })
})