var board;
var COLUMNS = 10;
var ROWS = 7;
var INITIAL = new Vector(1,4);

function drawBoard()
{
    board = createCleanBoard();
    board[4][0] = "o";
    printBoardToElement(board, "container");
}

/**
This function renders the given in a html tbody element.
**/
function printBoardToElement(board, element)
{
    var row = "";
    var container = document.getElementById("container");
    var gridBackground = document.createElement('div');
    gridBackground.setAttribute("id","grid_bg");
    for(var i = 0; i < board.length; i++)
    {
        var row = document.createElement('div');
        for(var j = 0; j < board[0].length; j++)
        {
            var column = document.createElement('div');
            column.innerHTML = getIcon(board[i][j]);
            console.log(board[i][j]); 
            row.appendChild(column);
        }
        gridBackground.appendChild(row);
    }
    container.appendChild(gridBackground);
}

function getIcon(key)
{
    var emojis = 
        { "#": "⚫️" , 
          "o": "🐒", 
          "%": "🍌",
          "*": "🌪",
          ".": "🌬",
          " ": " "}
    var emojis2 = 
        { "#": "⚫️" , 
          "o": "🐒", 
          "%": "🍌",
          "*": " ",
          ".": " ",
          " ": " "}
    if(showWind)
    {
        return emojis[key];
    }
    return emojis2[key];
}

/**
Creates a zero filled array with the dimensions of regular tetris board.
**/
function createCleanBoard()
{
    return createZerosGrid(COLUMNS, ROWS);
}

/**
Creates a zero filled array with given dimensions.
**/
function createZerosGrid(width, height)
{
    var arr = [];
    for(var i = 0; i < height; i++)
    {
        var row = [];
        for(var j = 0; j < width; j++)
        {
            row.push("%"    );
        }
        arr.push(row);
    }
    return arr;
}