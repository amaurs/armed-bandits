
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
	//document.getElementById('speed').value = speed / 10;

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
	/**
	document.getElementById('speed').addEventListener("change",function ()
		{ 
			speed = document.getElementById('speed').value * 10;
			setInterval(function (){ paint(); }, speed);
		});
	**/
	setInterval(function (){ paint(); }, speed);

	google.charts.load('current', {packages: ['corechart', 'line']});
  	google.charts.setOnLoadCallback(drawBasic);

}