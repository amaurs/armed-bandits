/**
The grid is the abstract representation of the World.
**/
function Grid(width, height) 
{
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
  this.agent = null;
  this.agentPosition = null;
}

/**
Checks if the given vector object is inside this grid.
**/
Grid.prototype.isInside = function(vector) 
{
  return vector.x >= 0 && 
         vector.x < this.width &&
         vector.y >= 0 && 
         vector.y < this.height;
};

/**
Returns the value found in the position represented by the given vector.
**/
Grid.prototype.getAgent = function() 
{ 
  return this.agent;
};

/**
Sets the value of the position represented by the given vector to the incoming value.
**/
Grid.prototype.setAgent = function(vector, value) 
{ 
  this.agent = value;
  this.agentPosition = vector;
  console.log("Setting the agent(" + this.agentPosition.x + "," + this.agentPosition.y + ")");
};

/**
Returns the value found in the position represented by the given vector.
**/
Grid.prototype.get = function(vector) 
{
  console.log("(" + this.agentPosition.x + "," + this.agentPosition.y + ")");
  if(vector.x == this.agentPosition.x && vector.y == this.agentPosition.y)
  {	
     console.log("The agent was returned in position (" + this.agentPosition.x + "," + this.agentPosition.y + ")");
     console.log("The agent: " + charFromElement(this.agent));
     return this.agent;
  }
  return this.space[vector.x + this.width * vector.y];
};

/**
Sets the value of the position represented by the given vector to the incoming value.
**/
Grid.prototype.set = function(vector, value) 
{
  this.space[vector.x + this.width * vector.y] = value;
};

/**
Applies the given function using the incoming context.
**/
Grid.prototype.forEach =  function(f, context) {
    for(var y = 0; y < this.height; y++) {
        for(var x = 0; x < this.width; x++) {
            var value = this.get(x, y);
            charFromElement(value);
            if(value != null) {
                f.call(context, value, new Vector(x, y));
            }
        }
    }
};
