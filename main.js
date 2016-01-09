'use strict';

var $btnNewGame;
var $tower1;
var $tower2;
var $tower3;
var gameSize;
var minMoves;
var $selectedTower = null;
var isRunning = false;
var moves;
var $movesText;
var $newGame;
var $towers;
var win = new Audio('win.mp3');

$(document).ready(init());

$(document).keypress(function(e) {
  var keyPressed = e.which;
  console.log(keyPressed);
  switch (keyPressed) {
    case 49: //1
      $tower1.click();
      break;
    case 50: //2
      $tower2.click();
      break;
    case 51: //3
      $tower3.click();
      break;
    case 32:
      newGame();
      break;
  }
});

$btnNewGame.click(newGame);
$towers.click(towerClickHandler);

$newGame.change(function(){
  if($newGame.val() !== gameSize){
    newGame();
  }
});

function init(){
  $btnNewGame = $('#newGame');
  $newGame = $('#gameSize');
  $tower1 = $('#tower1Discs');
  $tower2 = $('#tower2Discs');
  $tower3 = $('#tower3Discs');
  $towers = $('.tower');
  $tower1.children('.towerStem').css("left", "628px");
  $tower2.children('.towerStem').css("left", "376px");
  $movesText = $('#moves');
  newGame();
  alert("Click or press 1, 2, or 3 to play.\nPress Space to restart.");
};

function towerClickHandler(){
  if(isRunning){
    var $this = $(this);
    var $thisContainer = $this.find('.discContainer');
    debugger;
    if($selectedTower !== null){
      if($this.attr('id') === $selectedTower.attr('id')){
        deselect();
      }
      else{
        checkMove($selectedTower.find('.discContainer'), $thisContainer);
      }
    }
    else{
      select($this);
    }
  }
};

function checkMove($origin, $destination){
  var $originDisc;
  $originDisc = $origin.find('div:nth-child('+$origin.children().length+')');
  var $destinationDisc = $destination.find('div').last();
  if($destinationDisc === [])
    moveDisc($origin, $destination.find('#discContainer'));
  else{
    if($destinationDisc.attr('size') < $originDisc.attr('size')) alert("You cannot move a disc on top of a smaller disc");
    else moveDisc($originDisc, $destination);
  }
};

function moveDisc($origin, $destination){
  $destination.append($origin);
  deselect();
  moves++;
  writeMoves();
  checkWin();
};

function writeMoves(){
  $movesText.text("Your Moves: "+moves);
}
function checkWin(){
  if($tower1.children().length === 0 && ($tower2.children().length === 0 || $tower3.children().length === 0)){
    isRunning = false;
    win.play();
    if(moves === minMoves){
      alert('You won with the minimum number of moves!');
    }
    else{
      console.log(moves-minMoves);
      alert('You win with only '+(moves-minMoves)+' unnecessary moves!');
    }
  }
};

function newGame(){
  $('.disc').remove();
  var discs = [];
  isRunning = true;
  gameSize = Math.floor($('#gameSize').val());
  moves = 0;
  if(gameSize < 3 || gameSize > 11){
    alert("Please enter a value between 2 and 11 (inclusive)");
  }
  else{
    minMoves = Math.pow(2, gameSize) - 1;
    $('#minMoves').text("Minimum Moves to Win: "+minMoves);
    $movesText.text("Your Moves: "+moves);
    for(var i = 1; i <= gameSize; i++){
      var discSize = Number(gameSize) + 1 - i;
      var discMargin = (248-(64+12*(gameSize-i)))/2;
      var $disc = $('<div>').addClass('disc')
      .attr('size', discSize)
      .css("width", (64+12*(gameSize-i)))
      .css("margin", "0px "+discMargin+"px 0px "+discMargin+"px");
      discs.push($disc);
    }
    $tower1.append(discs);
  }
};

function select($peg){
  $selectedTower = $peg;
  $selectedTower.find('.pegContainer *').css('background-color','yellow');
};

function deselect(){
  $selectedTower.find('.pegContainer *').css('background-color', 'white');
  $selectedTower = null;
};
