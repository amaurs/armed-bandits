var plan = ["############",
            "#          #",
            "#          #",
            "#          #",
            "#          #",
            "#####  /   #",
            "#          #",
            "#   /     %#",
            "#      #####",
            "#  /       #",
            "#%         #",
            "############"];


var width = plan.length;

var height = plan[0].length;

var alpha = .4;
var gamma = .5;
var epsilon = .2;

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
        reward = 10;
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
