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
function TemporalDifferenceAgent(graph, alpha, gamma, epsilon, states, actions) 
{
	this.graph = graph;
	this.Q = [];
	this.alpha = alpha;
	this.gamma = gamma;
	this.acum = 0;
	this.actions = actions;
	this.epsilon = epsilon;
	console.log(states);
	for(var state in states)
    {
    	for(var action in actions)
   		{
    		this.Q[states[state] + action] = 0;
    		console.log("key: " + states[state] + action + " = 0");
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
	console.log("The agent is now in " + this.graph.getCurrent());
	myVector = vectorFromString(this.graph.getCurrent().toString());
	return {type: "put", position: myVector};
}

/**
When this agent acts a random direction is selected.
**/
TemporalDifferenceAgent.prototype.actSarsa = function(view) 
{
	console.log("The agent is now in " + this.graph.getCurrent());
	var isTerminal = false;
	if(this.state1 == null || this.action1 == null)
	{
		this.state1 = vectorFromString(this.graph.getCurrent().toString()); 
		this.graph.step();
		this.action1 = this.graph.getCurrent().toString();
		this.graph.step();
		myVector = vectorFromString(this.graph.getCurrent().toString());
		return {type: "put", position: myVector};
	}
	if(Math.random() < this.epsilon)
	{
		console.log("epsilon");
		state2 = vectorFromString(this.graph.getCurrent().toString()); 
		this.graph.step();
		action2 = this.graph.getCurrent().toString();
		this.graph.step();
	}
	else
	{
		
		console.log("greedy");
		state2 = vectorFromString(this.graph.getCurrent().toString()); ;
		var action2 = this.selectNextAction(state2);
		this.graph.moveTo(action2);
		this.graph.step();
	}
	var reward = this.graph.getCurrent().getReward();

	
	this.sarsa(this.state1, this.action1, reward, state2, action2);
	//console.log("Q Value of state " + this.state1.toString() + ": " + this.getValue(this.state2, this.action2));
	isTerminal = this.graph.isTerminal();
	if(isTerminal)
	{
		console.log("The state was terminal");
		this.state1 = null;
		this.action1 = null;
	}
	else
	{
		this.state1 = state2;
		this.action1 = action2;
	}
	

	myVector = vectorFromString(this.graph.getCurrent().toString());
	return {type: "put", position: myVector};
}

TemporalDifferenceAgent.prototype.getValue = function(s, a)
{
	return this.Q[vectorFromString(s.toString()) + a]
}

TemporalDifferenceAgent.prototype.selectNextAction = function(s)
{	
	var max = -10000;
	var res = null;
	
	var newArray = [];

	shuffle(this.actions);

	console.log("actions: " + this.actions);

	for(var direction in this.actions)
    {
    	var key = vectorFromString(s.toString()) + direction;
    	console.log("key: " + key);	
    	if(max <= this.Q[key])
    	{
    		max = this.Q[key];
    		newArray.push(direction);
    		res = direction;
    	}
	}
	console.log("next move: " + res);
	return randomElement(newArray);
}

TemporalDifferenceAgent.prototype.sarsa = function(s,a,reward,s2,a2)
{	
	this.Q[s+a] = this.Q[s+a] + this.alpha * (reward + this.gamma * this.Q[s2+a2] - this.Q[s+a]);
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