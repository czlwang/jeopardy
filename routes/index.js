const express = require('express');
const fs = require('fs')
const router = express.Router();

const board = require('/Users/cwang/Documents/2020_summer/jeopardy/board.json');
var blue_score = 0;
var red_score = 0;
var done = [];
for(var i=0; i<5; i++){
    var row = []
    for(var j=0; j<7; j++){
        row.push(false);
    }
    done.push(row);
}

router.get('/', (req, res) => {
  res.send('It works!');
});

router.get('/board', (req, res) => {
  var input = board; //NOTE not copying
  input["done"] = done;
  input["red_score"] = red_score;
  input["blue_score"] = blue_score;
  res.render('board', input);
});

function get_input(row, col){
  console.log("get_input");
  row = parseInt(row);
  col = parseInt(col);
  console.log(board["board"]);
  console.log(board["board"][col]);
  input = board["board"][col][row];
  console.log(input)
  input["row"] = row;
  input["col"] = col;
  input["blue_score"] = blue_score;
  input["red_score"] = red_score;
  return input;
}

router.get('/question/:row/:col', (req, res) => {
  var row = parseInt(req.params.row);
  var col = parseInt(req.params.col);
  console.log("question", row, col)
  console.log(req.params)
  var input = get_input(row, col);
  done[row][col] = true;
  res.render('question', input);
});

router.get('/answer/:row/:col', (req, res) => {
  var row = parseInt(req.params.row);
  var col = parseInt(req.params.col);
  console.log("answer", row, col)
  var input = get_input(row, col);
  res.render('answer', input);
});

router.post('/reset', (req, res) => {
  blue_score = 0;
  red_score = 0;
  done = []
  for(var i=0; i<5; i++){
      var row = []
      for(var j=0; j<7; j++){
          row.push(false);
      }
      done.push(row);
  }
  res.sendStatus(200);
});

router.post('/points', (req, res) => {
  console.log(req.body);
  blue_delt = parseInt(req.body.blue);
  red_delt = parseInt(req.body.red);
  blue_score += blue_delt;
  red_score += red_delt;
  console.log(blue_score, red_score);
  var input = {"red_score": red_score, "blue_score": blue_score};
  res.send(input);
});

module.exports = router;
