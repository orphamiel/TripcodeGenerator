var stopped = true;            

function genButton(){
	if(stopped){
		document.getElementById("gen_button").value = "Stop!";
		startGen();
	}
	else{
		document.getElementById("gen_button").value = "Start!";
		stopGen();
	}
}

function stopGen(){
	stopped = true;
	document.getElementById("elapsed").textContent = "Stopped.";
}

//use promises
function startGen(){
	stopped = false;
	//reset timer
	document.getElementById("elapsed").textContent = "Elapsed time: 0 seconds";
	//reset table - need to add classes to this later
	document.getElementById("results-table").innerHTML = "<tr id='result-header'><th>Text</th><th>Tripcode</th><th>Time taken</th></tr>"
	var wanted = document.getElementById("wanted").value;
	//start timer;
	var startTime = 0;
		var timeInterval = setInterval(function() {
		if (stopped){
			clearInterval(timeInterval);
			return;
		}
		document.getElementById("elapsed").textContent = "Elapsed time: " + startTime++ + " seconds";
	}, 1000);
	//get options
	var caseOptions = selectedRadio("case");
	var matchOptions = selectedRadio("match");
	//start generating
	var genInterval = setInterval(function() {
		if (stopped){
			clearInterval(genInterval);
			return;
		}
		var rand = generateRandom();
		var cipher = makeTrip(rand);
		var cipherCheck = cipher;
		//case matching
		if(caseOptions==="ignore"){
			cipherCheck = cipher.toLowerCase();
			wanted = wanted.toLowerCase();
		}
		//pattern matching
		if(matchOptions==="starts"){
			if(cipherCheck.startsWith(wanted)){
				updateTable(rand, cipher, startTime);
			}
		}
		else if(matchOptions==="contains"){
			if(cipherCheck.indexOf(wanted) !== -1){
				updateTable(rand, cipher, startTime);
			}
		}
		//ends with has a curious effect where there may not be any valid trips
		else{
			if(cipherCheck.endsWith(wanted)){
				updateTable(rand, cipher, startTime);
			}
		}
	}, 0);
}

function updateTable(rand, cipher, startTime){
	var tableNode = document.getElementById("results-table");
	var rowNode = document.createElement("tr");
	var textNode = document.createElement("td");
	textNode.textContent = rand;
	rowNode.appendChild(textNode);
	var cipherNode = document.createElement("td");
	cipherNode.textContent = cipher;
	rowNode.appendChild(cipherNode);
	var timeNode = document.createElement("td");
	timeNode.textContent = startTime;
	rowNode.appendChild(timeNode);
	tableNode.appendChild(rowNode);
}

function generateRandom(){
	var ran = "";
	//46 to 122 ascii including 46 and 122
	var possible = "./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz";
	//length 8
	for (var i = 0; i < 8; i++){
		ran += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return ran;
}

function strtr(fromtext, from, to){
	if(from.length === to.length){
		var i;
		for(i = 0; i < from.length; i++){
			fromtext = fromtext.replace(new RegExp("\\".concat(from.charAt(i)), "g"), to.charAt(i));
		}
		return fromtext;
	}
	else{
		return "Error";
	}
}

function makeTrip(text){
	var salt = text;
	var buffer = "H.";
	salt = salt.concat(buffer);
	salt = salt.substring(1, 3);
	salt = salt.replace(/[^\.-z]/g, ".");
	salt = strtr(salt, ":;<=>?@[\\]^_`", "ABCDEFGabcdef");
	var cipher = descrypt(text, salt);
	cipher = cipher.substring(3, cipher.length)
	return cipher;
}

function selectedRadio(name){
	var cases = document.getElementsByName(name);
	for(var i = 0; i < cases.length; i++){
		if(cases[i].checked){
			return cases[i].value;
		}
	}
}
