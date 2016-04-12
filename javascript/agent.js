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
    if (view.look(this.direction) != " ")
    {
        this.direction = view.find(" ") || "s";
    }
    return {type: "move", direction: this.direction};
}