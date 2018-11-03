importScripts('descryptlib.js', 'tripgen.min.js');

function work_trip(){
	var wanted = "";
	var cases = "";
	var matches = "";
	self.addEventListener('message', function(e) {
		wanted = e.data['wanted'];
		cases = e.data['case'];
		matches = e.data['match'];
		des_init();
		var t0 = performance.now();
		while(true){
			var t1 = performance.now();
			this.work_gen(wanted, cases, matches, Math.floor((t1-t0)/1000));
		}
	}, false);
}

function work_gen(wanted, caseOptions, matchOptions, time){
	var rand = generateRandom();
	var cipher = makeTrip(rand);
	var cipherCheck = cipher;
	if(caseOptions==="ignore"){
		cipherCheck = cipher.toLowerCase();
		wanted = wanted.toLowerCase();
	}
	//pattern matching
	if(matchOptions==="starts"){
		if(cipherCheck.startsWith(wanted)){
			postMessage({"rand":rand, "cipher":cipher, "startTime":time});
		}
	}
	else if(matchOptions==="contains"){
		if(cipherCheck.indexOf(wanted) !== -1){
			postMessage({"rand":rand, "cipher":cipher, "startTime":time});
		}
	}
	//ends with has a curious effect where there may not be any valid trips
	else{
		if(cipherCheck.endsWith(wanted)){
			postMessage({"rand":rand, "cipher":cipher, "startTime":time});
		}
	}
}

//run this forever
work_trip();
