var world = new World(plan, {"#": Wall,
                             "o": RandomAgent,
                             "%": Price})

var display; 

function paint(){
    world.turn();
    console.log(display)
    display.innerHTML = world.toHTML();
}

window.onload = function(){
	drawBoard();

	display = document.querySelector('#world');

	setInterval(function (){ paint(); }, 100);
}