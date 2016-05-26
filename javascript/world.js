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
            grid.set(new Vector(x, y), elementFromChar(legend, line[x]));

            var index = grid.getPositionIndex(new Vector(x, y));
            
            var res = stateFromChar(x, y, line[x], index);
            if(res)
            {
                // TODO: change the index into the numeric one.
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
            var initN = new Action("n", getDirectionIndex("n"));
            var initE = new Action("e", getDirectionIndex("e"));
            var initS = new Action("s", getDirectionIndex("s"));
            var initW = new Action("w", getDirectionIndex("w"));
            
            var edgeToInitN = new Edge(initN, .25);
            var edgeToInitE = new Edge(initE, .25);
            var edgeToInitS = new Edge(initS, .25);
            var edgeToInitW = new Edge(initW, .25);
            
            state.addEdge(edgeToInitN);
            state.addEdge(edgeToInitE);
            state.addEdge(edgeToInitS);
            state.addEdge(edgeToInitW);

            transitions["goal -> initN"] = edgeToInitN;
            transitions["goal -> initE"] = edgeToInitE;
            transitions["goal -> initS"] = edgeToInitS;
            transitions["goal -> initW"] = edgeToInitW;

            actions["goal -> initN"] = initN;
            actions["goal -> initE"] = initE;
            actions["goal -> initS"] = initS;
            actions["goal -> initW"] = initW;
            
            edgeFromInitN = new Edge(states["1,1"], 1);
            edgeFromInitE = new Edge(states["1,1"], 1);
            edgeFromInitS = new Edge(states["1,1"], 1);
            edgeFromInitW = new Edge(states["1,1"], 1);

            transitions["initN -> initial"] = edgeFromInitN;
            transitions["initE -> initial"] = edgeFromInitE;
            transitions["initS -> initial"] = edgeFromInitS;
            transitions["initW -> initial"] = edgeFromInitW;
            
            initN.addEdge(edgeFromInitN);  
            initE.addEdge(edgeFromInitE);  
            initS.addEdge(edgeFromInitS);  
            initW.addEdge(edgeFromInitW);                
        }
        else
        {
            for(var direction in directions)
            {
    
    
                var directionVector = fourPointDirections[direction];
                var position = oldPosition.plus(directionVector);

                var currentChr = charFromElement(grid.getSimple(oldPosition));

                currentChr

                if(currentChr == ".")
                {
                    position = position.plus(new Vector( 0, -1));                  
                }
                if(currentChr == "*")
                {
                    position = position.plus(new Vector( 0, -2));                  
                }

                if(grid.isInside(position))
                {
                   var action = new Action(direction, getDirectionIndex(direction));
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


    var allStates = Object.keys(states).map(function(key){return states[key];});
    this.grid.setAgent(new Vector(1,1), new TemporalDifferenceAgent(graph, allStates, directions));
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
    var action = critter.actSarsa(new View(this, vector));
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
    var price = document.getElementById("price");
    price.innerHTML = getIcon("%") + ": " + episode;

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