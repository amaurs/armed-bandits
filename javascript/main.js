var world = new World(plan, {"#": Wall,
                             "o": RandomAgent,
                             "%": Price})

var display; 

function paint(){
    world.turn();
    world.toHTML2();
}

window.onload = function(){
	//drawBoard();

	display = document.querySelector('#world');

	setInterval(function (){ paint(); }, 100);
}