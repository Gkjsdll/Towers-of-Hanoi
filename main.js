var $btnNewGame;
var $tower1;
var $tower2;
var $tower3;
var gameSize = 2;
var minMoves;
var $selectedTower = null;
var isRunning = false;

$(document).ready(init());

$btnNewGame.click(newGame);
$towers.click(towerClickHandler);

function init(){
  $btnNewGame = $('#newGame');
  $tower1 = $('#tower1Discs');
  $tower2 = $('#tower2Discs');
  $tower3 = $('#tower3Discs');
  $gameArea = $('.gameArea');
  $towers = $('.tower');
  $tower1.children('.towerStem').css("left", "628px");
  $tower2.children('.towerStem').css("left", "376px");
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
  checkWin();
};

function checkWin(){
  if($tower1.children().length === 0 && ($tower2.children().length === 0 || $tower3.children().length === 0)){
    isRunning = false;
    alert('You win!');
  }
};

function newGame(){
  $('.disc').remove();
  isRunning = true;
  gameSize = $('#gameSize').val();
  if(gameSize < 3 || gameSize > 11){
    alert("Please enter a value between 2 and 11 (inclusive)");
  }
  else{
    minMoves = Math.pow(2, gameSize) - 1;
    console.log("Minimum Moves: ", minMoves);
    for(var i = 1; i <= gameSize; i++){
      var discSize = Number(gameSize) + 1 - i;
      var discMargin = (248-(64+12*(gameSize-i)))/2;
      var $disc = $('<div>').addClass('disc')
      .attr('size', discSize)
      .css("width", (64+12*(gameSize-i)))
      .css("margin", "1px "+discMargin+"px 1px "+discMargin+"px");
      $tower1.append($disc);
    }
  }
};

function select($peg){
  $selectedTower = $peg;
  $selectedTower.find('.pegContainer *').css('border-color','yellow');
}

function deselect(){
  $selectedTower.find('.pegContainer *').css('border-color', 'black');
  $selectedTower = null;
}
