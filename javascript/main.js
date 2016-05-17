
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

	document.getElementById('alpha').value = alpha * 100;
	document.getElementById('gamma').value = gamma * 100;
	document.getElementById('epsilon').value = epsilon * 100;

	display = document.querySelector('#world');

	document.getElementById('alpha').addEventListener("change",function ()
		{ 
			alpha = document.getElementById('alpha').value / 100;
		});
	document.getElementById('gamma').addEventListener("change",function ()
		{ 
			gamma = document.getElementById('gamma').value / 100;
		});
	document.getElementById('epsilon').addEventListener("change",function ()
		{ 
			epsilon = document.getElementById('epsilon').value / 100;
		});

	setInterval(function (){ paint(); }, 100);
}