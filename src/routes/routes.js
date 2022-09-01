import express from 'express';


export const pageRouter = express.Router()

pageRouter.get('/signup', (req, res) => {

  res.render('form', {
    signUp: true,
  })
})

pageRouter.get('/signin', (req, res) => {

  res.render('form', {
    signUp: false,
  })
})

pageRouter.get('/', (req, res) => {

  res.render('form', {
    mainPage: true,
  })
})