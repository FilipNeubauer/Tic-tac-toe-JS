
const numBox = 10;

var state = true;

var you = null;
var computer = null;

var gameField = Array(10);
for (let i = 0; i < numBox; i++) {
    gameField[i] = Array(numBox).fill(0);
}

var freeBox = [...Array(numBox*numBox).keys()];


console.log(gameField);

function setTheGame() {

    // console.log(freeBox);

    var str = "auto ";
    var numOfCol = str.repeat(10);
    $("#grid-container").css("grid-template-columns", numOfCol);
}

function makeDivs() {
    for (let i = 0; i < numBox*numBox; i++) {
        var newDiv = $("<div></div>");
        newDiv.addClass("grid-item");
        newDiv.attr("id", i);
        $("#grid-container").append(newDiv);
    }
}

function circle(gridId) {
    $("#" + gridId.toString()).html('<div class="circle__box">\
    <div class="circle__wrapper circle__wrapper--right">\
      <div class="circle__whole circle__right"></div>\
    </div>\
    <div class="circle__wrapper circle__wrapper--left">\
      <div class="circle__whole circle__left"></div>\
    </div>\
  </div>')
}


function cross(gridId) {
  $("#" + gridId.toString()).html('<did class="line__box">\
  <div class="line__wrapper">\
      <div class="line-left"></div>\
      <div class="line-right"></div>\
  </div>\
</div>')
}


function computerMove() {

  let rndId = freeBox[Math.floor(Math.random()*freeBox.length)]

  freeBox.splice(freeBox.indexOf(rndId), 1);

  let rowId = Math.floor(rndId/numBox);

  let colId = rndId%numBox;

  gameField[rowId][colId] = computer;

  if (computer == "x") {
    cross(rndId);
  } else {
    circle(rndId);
  }

  if (!checkGame(colId, rowId, computer)) {
    if (freeBox.length>0) {
      playerMove();
    } else {
      console.log("draw");
      $("h1").html("Draw!");
    }

  }
  

  // console.log(rndId);
  // console.log(freeBox);
  // console.log(gameField);
}


function playerMove() {
  $(".grid-item").bind("click", function () {
    // console.log(this.id);
    // console.log(freeBox);


    

    let idBox = parseInt(this.id);
    // console.log(idBox);
    if (freeBox.includes(idBox)) {
      


      if (you == "x") {
        cross(idBox);
      } else {
        circle(idBox);
      }


      freeBox.splice(freeBox.indexOf(idBox), 1);
      // console.log(freeBox);

      let rowId = Math.floor(idBox/numBox);

      let colId = idBox%numBox;
    
      gameField[rowId][colId] = you;

      // console.log(checkLeftUp(colId, rowId, "o"));
      // checkUpDown(colId, rowId, "o");

      $(".grid-item").unbind("click");

      if (!checkGame(colId, rowId, you)) {
        if (freeBox.length > 0) {
          setTimeout(computerMove, 1000);
        } else {
          console.log("draw");
          $("h1").html("Draw!");
        }
      }





    } else {
      console.log("error");
    }
  })
}


function game() {

  var rndFoo = Math.random();
  if (rndFoo < 0.5)
    computerMove()
  else
    playerMove()


  // $(".grid-item").off("click");

  
}


function checkGame(x, y, symbol) {
  if (checkLeftUp(x,y,symbol) || checkRightUp(x,y,symbol)|| checkRightLeft(x,y,symbol)||checkUpDown(x,y,symbol)) {
    console.log(symbol + " won!");

    $("h1").html(symbol + " won!")

    return true;

  } else {
    return false;
  }
}


function checkRightLeft(x, y, symbol) {
  let left = true;
  let right = true;
  let check = 1;
  for (let i = 1; i < 5; i++) {
    if (gameField[y].length > x+i && right) {
    if (gameField[y][x+i] == symbol) {
      check += 1;
    } else {
      right = false;
    }} else {
      right = false;
    }


    if (x-i >= 0 && left) {
    if (gameField[y][x-i] == symbol) {
      check += 1;
    } else {
      left = false;
    }
  } else {
      left = false;
    }
}
if (check >= 5) {
  return true;
} else {
  return false;
}
}


function checkUpDown(x, y, symbol) {
  let up = true;
  let down = true;
  let check = 1;
  for (let i = 1; i < 5; i++) {
    if (gameField.length > y + i && down) {
      if (gameField[y+i][x] == symbol) {
        check += 1;
      } else {
        down = false;
      }
    } else {
      down = false;
    }

    if (y-i >= 0 && up) {
      if (gameField[y-i][x] == symbol) {
        check += 1;
      } else {
        up = false;
      }
    } else {
      up = false;
    }
  }
  
  if (check >= 5) {
    return true;
  } else {
    return false;
  }
}


function checkRightUp(x, y, symbol){
  let leftDown = true;
  let rightUp = true;
  let check = 1;
  for (let i = 1; i<5;i++) {
    if (y-i>=0 && gameField[y].length > x+i && rightUp) {
      if (gameField[y-i][x+i] == symbol) {
        check += 1;
      } else {
        rightUp = false;
      }
    } else {
      rightUp = false;
    }
  

    if (gameField.length>y+i && x-i >= 0 && leftDown) {
      if (gameField[y+i][x-i] == symbol) {
        check += 1;
      } else {
        leftDown = false;
      }
    } else {
      leftDown = false;
    }

  }

    if (check >= 5) {
      return true;
    } else {
      return false;
    }
  }


function checkLeftUp(x, y, symbol) {
  let leftUp = true;
  let rightDown = true;
  let check = 1;
  for (let i = 1; i < 5; i++) {
    if (y-i >= 0 && x-i>=0 && leftUp) {
      if (gameField[y-i][x-i] == symbol) {
        check += 1;
      } else {
        leftUp = false;
      }
    } else {
      leftUp = false;
    }


    if (gameField.length > y+i && gameField[y+i].length > x+i && rightDown) {
      if (gameField[y+i][x+i] == symbol) {
        check += 1;
      } else {
        rightDown = false;
      }
    } else {
      rightDown = false;
    }
  }

  if (check >= 5) {
    return true;
  } else {
    return false;
  }
}



function chooseSymbol() {
  $(".x-button").click(function() {
    you = "x";
    computer = "o";
    console.log("clicked");
    $(".btns-div").css("visibility", "hidden");
    $("h2").html("You are x");
    $("h2").css("color", "red");
  game();

  })

  $(".o-button").click(function() {
    you = "o";
    computer = "x";
    console.log("clicked");
    $(".btns-div").css("visibility", "hidden");
    $("h2").html("You are o");
    $("h2").css("color", "blue");
  game();

  })
}


setTheGame();
makeDivs();

chooseSymbol();
