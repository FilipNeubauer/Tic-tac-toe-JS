

function setTheGame() {
    const gameField = Array(10);
    for (let i = 0; i < 10; i++) {
        gameField[i] = Array(10);
    }




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




setTheGame();
makeDivs();

