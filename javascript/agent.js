/**
This agent will only move randomly through the world.
**/
function RandomAgent() 
{
    this.direction = randomElement(directionNames);
};

/**
When this agent acts a random direction is selected.
**/
RandomAgent.prototype.act = function(view) 
{
    var thing =  " ,%,/".split(",");
    this.direction = view.findSeveral(thing) || "s";
    return {type: "move", direction: this.direction};
}

/**
This agent will only move randomly through the world.
**/
function TemporalDifferenceAgent(graph, states, actions) 
{
    this.graph = graph;
    this.Q = {};
    this.acum = 0;
    this.actions = actions;
    this.numStates = states.length;
    this.numActions = actions.length;
    for(var state in states)
    {
        for(var action in actions)
           {
            var index = this.getQIndex(states[state].getIndex(), getDirectionIndex(action));
            this.Q[index] = 0;
        }
    }
};

/**
When this agent acts a random direction is selected.
**/
TemporalDifferenceAgent.prototype.act = function(view) 
{
    this.graph.step();
    this.direction = this.graph.getCurrent();
    this.graph.step();
    this.state1 = null;
    this.action1 = null;
    myVector = vectorFromString(this.graph.getCurrent().toString());
    return {type: "put", position: myVector};
}

/**
When this agent acts a random direction is selected.
**/
TemporalDifferenceAgent.prototype.actSarsa = function(view) 
{
    if(this.state1 == null || this.action1 == null)
    {
        //Initialize s
        this.state1 = this.graph.getCurrent();
        //Choose action1 from state1 using policy derived from Q (e-greedy) 
        var nextMove = this.selectNextAction(this.state1.getIndex());
        this.graph.moveTo(nextMove);
        this.action1 = this.graph.getCurrent();
        
    }

    document.getElementById("n").innerHTML = this.Q[this.getQIndex(this.state1.getIndex(), getDirectionIndex("n"))].toFixed(3);
    document.getElementById("e").innerHTML = this.Q[this.getQIndex(this.state1.getIndex(), getDirectionIndex("e"))].toFixed(3);
    document.getElementById("s").innerHTML = this.Q[this.getQIndex(this.state1.getIndex(), getDirectionIndex("s"))].toFixed(3);
    document.getElementById("w").innerHTML = this.Q[this.getQIndex(this.state1.getIndex(), getDirectionIndex("w"))].toFixed(3);

    //Take action1, observe reward and state2
    this.graph.step();
    step = step + 1;
    var reward = this.graph.getCurrent().getReward();
    var state2 = this.graph.getCurrent();
    
    myVector = vectorFromString(this.graph.getCurrent().toString());
    
    //Choose action2 from state2 usign policy derived from Q (e-greedy) 
    if(Math.random() < epsilon)
    {
        this.graph.step();
    }
    else
    {
        var nextMove = this.selectNextAction(state2.getIndex());
        this.graph.moveTo(nextMove);
    }
    var action2 = this.graph.getCurrent();
    this.sarsaLearn(this.state1.getIndex(), this.action1.getIndex(), reward, state2.getIndex(), action2.getIndex());
    if(state2.isTerminal())
    {
        this.state1 = null;
        this.action1 = null;
        this.graph.reset();
        episode = episode + 1;
        var data = [];
        data.push(episode);
        data.push(step);
        historicalData.push(data);
        step = 0;
        google.charts.setOnLoadCallback(drawBasic);

    }
    else
    {
        this.state1 = state2;
        this.action1 = action2;
    }
    return {type: "put", position: myVector};
}

TemporalDifferenceAgent.prototype.getValue = function(s, a)
{
    return this.Q[this.getQIndex(sIndex, aIndex)];
}

TemporalDifferenceAgent.prototype.selectNextAction = function(stateIndex)
{    
    var max = -10000;
    var newArray = [];

    for(var direction in this.actions)
    {
        var index = this.getQIndex(stateIndex, getDirectionIndex(direction));
        if(max <= this.Q[index])
        {
            max = this.Q[index];
            newArray.push(direction);
        }
    }
    var res = randomElement(newArray);
    return res;
}

TemporalDifferenceAgent.prototype.sarsaLearn = function(sIndex1,aIndex1,reward,sIndex2,aIndex2)
{
    this.Q[this.getQIndex(sIndex1,aIndex1)] = this.Q[this.getQIndex(sIndex1,aIndex1)] + alpha * (reward + gamma * this.Q[this.getQIndex(sIndex2,aIndex2)] - this.Q[this.getQIndex(sIndex1,aIndex1)]);
}

TemporalDifferenceAgent.prototype.getQIndex = function(s,a)
{
    return this.numStates * a + s;
}


TemporalDifferenceAgent.prototype.originChar = "o";
/**
Simplest agent of all, a wall object does nothing, just acts as an obstacle.
**/
function Wall() {}

/**
Goal.
**/
function Price() {}

/**
Goal.
**/
function Punishment() {}