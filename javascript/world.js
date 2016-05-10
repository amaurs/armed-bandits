/**
The world has the control over the grid and the agents. It lets the agents act.
**/
function World(map, legend) 
{
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    
    this.legend = legend;
    var states = {};
    var actions = {}; 
    var transitions = {};
    map.forEach(function (line, y) 
    {
        for (var x = 0; x < line.length; x++)
        {
            console.log(line[x]);
            grid.set(new Vector(x, y), elementFromChar(legend, line[x]));
            
            var res = stateFromChar(x, y, line[x]);
            if(res)
            {
                states[x + "," + y] = res;
            }
            
        }
    });

    var keys= Object.keys(states);

    for(var index in keys)
    {
        var key = keys[index];
        var state = states[key];
        var oldPosition = vectorFromString(key);
        var oldChar = charFromElement(grid.getSimple(oldPosition));

        if(oldChar == "%")
        {
            var init = new Action("init");
            edgeToInit = new Edge(init, 1);
            
            state.addEdge(edgeToInit)
            transitions["goal -> init"] = edgeToInit;
            actions["goal -> init"] = init;
            edgeFromInit = new Edge(states["1,1"], 1);
            transitions["init -> initial"] = edgeFromInit;
            init.addEdge(edgeFromInit);                
        }
        else
        {
            for(var direction in directions)
            {
    
    
                var directionVector = fourPointDirections[direction];
                var position = oldPosition.plus(directionVector);
    
                console.log(position.toString());
                if(grid.isInside(position))
                {
                   var action = new Action(direction);
                   actions[key + "->" + direction] = action;
                   
                   var edge = new Edge(action, 0.25);
    
                   transitions[state.toString()+ "->" + action.toString()] = edge;
    
                   state.addEdge(edge);
    
    
    
                   var chr = charFromElement(grid.getSimple(position));
    
                   // if the target state is a non valid state then we return
                   // to the current state with probability 1
                   var edgeFromAction;
                   if(chr == "#")
                   {
                        edgeFromAction = new Edge(state, 1);
                        transitions[action.toString()+ "->" + state.toString()] = edgeFromAction;                  
                   }
                   else
                   {
                        var newState = states[position.toString()];
                        edgeFromAction = new Edge(newState, 1);
                        transitions[action.toString()+ "->" + newState.toString()] = edgeFromAction;

                   }
    
    
                   action.addEdge(edgeFromAction);
    
                }
                var newKey = position.toString();

    
            }   
        }

    }
    console.log("States : " + Object.keys(states).length);
    console.log("Actions : " + Object.keys(actions).length);
    console.log("Transitions : " + Object.keys(transitions).length);
    console.log(transitions);


    var graph = new Graph();

    var keys= Object.keys(states);
    for(var index in keys)
    {
        var key = keys[index];
        var state = states[key];

        graph.addNode(state);
    }

    var keys= Object.keys(actions);
    for(var index in keys)
    {
        var key = keys[index];
        var action = actions[key];

        graph.addNode(action);
    }


    graph.setInitial(states["1,1"]);


    this.grid.setAgent(new Vector(1,1), new TemporalDifferenceAgent(graph, .9, .7, Object.keys(states), directions));
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
     console.log(action);
    if (action && action.type == "move") 
    {
        var dest = this.checkDestination(action , vector);
        if(dest) 
        {
            critterInDest = this.grid.get(dest);
            if(critterInDest == null)
            {
		        this.grid.setAgent(dest, critter);
            }
            else
            {
                this.grid.setAgent(dest, critter);
                reward = charFromElement(critterInDest);
                if(reward == "%")
                {
                    this.grid.setAgent(INITIAL, critter);
                    var price = document.getElementById("price");
                    price.innerHTML = price.innerHTML + getIcon("%");
                }
                if(reward == "/") 
                {
                    var punishment = document.getElementById("punishment");
                    punishment.innerHTML = punishment.innerHTML + getIcon("/");
                }
            }
 
        }
    } 

    if (action && action.type == "put") 
    {
        console.log("put atction");
        var dest = action.position;
        if(dest) 
        {
            critterInDest = this.grid.get(dest);
            if(critterInDest == null)
            {
                this.grid.setAgent(dest, critter);
            }
            else
            {
                this.grid.setAgent(dest, critter);
                reward = charFromElement(critterInDest);
                if(reward == "%")
                {
                    this.grid.setAgent(INITIAL, critter);
                    var price = document.getElementById("price");
                    price.innerHTML = price.innerHTML + getIcon("%");
                }
                if(reward == "/") 
                {
                    var punishment = document.getElementById("punishment");
                    punishment.innerHTML = punishment.innerHTML + getIcon("/");
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



