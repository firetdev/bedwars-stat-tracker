if(parseInt(localStorage.getItem("games")) == null || parseInt(localStorage.getItem("games")) == "null" || isNaN(parseInt(localStorage.getItem("games")))){
	localStorage.setItem("games", 0)
}
var games = [];
for(var i = 0; i < parseInt(localStorage.getItem("games")); i++){
	games.push(JSON.parse(localStorage.getItem(i + 1)));
}
var totalkills = 0;
var totalfinalkills = 0;
var totalwins = 0;
var totalbeds = 0;
var winrate;
for(var e = 0; e < games.length; e++){
	totalkills += parseInt(games[e].kills);
	totalfinalkills += parseInt(games[e].finalkills);
	totalwins += parseInt(games[e].win);
	totalbeds += parseInt(games[e].beds);
}
var winrate = totalwins / parseInt(localStorage.getItem("games"));
winrate = Math.trunc(winrate * Math.pow(10, 2)) / Math.pow(10, 2);
document.getElementById("totalkills").innerText = totalkills;
document.getElementById("totalfinalkills").innerText = totalfinalkills;
document.getElementById("totalwins").innerText = totalwins;
document.getElementById("totalbeds").innerText = totalbeds;
document.getElementById("winrate").innerText = winrate;
function addGame(){
	var game = {
		kills: parseInt(document.getElementById("kills").value),
		finalkills: parseInt(document.getElementById("finalkills").value),
		win: parseInt(document.getElementById("won").value),
		beds: parseInt(document.getElementById("beds").value)
	};
	localStorage.setItem(parseInt(localStorage.getItem("games")) + 1, JSON.stringify(game));
	localStorage.setItem("games", parseInt(localStorage.getItem("games")) + 1);
	window.location = "";
}