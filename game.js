

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



setTheGame();
makeDivs();
