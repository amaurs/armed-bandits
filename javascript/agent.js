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
	console.log(thing);
    this.direction = view.findSeveral(thing) || "s";
    return {type: "move", direction: this.direction};
}

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