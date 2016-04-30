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
function TemporalDifferenceAgent(graph) 
{
	this.graph = graph;
};

/**
When this agent acts a random direction is selected.
**/
TemporalDifferenceAgent.prototype.act = function(view) 
{
	this.graph.step();
	this.direction = this.graph.getCurrent();
	this.graph.step();
	console.log("The agent is now in " + this.graph.getCurrent());
	myVector = vectorFromString(this.graph.getCurrent().toString());
	return {type: "put", position: myVector};
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