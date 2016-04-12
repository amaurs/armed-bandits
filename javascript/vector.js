/**
A vector is used to represent a position inside de grid.
**/
function Vector(x, y) {
  this.x = x;
  this.y = y;
}

/**
Performs a simple arithmetic operation over the vector. It adds two vectors pointwise.
**/
Vector.prototype.plus = function(other) 
{
  return new Vector(this.x + other.x, this.y + other.y);
};