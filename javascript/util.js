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

/**
Helper array to select from the pool of moves.
**/
var eightPointDirectionNames = "n ne e se s sw w nw".split(" ");


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