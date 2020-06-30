const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('It works!');
});

router.get('/board', (req, res) => {
  res.render('board', req);
});

router.get('/question', (req, res) => {
  res.render('board', req);
});

router.get('/answer', (req, res) => {
  res.render('board', req);
});

router.post('/points', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
});

module.exports = router;
