function Node(tag, index)
{
	this.tag = tag;
	this.index = index;
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

Node.prototype.getIndex = function()
{
	return this.index;
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
	//console.log(this.edges.length);
	for(var i = 0 ;  i < this.edges.length; i++)
	{
		//console.log(this.edges[i].toNode.toString());
		//console.log(direction);
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

function State(tag, index, reward, isTerm)
{
	this.reward = reward;
	this.isTerm = isTerm;
	Node.call(this, tag, index);
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

function Action(tag, index)
{
	Node.call(this, tag, index);
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
	//console.log(this.current.toString());
	//console.log(this.current);
	this.current = this.current.getRandomNeighbor();
}

Graph.prototype.moveTo = function(direction)
{
	//console.log(this.current.toString())
	//console.log(direction);
	this.current = this.current.moveTo(direction);
	//console.log(this.current.toString())
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

