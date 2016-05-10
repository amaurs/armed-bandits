
var world = new World(plan, {"#": Wall,
                             "o": TemporalDifferenceAgent,
                             "%": Price,
                             "/": Punishment})

var display; 

function paint(){
    world.turn();
    world.toHTML2();
}

window.onload = function(){
	//drawBoard();

	display = document.querySelector('#world');

	setInterval(function (){ paint(); }, 50);
}