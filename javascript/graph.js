function Node(tag)
{
	this.tag = tag;
	this.edges = [];
	this.cumulative = [];
}

Node.prototype.addEdge = function(edge)
{
	this.edges.push(edge);
	this.edges.sort(function(a,b)
		{
			return a.weight - b.weight;
		});
	var sum = 0;
	for(var i = 0 ;  i < this.edges.length; i++)
	{
		sum = sum + this.edges[i].weight;
		this.cumulative[i] = sum;
	}
}

Node.prototype.getNumberOfAdjacent = function()
{
	return this.edges.length;
}

Node.prototype.getRandomNeighbor = function()
{
	var random = Math.random();
	var i = 0;
	while(random > this.cumulative[i])
	{
		i++;
	}
	return this.edges[i].toNode;
}

Node.prototype.moveTo = function(direction)
{
	for(var i = 0 ;  i < this.edges.length; i++)
	{
		if(this.edges[i].toNode.toString() == direction)
		{
			return this.edges[i].toNode;
		}
	}
	return null;
}

Node.prototype.log = function()
{
	for(var i = 0 ;  i < this.edges.length; i++)
	{
		console.log(this.edges[i].toString());
		console.log(this.cumulative[i]);
	}
}

Node.prototype.toString = function()
{
	return this.tag;
}

Node.prototype.isTerminal = function()
{
	return false;
}

Node.prototype.hello = function()
{
	console.log("This is stupid!!!!!!!")
}

function State(tag, reward, isTerm)
{
	this.reward = reward;
	this.isTerm = isTerm;
	Node.call(this, tag);
}
State.prototype = Object.create(Node.prototype);

State.prototype.toString = function()
{
	return this.tag;
}

State.prototype.getReward = function()
{
	return this.reward;
}

State.prototype.isTerminal = function()
{
	return this.isTerm;
}

function Action(tag)
{
	Node.call(this, tag);
}
Action.prototype = Object.create(Node.prototype);


Action.prototype.toString = function()
{
	return this.tag;
}

function Edge(toNode, weight)
{
	this.toNode = toNode;
	this.weight = weight;
}

Edge.prototype.toString = function()
{
	return this.toNode.tag + " -> " + this.weight;
}


function Graph(initial)
{
	this.initial = null;
	this.nodes = [];
	this.addNode(initial);
	this.current = null;
}

Graph.prototype.setInitial = function(initial)
{
	this.initial = initial;
	this.current = initial;
}
Graph.prototype.getCurrent = function(initial)
{
	return this.current;
}

Graph.prototype.isTerminal = function()
{
	return this.current.isTerminal();
}

Graph.prototype.addNode = function(node)
{
	this.nodes.push(node);
}

Graph.prototype.step = function()
{
	this.current = this.current.getRandomNeighbor();
}

Graph.prototype.moveTo = function(direction)
{
	this.current = this.current.moveTo(direction);
}

Graph.prototype.run = function(n)
{
	for(var i = 0; i < n; i++)
	{
		this.step();
		this.log();
	}
}

Graph.prototype.log = function()
{
	console.log(this.current.toString());
}

module.exports.Edge = Edge;
module.exports.State = State;
module.exports.Action = Action;
module.exports.Graph = Graph;
