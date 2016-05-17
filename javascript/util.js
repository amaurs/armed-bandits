var plan = ["############",
            "#          #",
            "#          #",
            "#          #",
            "#          #",
            "#####      #",
            "#          #",
            "#         %#",
            "#      #####",
            "#          #",
            "#%         #",
            "############"];


var width = plan.length;

var height = plan[0].length;

var alpha = .4;
var gamma = .5;
var epsilon = .2;
var speed = 10;

var episode = 0;
var steps = 0;
var historicalData = []; 


/**
Agents will be able to move using only the four cardinal points.
**/
var fourPointDirections = {
    "n"  : new Vector( 0, -1),
    "e"  : new Vector( 1,  0),
    "s"  : new Vector( 0,  1),
    "w"  : new Vector(-1,  0),
 };

/**
Helper array to select from the pool of moves.
**/
var fourPointDirectionNames = "n e s w".split(" ");

/**
Agents will be able to move in the usual cardinal directions plus the ordinal or intercadinal directions.
**/
var eightPointDirections = 
{
    "n"  : new Vector( 0, -1),
    "ne" : new Vector( 1, -1),
    "e"  : new Vector( 1,  0),
    "se" : new Vector( 1,  1),
    "s"  : new Vector( 0,  1),
    "sw" : new Vector(-1,  1),
    "w"  : new Vector(-1,  0),
    "nw" : new Vector(-1, -1),
};


var directionNames = fourPointDirectionNames;

var directions = fourPointDirections;


/**
Helper array to select from the pool of moves.
**/
var eightPointDirectionNames = "n ne e se s sw w nw".split(" ");

function getDirectionIndex(direction)
{
  return directionNames.indexOf(direction);
}

/**
This function returns a random element from the given array.
**/
function randomElement(array) 
{
  return array[Math.floor(Math.random() * array.length)];
}


/**
Helper method that retuns the element represented by a char.
**/
function elementFromChar(legend, ch) 
{ 
      if(ch == " ")
      {
        return null;
      }
      var element = new legend[ch]();
      element.originChar = ch;
      return element;
} 

function vectorFromString(vectorString)
{
  vectorArray = vectorString.split(",");
  return new Vector(parseInt(vectorArray[0]),parseInt(vectorArray[1]));
}

/**
Helper method that retuns the element represented by a char.
**/
function stateFromChar(x, y, ch, index) 
{ 
    if(ch != "#")
    {
      var reward = -0.1;
      var isTerminal = false;
      if(ch == "/")
      {
        reward = -0.8;
      }
      if(ch == "%")
      {
        reward = 100;
        isTerminal = true;
      }

      var state = new State(x + "," + y + "," + ch, index, reward, isTerminal);
      //console.log(ch + " = " + reward);
      return state;
    }
    return null;
      
} 

/**
Helper method that retuns the char that represents an element.
**/
function charFromElement(element)
{
    if(element == null) 
    {
        return " ";
    }
    else 
    {
        return element.originChar;
    }
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


function drawBasic() 
{
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Steps ');
    data.addRows([
      [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
      [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
      [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
      [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
      [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
      [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
      [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
      [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
      [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
      [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
      [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
      [66, 70], [67, 72], [68, 75], [69, 80]
    ]);
    var options = {
      hAxis: {
        title: 'Episode'
      },
      vAxis: {
        title: 'Duration'
      }
    };
    var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
    chart.draw(data, options);
  }