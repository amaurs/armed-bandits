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
	return "(" + this.tag + ")";
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
	this.initial = initial;
	this.nodes = [];
	this.addNode(initial);
	this.current = initial;
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



FB = new Node('FB');
C1 = new Node('C1');
C2 = new Node('C2');
C3 = new Node('C3');
Pass = new Node('Pass');
Pub = new Node('Pub');
Sleep = new Node('Sleep');


FB.addEdge(new Edge(C1, 0.1));
FB.addEdge(new Edge(FB, 0.9));
C1.addEdge(new Edge(FB, 0.5));
C1.addEdge(new Edge(C2, 0.5));
C2.addEdge(new Edge(Sleep, 0.2));
C2.addEdge(new Edge(C3, 0.8));
C3.addEdge(new Edge(Pass, 0.6));
C3.addEdge(new Edge(Pub, 0.4));
Pub.addEdge(new Edge(C1, 0.2));
Pub.addEdge(new Edge(C2, 0.4));
Pub.addEdge(new Edge(C3, 0.4));
Pass.addEdge(new Edge(Sleep, 1.0));
Sleep.addEdge(new Edge(Sleep, 1.0));

/**
arr = [];
arr[0] = 0;
arr[1] = 0;
arr[2] = 0;

for(var i = 0; i < 100; i++)
{
	index = Pub.getRandomNeighbor();
	arr[index] = arr[index] + 1;
}
	
console.log("*******");
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);
**/

var graph = new Graph(C1);


graph.addNode(FB);
graph.addNode(C1);
graph.addNode(C2);
graph.addNode(C3);
graph.addNode(Pass);
graph.addNode(Pub);
graph.addNode(Sleep);

console.log("Run.");
graph.run(10);

console.log("Run correclty.")


