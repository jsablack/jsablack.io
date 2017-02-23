
$(document).ready(function(){


var player = {
	level: 1,
	experience: 0,
	summons: 30,
	summonbosscounter: 0,
	summoninterval: 10000,
	bosslevel: 1,

	totalHealth: 0,
	totalMana: 0,
	totalDodge: 0,
	totalPow: 0,
	totalDamage: 0,
	totalCritical: 0,
	totalHeal: 0,
	totalLifesteal: 0,

	basicattackcooldown:false,
	diseasecooldown:false,
	healcooldown:false,
	manarestorecooldown:false,

	}

var Health = 200*player.level + player.totalHealth;
var Mana = 150*player.level + player.totalMana;
var Dodge = 5*player.level + player.totalDodge;
var Pow = 10*player.level + player.totalPow;
var Damage = 10*player.level + player.totalDamage;
var Critical = 1 + player.totalCritical;
var Heal = 5*player.level + player.totalHeal;
var Lifesteal = player.totalLifesteal;

var currentplayerhealth;
var currentplayermana;
var currentbosshealth;
var currentbosslevel;


var battle=false;
var boss = {
	level: 1,
	health: this.level * 400 + Math.floor(this.level/10 * 4000),
	damage: this.level * 10,
	}

var playerdamage = false;

var mouseX;
var mouseY;
$(document).mousemove(function(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
});



function playerattack(object){
	countplayerstats();
	updatespells();

		var i = 0;

		function resetcooldown(){
			player[object.namefunction+"cooldown"] = false;
			$(object.nameid).removeClass("oncooldown");
		}

function f() {
	if (player[object.namefunction +"cooldown"] === false && currentplayermana >= object.manacost && battle === true){
		player[object.namefunction+"cooldown"]=true;

		useattack();
		if (object.cooldown !== 0){

			setTimeout(resetcooldown,object.cooldown,object.namefunction);
			}
		}

		function useattack(){

			if (object.damage > 0){
				var critroll = Math.floor(Math.random() * (100 - Critical)) + 1;
				var ifcrit = " does ";

					if(critroll < Critical) {
						object.damage = object.damage * 2;
						ifcrit = " CRITS for";
					}
			currentbosshealth = currentbosshealth - object.damage;
			if (object.namefunction != "basicattack") {
				$("rightinfo").prepend("<p>"+ object.nameplayer + ifcrit + ": " + object.damage + " DMG </p>");
			}
			}
		if(object.spellfunction != undefined) {
			object.spellfunction();
		}
		if (object.manacost > 0) {
			currentplayermana = currentplayermana - object.manacost;
		}
		if (object.healthcost > 0) {
			currentplayerhealth = currentplayerhealth - object.healthcost;
		}
		if (object.manarestore > 0) {
			currentplayermana = currentplayermana + object.manarestore;
			if (object.namefunction != "basicattack"){
				$("rightinfo").prepend("<p>You restore: " + object.manarestore + " Mana")
			}
		}

		if (object.healthrestore > 0) {
			currentplayerhealth = currentplayerhealth + object.healthrestore;
				if (object.namefunction != "basicattack"){
					$("#rightinfo").prepend("<p>You restore: " + object.healthrestore + " Health");
				}
			}
		
		i++;
		if(i < object.repeat){setTimeout(useattack, object.delay);}
		}
	}
	if (player[object.namefunction +"cooldown"] === false && currentplayermana >= object.manacost
		&& battle === true) {
			$(object.nameid).addClass("oncooldown");
			setTimeout(f,object.delay);
		}
	}


var spellobject;

function updatespells() {

	spellObject = {

		basicattack: {
			nameplayer: "Attack",
			namefunction: "basicattack",
			nameid: ".-basic",
			damage: Damage,
			manacost: 0,
			healthcost: 0,
			manarestore: Math.floor(Mana/10),
			healthrestore: Math.floor(Lifesteal/4),
			repeat: 0;
			delay: 0,
			cooldown: 1000,
		},

		disease: {
			nameplayer: "Disease",
			namefunction: "disease",
			nameid: "#disease",
			damage: Math.floor(Damage/2 + Pow),
			manacost: boss.level * 15,
			healthcost: 0,
			manarestore: 0,
			repeat: 0,
			delay: 0,
			cooldown: 3000,
		},

		heal: {
			nameplayer: "Heal",
			namefunction: "heal",
			nameid: "#heal",
			damage: 0,
			manacost: boss.level * 4,
			healthcost: 0,
			manarestore: 0,
			healthrestore: Heal*5,
			repeat: 0,
			delay: 0,
			cooldown: 6000,
		},

		manarestore: {
			nameplayer: "Manarestore",
			namefunction: "manarestore",
			nameid: "#manarestore",
			damage: 0,
			manacost: 0,
			healthcost: 0,
			manarestore: Math.floor(Pow/2),
			healthrestore: 0,
			repeat: 0,
			delay: 0,
			cooldown: 8000,
			},

		}

	}

updatespells();

$(".-basic").click(function(){playerattack(spellobject.basicattack);});
$("#manarestore").click(function(){playerattack(spellobject.manarestore);});
$("#heal").click(function(){playerattack(spellobject.heal);});
$("#disease").click(function(){playerattack(spellobject.disease);});

$('body').bind('keypress',function(event){
	if(event.KeyCode === 49){$(".spell1").trigger('click');}
	if(event.KeyCode === 50){$(".spell2").trigger('click');}
	if(event.KeyCode === 51){$(".spell3").trigger('click');}
	if(event.KeyCode === 52){$(".spell4").trigger('click');}

	if(event.charCode === 49){$(".spell1").trigger('click');}
	if(event.charCode === 50){$(".spell2").trigger('click');}
	if(event.charCode === 51){$(".spell3").trigger('click');}
	if(event.charCode === 52){$(".spell4").trigger('click');}
});

var autobasic1;
	$("#autobasic").click(function(){
		function autobasicatk(){
			$(".spell1").trigger('click');
		}
		autobasic1 = setInterval(autobasicatk, 300);
	});

	$("#manualauto").click(function(){
		clearInterval(autobasic1);
	});

function displaystats() {
	$("#health").text(Math.floor(Health));
	$("#mana").text(Math.floor(Mana));
	$("#damage").text(Math.floor(Damage));
	$("#critical").text(Math.floor(Critical));
	$("#dodge").text(Math.floor(Dodge));
	$("#heal").text(Math.floor(Heal));
	$("#pow").text(Math.floor(Pow));
	$("#lifesteal").text(Math.floor(Lifesteal));

	$("#level").text(Math.floor("Level: "+player.level);
}

function countplayerstats() {
	player.totalHealth = 0;
	player.totalMana = 0;
	player.totalDodge = 0;
	player.totalPow = 0;
	player.totalDamage = 0;
	player.totalCritical = 0;
	player.totalHeal = 0;
	player.totalLifesteal = 0;

	Health = 200*player.level + player.totalHealth;
	Mana = 150*player.level + player.totalMana;
	Dodge = 5*player.level + player.totalDodge;
	Pow = 10*player.level + player.totalPow;
	Damage = 10*player.level + player.totalDamage;
	Critical = 1 + player.totalCritical;
	Heal = 5*player.level + player.totalHeal;
	Lifesteal = 15*player.level + player.totalLifesteal;

	if (Dodge<0){Dodge=0;}
	if (Pow<0){Pow=0;}
	if (Damage<0){Damage=0;}
	if (Critical<0){Critical=0;}
	if (Heal<0){Heal=0;}
	if (Lifesteal<0){Lifesteal=0;}
	if (Mana<0){Mana=0;}

	updatespells();
	displaystats();
	
	}

var finishedgenerating = true;

document.oncontextmenu = function(){
	return false;
};

function addsummon(){
	player.summonbosscounter++;

	if (player.summonbosscounter > 5){
		player.summonbosscounter=0;
		player.summons++;
		var fightcount = "Boss Summons: " + player.summons;
		$("#bosssummons").text(fightcount);
		}
	}

function checkexp(){

	if(player.experience > 3 * player.level){
		player.experience=0;
		player.level++;
	}

	fightcount = "Boss Summons: " + player.summons;
	$("#bosssummons").text(fightcount);
	}

function bosslevelkilled(x){

	player.bosslevel = x;

	console.log(player.bosslevel);
	}

function startfight(){
	battle=true;

	$("#leftinfo").prepend("<p>Fight has begun</p>");

	player.basicattackcooldown=false;
	player.diseasecooldown=false;
	player.healcooldown=false;
	player.manarestorecooldown=false;

	$(".oncooldown").removeClass("oncooldown");

	resetplayerstats();
	var randombossname= Math.floor(Math.random()*13)+1;
	var bossname = "boss"+randombossname+" "+" mobsprites bosspic";
	var bosshitroll;

	boss.health = boss.level * 500;
	boss.damage = bosslevel.level*20;

		currentbosshealth = boss.health;
		currentplayerhealth = Health;
		currentplayermana = Mana;

		var bossdamage = boss.damage;
		var bosscritdamage = boss.damage*2;

	$("#boss").html("<img class='"+bossname+ "' ></img>");
	$("#bosshptext").text(currentbosshealth+"/"+currentbosshealth);
	$("#bosshpbar").css("width","100%");

	function updatehealthbar() {
		var barpercent = currentbosshealth / boss.health*100;
		var playerhpbar = currentplayerhealth / Health*100;
		var playermanabar = currentplayermana / Mana*100;

		if (playerhpbar > 100){playerhpbar = 100;}
		if (playermanabar > 100){playermanabar = 100;}

		$("#bosshpbar").animate({width: barpercent+"%"}, "slow");
		$("#bosshptext").text(currentbosshealth + "/"+boss.health);
		$("#playerhpbar").animate({width: playerhpbar+"%"} "slow");
		$("#playermanabar").animate({width: playermanabar+"%"}, "slow");
	}


	function bossattack(){
		bossdamage = boss.damage;
		bosscritdamage = boss.damage*2;
		bosshitroll = Math.floor(Math.random() * (100 - Dodge)) + 1;

		function attackbasicplayer(){
			bosshitroll = Math.floor(Math.random() * (100 - Dodge)) + 1;

			if(bosshitroll > Dodge){
				$("#leftinfo").prepend("<p>Boss Attacks for: " + bossdamage +" DMG"+"</p>");
					currentplayerhealth = currentplayerhealth - bossdamage;}
			if(bosshitroll < Dodge){$("#leftinfo").prepend("<p>Boss Missed.</p>");}
		}

		function critplayer(){
			bosshitroll = Math.floor(Math.random() * (100 - Dodge)) + 1;

			if(bosshitroll > Dodge){
				$("#leftinfo").prepend("<p>Boss CRITS for: " + bosscritdamage +" DMG"+"</p>");
					currentplayerhealth = currentplayerhealth - bosscritdamage;}
				if(bosshitroll < Dodge){$("#leftinfo").prepend("<p>Boss missed the crit.</p>");}
		}

		var bosschoosespell = Math.floor(Math.random()*100);

		if(bosschoosespell < 10){$("#leftinfo").prepend("<p class='danger'> CRITICAL INCOMING</p>"); setTimeout(critplayer,3000);}
			else if (bosschoosespell < 101){attackbasicplayer();}

			updatehealthbar();
	}

	function checkdeath(){

		if(currentbosshealth < 1) {
			currentbosslevel = boss.level;
			battle=false;
			clearInterval(bossattack);
			clearInterval(checkdeath);
			currentbosshealth=boss.health;
			resetplayerstats();
			countplayerstats();
			currentplayerhealth = Health;
			currentplayermana = Mana;
			currentplayerhealth = Health;
			updatehealthbar();
			player.experience++;
			bosslevelkilled(currentbosslevel)
		}

		if(currentplayerhealth < 1) {
			battle=false;
			clearInterval(bossattack);
			clearInterval(checkdeath);
			resetplayerstats();
			countplayerstats();
			currentplayerhealth = Health;
			currentplayermana = Mana;
			currentplayerhealth = Health;
			currentbosshealth=boss.health;
			updatehealthbar();
		}

		if (currentplayermana > Mana){currentplayermana=Mana};
		if (currentplayerhealth > Health){currentplayerhealth=Health};
		if (currentplayermana < 0){currentplayermana=0};

		updatehealthbar();
	}

	var checkdeath=setInterval(checkdeath,1000);
	var bossattack=setInterval(bossattack,3000);
}

$("#summonfaster").click(function(){
	if(player.summoninterval - 10000 > 0){
		player.summoninterval = player.summoninterval - 10000;
		$("#summons").text("1 spawn per: "+Math.floor(player.summoninterval/10000)+"min");
	}
});

$("#summonslower").click(function(){
	player.summoninterval = player.summoninterval + 10000;
	$("#summons").text("1 spawn per: "+Math.floor(player.summoninterval/10000)+"min");
});

$("#minus").click(function(){
	if( boss.level > 1 && battle != true){
		boss.level--;
	$("#bosslevel").text("LVL: "+boss.level);
		}
	})

$("#plus").click(function(){
	if(battle != true){
		boss.level++;
	$("#bosslevel").text("LVL: "+boss.level);
	}
});

$("#fightbutton").click(function(){
	function startfightonclick(){
		if (player.summons < 1 && battle != true){
			$("#leftinfo").prepend("<p>You don't have enough Boss summons</p>");
		}
		if (battle == true){
			$("#leftinfo").prepend("<p>Cannot start battle while in combat</p>");
		}
		if (player.summons > 0 && battle != true) {

			battle = true;
			$("#leftinfo").empty();
			$("#rightinfo").empty();
			$("#leftinfo").prepend("<p>Fight is starting</p>");

		player.summons--;
		setTimeout(startfight, 4000);
		}
	}
	startfightonclick();
});

function autoitems(){
	createitem(player.bosslevel);
}

setInterval(checkexp, 20000);
setInterval(countplayerstats, 300);

window.onload = function() {
	load();
}









