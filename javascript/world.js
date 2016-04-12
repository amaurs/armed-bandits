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
        if(dest) 
        {
            critterInDest = this.grid.get(dest);
            if(critterInDest == null)
            {
                this.grid.set(vector , null);
                this.grid.set(dest, critter);
            }
            else
            {
                this.grid.set(vector , null);
                this.grid.set(dest, critter);
                console.log("reward" + charFromElement(critterInDest));
                reward = charFromElement(critterInDest);
                if(reward == "%")
                {
                    this.grid.set(vector , null);
                    this.grid.set(dest, null);
                    this.grid.set(INITIAL, critter);
                }
                if(reward == "/") 
                {

                }
            }
 
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


/**
This function renders the given in a html tbody element.
**/
World.prototype.toHTML2 = function()
{
    var row = "";
    var container = document.getElementById("world");

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    //console.log(container);

    console.log("Everything is ok!");
    
    var gridBackground = document.createElement('div');
    gridBackground.setAttribute("id","grid_bg");
    for(var i = 0; i < this.grid.height; i++)
    {
        var row = document.createElement('div');
        for(var j = 0; j < this.grid.width; j++)
        {
            var element = this.grid.get(new Vector(j,i));
            var column = document.createElement('div');
            var icon = getIcon(charFromElement(element));
            if(icon)
            {
                column.innerHTML = icon;
            }
            row.appendChild(column);
        }
        gridBackground.appendChild(row);
    }

    container.appendChild(gridBackground);
}


World.prototype.toHTML =  function() {
    var output = "";
    //console.log(this.grid);
    for(var y = 0; y < this.grid.height; y++){
        output += "";
        for(var x = 0; x < this.grid.width; x++){
            var element = this.grid.get(new Vector(x,y));
            
            if(charFromElement(element)=="*") 
            {
output += "<span class='grass'>"+charFromElement(element)+"</span>";
            }else
            if(charFromElement(element)=="o") 
            { 
output += "<span class='predator'>"+charFromElement(element)+"</span>";
            }else
            if(charFromElement(element)=="%") 
            { 
output += "<span class='bouncer'>"+charFromElement(element)+"</span>";
            }else
            if(charFromElement(element)=="@") 
            { 
output += "<span class='follower'>"+charFromElement(element)+"</span>";
            }else 
            { 
                output += charFromElement(element);
            }
        }
        output += "<br>";
    }

    return output;
};



