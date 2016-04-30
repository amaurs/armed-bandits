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

function State(tag)
{
	Node.call(this, tag);
}
State.prototype = Object.create(Node.prototype);

State.prototype.toString = function()
{
	return this.tag;
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

Graph.prototype.addNode = function(node)
{
	this.nodes.push(node);
}

Graph.prototype.step = function()
{
	this.current = this.current.getRandomNeighbor();
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
