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
Checks if the given vector object is inside this grid.
**/
Grid.prototype.isCorner = function(vector) 
{
  return (vector.x == 0 && vector.y == 0) ||
         (vector.x == this.width - 1 && vector.y == this.height - 1) ||
         (vector.x == 0 && vector.y == this.height - 1) ||
         (vector.x == this.width - 1  && vector.y == 0);
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
};

/**
Returns the value found in the position represented by the given vector.
**/
Grid.prototype.get = function(vector) 
{
  if(vector.x == this.agentPosition.x && vector.y == this.agentPosition.y)
  {	
     //console.log("The agent was returned in position (" + this.agentPosition.x + "," + this.agentPosition.y + ")");
     //console.log("The agent: " + charFromElement(this.agent));
     return this.agent;
  }
  return this.space[vector.x + this.width * vector.y];
};


/**
Returns the value found in the position represented by the given vector.
**/
Grid.prototype.getSimple = function(vector) 
{
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
            var value;
            if(x == this.agentPosition.x && y == this.agentPosition.y)
            {
              value = this.agent;
            }
            else
            {
              value = this.space[x + y * this.width];
            }
            if(value != null) {
                f.call(context, value, new Vector(x, y));
            }
        }
    }
};
