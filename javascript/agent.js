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
	//console.log(states);

	this.numStates = states.length;
	this.numActions = actions.length;
	for(var state in states)
    {
    	for(var action in actions)
   		{
    		
    		var index = this.getQIndex(states[state].getIndex(), getDirectionIndex(action));
    		this.Q[index] = 0;
    		//console.log("key: " + index + " = 0");
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
	//console.log("The agent is now in " + this.graph.getCurrent());
	myVector = vectorFromString(this.graph.getCurrent().toString());
	return {type: "put", position: myVector};
}

/**
When this agent acts a random direction is selected.
**/
TemporalDifferenceAgent.prototype.actSarsa = function(view) 
{
	//console.log("The agent is now in " + this.graph.getCurrent());
	/*
	var isTerminal = false;
	*/
	console.log(this.Q);
	if(this.state1 == null || this.action1 == null)
	{
		this.state1 = this.graph.getCurrent(); 
		this.graph.step();
		this.action1 = this.graph.getCurrent();
		this.graph.step();
	}

	document.getElementById("n").innerHTML = "n" + this.Q[this.getQIndex(this.state1.getIndex(), getDirectionIndex("n"))];
	document.getElementById("e").innerHTML = "e" + this.Q[this.getQIndex(this.state1.getIndex(), getDirectionIndex("e"))];
	document.getElementById("s").innerHTML = "s" + this.Q[this.getQIndex(this.state1.getIndex(), getDirectionIndex("s"))];
	document.getElementById("w").innerHTML = "w" + this.Q[this.getQIndex(this.state1.getIndex(), getDirectionIndex("w"))];


	var state2 = this.graph.getCurrent();
	//console.log(state2.toString());
	if(Math.random() < epsilon)
	{
		console.log("epsilon");
		this.graph.step();
	}
	else
	{
		console.log("greedy");

		var nextMove = this.selectNextAction(state2.getIndex());

		this.graph.moveTo(nextMove);
	}
	var action2 = this.graph.getCurrent();
	//console.log(action2.toString());
	this.graph.step();
	
	var reward = this.graph.getCurrent().getReward();

	console.log("state 1:" + this.state1.toString());
	console.log("action 1:" + this.action1.toString());
	console.log("reward:" + reward);
	console.log("state 2:" + state2.toString());
	console.log("action 2:" + action2.toString());

	this.sarsa(this.state1.getIndex(), this.action1.getIndex(), reward, state2.getIndex(), action2.getIndex());

	this.state1 = state2;
	this.action1 = action2;

	myVector = vectorFromString(this.graph.getCurrent().toString());
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
    	//console.log(direction);
    	var index = this.getQIndex(stateIndex, getDirectionIndex(direction));
    	//console.log(index);
    	//console.log(this.Q[index]);
    	if(max <= this.Q[index])
    	{
    		//console.log("********************************");
    		//console.log(max);
    		//console.log("********************************");
    		max = this.Q[index];
    		newArray.push(direction);
    	}
	}
	//console.log("The new array: 	" + newArray)
	var res = randomElement(newArray);
	//console.log("Greedy move:" + newArray);
	//console.log("Greedy move:" + res);
	return res;
}

TemporalDifferenceAgent.prototype.sarsa = function(sIndex1,aIndex1,reward,sIndex2,aIndex2)
{	

	this.Q[this.getQIndex(sIndex1,aIndex1)] = this.Q[this.getQIndex(sIndex1,aIndex1)] + alpha * (reward + gamma * this.Q[this.getQIndex(sIndex2,aIndex2)] - this.Q[this.getQIndex(sIndex1,aIndex1)]);
}

TemporalDifferenceAgent.prototype.getQIndex = function(s,a)
{
	//console.log("s:"+s+",a:"+a)
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