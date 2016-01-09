'use strict';

var $btnNewGame;
var $tower1;
var $tower2;
var $tower3;
var gameSize = 2;
var minMoves;
var $selectedTower = null;
var isRunning = false;
var moves = 0;
var $movesText;
var $newGame;
var $gameArea;
var $towers;
var win = new Audio('win.mp3');
$(document).ready(init());

$btnNewGame.click(newGame);
$towers.click(towerClickHandler);
$newGame.change(function(){
  if($newGame.val() !== gameSize){
    newGame()
  }
});

function init(){
  $btnNewGame = $('#newGame');
  $newGame = $('#gameSize');
  $tower1 = $('#tower1Discs');
  $tower2 = $('#tower2Discs');
  $tower3 = $('#tower3Discs');
  $gameArea = $('.gameArea');
  $towers = $('.tower');
  $tower1.children('.towerStem').css("left", "628px");
  $tower2.children('.towerStem').css("left", "376px");
  $movesText = $('#moves');
  newGame();
};

function towerClickHandler(){
  if(isRunning){
    var $this = $(this);
    var $thisContainer = $this.find('.discContainer')
    if($selectedTower !== null){
      if($this.attr('id') === $selectedTower.attr('id')){
        deselect()
      }
      else{
        checkMove($selectedTower.find('.discContainer'), $thisContainer);
      }
    }
    else{
      select($this);
    }
  }
}

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
}

function moveDisc($origin, $destination){
  $origin.remove();
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
  isRunning = true;
  gameSize = $('#gameSize').val();
  moves = 0;
  if(gameSize < 3 || gameSize > 11){
    alert("Please enter a value between 2 and 11 (inclusive)");
  }
  else{
    minMoves = Math.pow(2, gameSize) - 1;
    $('#minMoves').text("Minimum Moves to Win: "+minMoves);
    $('#moves').text('');
    $movesText.text("Your Moves: "+moves);
    for(var i = 1; i <= gameSize; i++){
      var discSize = Number(gameSize) + 1 - i;
      var discMargin = (248-(64+12*(gameSize-i)))/2;
      var $disc = $('<div>').addClass('disc')
      .attr('size', discSize)
      .css("width", (64+12*(gameSize-i)))
      .css("margin", "0px "+discMargin+"px 0px "+discMargin+"px");
      $tower1.append($disc);
    }
  }
};

function select($peg){
  $selectedTower = $peg;
  $selectedTower.find('.pegContainer *').css('background-color','yellow');
}

function deselect(){
  $selectedTower.find('.pegContainer *').css('background-color', 'white');
  $selectedTower = null;
}
