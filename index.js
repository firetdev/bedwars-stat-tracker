//Setup for new users
if(parseInt(localStorage.getItem("games")) == null || parseInt(localStorage.getItem("games")) == "null" || isNaN(parseInt(localStorage.getItem("games")))){
	localStorage.setItem("games", 0);
	var days = {
		a: 0,
		b: 0,
		c: 0,
		d: 0,
		e: 0,
		f: 0,
		g: 0
	};
	localStorage.setItem("days", JSON.stringify(days));
	var date = new Date();
	var lastUse = {
		d: date.getDate(),
		m: date.getMonth(),
		y: date.getYear()
	};
	localStorage.setItem("lastUse", JSON.stringify(lastUse))
}
//Create array of games
var games = [];
for(var i = 0; i < parseInt(localStorage.getItem("games")); i++){
	games.push(JSON.parse(localStorage.getItem(i + 1)));
}
//Setup data
var totalkills = 0;
var totalfinalkills = 0;
var totalwins = 0;
var totalbeds = 0;
var winrate;
var days = JSON.parse(localStorage.getItem("days"));
var date = new Date();
//Checks if it's a new day
var newUse = {
	d: date.getDate(),
	m: date.getMonth(),
	y: date.getYear()
};
if(newUse.y > JSON.parse(localStorage.getItem("lastUse")).y || newUse.m > JSON.parse(localStorage.getItem("lastUse")).m){
	days.a = days.b;
	days.b = days.c;
	days.c = days.d;
	days.d = days.e;
	days.e = days.f;
	days.f = days.g;
	days.g = 0;
}
if(newUse.d > JSON.parse(localStorage.getItem("lastUse")).d && newUse.m == JSON.parse(localStorage.getItem("lastUse")).m){
	days.a = days.b;
	days.b = days.c;
	days.c = days.d;
	days.d = days.e;
	days.e = days.f;
	days.f = days.g;
	days.g = 0;
}
for(var e = 0; e < games.length; e++){
	totalkills += parseInt(games[e].kills);
	totalfinalkills += parseInt(games[e].finalkills);
	totalwins += parseInt(games[e].win);
	totalbeds += parseInt(games[e].beds);
}
var winrate = totalwins / parseInt(localStorage.getItem("games"));
winrate = Math.trunc(winrate * Math.pow(10, 2)) / Math.pow(10, 2);  //Truncates winrate
//Update UI
document.getElementById("totalkills").innerText = totalkills;
document.getElementById("totalfinalkills").innerText = totalfinalkills;
document.getElementById("totalwins").innerText = totalwins;
document.getElementById("totalbeds").innerText = totalbeds;
document.getElementById("winrate").innerText = winrate;
document.getElementById("score").innerText = days.g;
//Add a new game
function addGame(){
	var game = {
		kills: parseInt(document.getElementById("kills").value),
		finalkills: parseInt(document.getElementById("finalkills").value),
		win: parseInt(document.getElementById("won").value),
		beds: parseInt(document.getElementById("beds").value)
	};
	localStorage.setItem(parseInt(localStorage.getItem("games")) + 1, JSON.stringify(game));
	localStorage.setItem("games", parseInt(localStorage.getItem("games")) + 1);
	//Update score
	days.g += (game.kills + (game.finalkills * 3) + (game.beds * 5) + (game.win * 7));
	localStorage.setItem("days", JSON.stringify(days));
	window.location = "";
}
//Update date
window.addEventListener("beforeunload", function(event){
	var date = new Date();
	var lastUse = {
		d: date.getDate(),
		m: date.getMonth(),
		y: date.getYear()
	};
	localStorage.setItem("lastUse", JSON.stringify(lastUse));
}, false);