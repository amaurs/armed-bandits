graph = require('./javascript/graph.js');


FB = new graph.State('FB');
C1 = new graph.State('C1');
C2 = new graph.State('C2');
C3 = new graph.State('C3');
Pass = new graph.State('Pass');
Pub = new graph.State('Pub');
Sleep = new graph.Action('Sleep');


FB.addEdge(new graph.Edge(C1, 0.3));
FB.addEdge(new graph.Edge(FB, 0.7));
C1.addEdge(new graph.Edge(FB, 0.5));
C1.addEdge(new graph.Edge(C2, 0.5));
C2.addEdge(new graph.Edge(Sleep, 0.2));
C2.addEdge(new graph.Edge(C3, 0.8));
C3.addEdge(new graph.Edge(Pass, 0.6));
C3.addEdge(new graph.Edge(Pub, 0.4));
Pub.addEdge(new graph.Edge(C1, 0.2));
Pub.addEdge(new graph.Edge(C2, 0.4));
Pub.addEdge(new graph.Edge(C3, 0.4));
Pass.addEdge(new graph.Edge(Sleep, 1.0));
Sleep.addEdge(new graph.Edge(Sleep, 1.0));

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

var graph = new graph.Graph(C1);


graph.addNode(FB);
graph.addNode(C1);
graph.addNode(C2);
graph.addNode(C3);
graph.addNode(Pass);
graph.addNode(Pub);
graph.addNode(Sleep);

console.log("Run.");
graph.run(50);

console.log("Run correclty.")


