

var gameField = Array(10);
for (let i = 0; i < 10; i++) {
    gameField[i] = Array(10).fill(0);
}

var freeBox = [...Array(100).keys()];


console.log(gameField);

function setTheGame() {

    // console.log(freeBox);

    var str = "auto ";
    var numOfCol = str.repeat(10);
    $("#grid-container").css("grid-template-columns", numOfCol);
}

function makeDivs() {
    for (let i = 0; i < 100; i++) {
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

  let rowId = Math.floor(rndId/10);

  let colId = rndId%10;

  gameField[rowId][colId] = "X";


  cross(rndId);

  // console.log(rndId);
  // console.log(freeBox);
  // console.log(gameField);
}


function playerMove() {
  $(".grid-item").click(function () {
    // console.log(this.id);
    // console.log(freeBox);

    let idBox = parseInt(this.id);
    // console.log(idBox);
    if (freeBox.includes(idBox)) {
      circle(idBox);
      freeBox.splice(freeBox.indexOf(idBox), 1);
      // console.log(freeBox);

      let rowId = Math.floor(idBox/10);

      let colId = idBox%10;
    
      gameField[rowId][colId] = "X";

    } else {
      console.log("error");
    }
  })
}


setTheGame();
makeDivs();

computerMove();

playerMove();
