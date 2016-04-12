/**
The grid is the abstract representation of the World.
**/
function Grid(width, height) 
{
  this.space = new Array(width * height);
  this.width = width;
  this.height = height;
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
Grid.prototype.get = function(vector) 
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