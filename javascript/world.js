/**
The world has the control over the grid and the agents. It lets the agents act.
**/
function World(map, legend) 
{
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    map.forEach(function (line, y) 
    {
        for (var x = 0; x < line.length; x++)
        {
            grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
        }
    });
}

/**
Creates a string representation of the current state of the world.
**/
World.prototype.toString =  function() 
{
    var output = "";
    for(var y = 0; y < this.grid.height; y++)
    {
        for(var x = 0; x < this.grid.width; x++)
        {
            var element = this.grid.get(new Vector(x,y));
            output += charFromElement(element);
        }
        output += "\n";
    }
    return output;
};

/**
Step of the game, every agent gets to move.
**/
World.prototype.turn = function() {
    var acted = [];
    this.grid.forEach(function(critter, vector) 
    {
        if (critter.act && acted.indexOf(critter) == -1) 
        {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};

/**
This methos does the actual action for each agent.
**/
World.prototype.letAct = function(critter , vector) 
{
    var action = critter.act(new View(this, vector)); 
    if (action && action.type == "move") 
    {
        var dest = this.checkDestination(action , vector);
        if(dest && this.grid.get(dest) == null) 
        {
            this.grid.set(vector , null);
            this.grid.set(dest, critter); 
        }
    } 
};

/**
Checks if the action to be performed in the given direction is valid.
**/
World.prototype.checkDestination = function(action, vector) 
{
    if (directions.hasOwnProperty(action.direction)) 
    {
        var dest = vector.plus(directions[action.direction]);
        if(this.grid.isInside(dest))
        {
            return dest;
        }
    }
};