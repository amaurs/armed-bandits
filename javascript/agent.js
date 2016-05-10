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
function TemporalDifferenceAgent(graph, alpha, gamma, states, actions) 
{
	this.graph = graph;
	this.Q = [];
	this.alpha = alpha;
	this.gamma = gamma;
	this.acum = 0;
	for(var state in states)
    {
    	for(var action in actions)
   		{
    		this.Q[state + action] = 0;
    		console.log("state: " + state + ", action: " + action + " = 0");
    	}
    }
};

/**
When this agent acts a random direction is selected.
**/
TemporalDifferenceAgent.prototype.act = function(view) 
{
	console.log("The agent has gathered: " + this.acum);
	this.acum += this.graph.getCurrent().getReward();
	this.graph.step();
	this.direction = this.graph.getCurrent();
	this.graph.step();
	//console.log("The agent is now in " + this.graph.getCurrent());
	myVector = vectorFromString(this.graph.getCurrent().toString());
	return {type: "put", position: myVector};
}


TemporalDifferenceAgent.prototype.sarsa = function(s,a,reward,s2,a2)
{	
	this.Q[s][a] = this.Q[s][a] + this.alpha * (reward + this.gamma * this.Q[s2][a2] - this.Q[s][a]);
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