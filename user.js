const tlMap = {
	rts: "rts",
	ptc: "pg",
	stc: "sk"
};
const tripleLetters = Object.keys(tlMap);

// TESTING PHASE 1
{
	const stnCodeSearch = function() {
		const output = document.querySelector("#stn_output");
		output.innerHTML = "";
		let codeInput = document.querySelector("#stncode").value;
		let formatted;
		try {
			formatted = format(codeInput);
		} catch(e) {
			if (e.message === "Bad input") {
				output.innerHTML = "<em>Bad input</em>";
				return;
			}
		}
		let station = getStation(formatted);
		if (!station) {
			output.innerHTML = "<em>Station not found</em>";
			return;
		}
		let stationName = station[1];
		let stnCode = document.createElement("div");
		stnCode.className = "stn-code-holder";
		let codes = [];
		for ([i] of station[0]) codes.push(i);
		let newcodes = [];
		for (arr of station[0]) newcodes.push(arr[2] ? arr[2] : arr[0]);
		let futureChange = codes.join() !== newcodes.join();
		for ([i] of station[0]) {
			i = i.toLowerCase();
			let code = document.createElement("div");
			code.className = "stn-code " + ((i === "rts") ? "rts" :  i.slice(0, 2).toLowerCase());
			code.append(
				(i === "rts") ? "RTS" : 
				i.toUpperCase().slice(0, 2) + " " + i.slice(2).toUpperCase()
			);
			stnCode.append(code);
		}
		output.append(stnCode);
		output.append(" ");
		output.append(stationName);
		output.append(document.createElement("br"));
		const partOpen = function([code, stage]) {
			let majorOpen = stages[stage].open;
			let minorOpen = (stages[stage].except[code]?.open) ?? majorOpen;
			if (!majorOpen && !minorOpen) return false;
			if (majorOpen && minorOpen) return true;
			if (minorOpen) return true;
			return false;
		}
		const getOpeningDate = function([code, stage]) {
			let majorDate = stages[stage].date;
			let isMinor = code in stages[stage].except;
			if (isMinor) return stages[stage].except[code].date;
			return majorDate;
		}
		if (station[0].every(partOpen)) {
			let note = document.createElement("em");
			note.append("Operational");
			output.append(note);
		} else if ((station[0].length === 1) && (!partOpen(station[0][0]))) {
			let note = document.createElement("em");
			note.append("Opening ");
			note.append(getOpeningDate([station[0][0][0], station[0][0][1]]));
			output.append(note);
		} else {
			for (let [code, stage] of station[0]) {
				code = code.toLowerCase();
				let stncodeholder = document.createElement("div");
				stncodeholder.className = "stn-code-holder";
				let stncode = document.createElement("div");
				if (tripleLetters.includes(code)) {
					stncode.className = (tlMap[code])
				} else {
					stncode.className = "stn-code " + code.slice(0, 2).toLowerCase();
				}
				stncode.append((tripleLetters.includes(code)) ? code.toUpperCase() : (code.slice(0, 2).toUpperCase()));
				
				if (code !== "rts") { 
					stncode.append(" ");
					stncode.append(code.slice(2).toUpperCase());
				}
				stncodeholder.append(stncode);
				let text = document.createElement("em");
				
				if (partOpen([code, stage])) {
					text.append(" operational");
					} else {
					text.append(" opening ");
					text.append(getOpeningDate([code, stage]));
					text.append(` (${stage})`);
				}
				output.append(stncodeholder);
				output.append(text);
				output.append(document.createElement("br"));
			}
		}
		output.append(document.createElement("br"));
		if (futureChange) {
			let stncodeholder = document.createElement("div");
			stncodeholder.className = "stn-code-holder";
			for (code of newcodes) {
				code = code.toLowerCase();
				let stncode = document.createElement("div");
				stncode.className = (code === "rts") ? "stn-code rts" : ("stn-code " + code.slice(0, 2).toLowerCase());
				stncode.append((code === "rts") ? "RTS" : (code.slice(0, 2).toUpperCase()));
				stncode.append(" ");
				if (code !== "rts") stncode.append(code.slice(2));
				stncodeholder.append(stncode);
			}
			let notetext = document.createElement("em");
			notetext.append("Future ");
			notetext.append(stncodeholder);
			notetext.append(" with ");
			let newerStage = station[0].find(i => i[2])[3];
			notetext.append(newerStage);
			notetext.append(" opening ");
			let newerStageDate = stages[newerStage].date;
			notetext.append(newerStageDate);
			output.append(notetext);
			output.append(document.createElement("br"));
		}
		let link = document.createElement("a");
		link.href = toLTG(stationName);
		link.target = "_blank";
		link.append("Read more on Land Transport Guru");
		output.append(link);
	}

	const btn = document.querySelector("#go1");
	btn.addEventListener("click", (e) => stnCodeSearch);
	const input = document.querySelector("#stncode");
	input.addEventListener("change", function(e) {
		e.currentTarget.blur();
		stnCodeSearch();
	});
}

{
	const stnNameSearch = function() {
		const output = document.querySelector("#stn_output");
		output.innerHTML = "";
		let nameInput = document.querySelector("#stnname").value;
		let formatted = formatname(nameInput);
		let station = getStationName(formatted);
		if (!station) {
			output.innerHTML = "<em>Station not found</em>";
			return;
		}
		let stationName = station[1];
		let stnCode = document.createElement("div");
		stnCode.className = "stn-code-holder";
		let codes = [];
		for ([i] of station[0]) codes.push(i);
		let newcodes = [];
		for (arr of station[0]) newcodes.push(arr[2] ? arr[2] : arr[0]);
		let futureChange = codes.join() !== newcodes.join();
		for ([i] of station[0]) {
			i = i.toLowerCase();
			let code = document.createElement("div");
			code.className = "stn-code " + ((i === "rts") ? "rts" :  i.slice(0, 2).toLowerCase());
			code.append(
				(i === "rts") ? "RTS" : 
				i.toUpperCase().slice(0, 2) + " " + i.slice(2).toUpperCase()
			);
			stnCode.append(code);
		}
		output.append(stnCode);
		output.append(" ");
		output.append(stationName);
		output.append(document.createElement("br"));
		const partOpen = function([code, stage]) {
			let majorOpen = stages[stage].open;
			let minorOpen = (stages[stage].except[code]?.open) ?? majorOpen;
			if (!majorOpen && !minorOpen) return false;
			if (majorOpen && minorOpen) return true;
			if (minorOpen) return true;
			return false;
		}
		const getOpeningDate = function([code, stage]) {
			let majorDate = stages[stage].date;
			let isMinor = code in stages[stage].except;
			if (isMinor) return stages[stage].except[code].date;
			return majorDate;
		}
		if (station[0].every(partOpen)) {
			let note = document.createElement("em");
			note.append("Operational");
			output.append(note);
		} else if ((station[0].length === 1) && (!partOpen(station[0][0]))) {
			let note = document.createElement("em");
			note.append("Opening ");
			note.append(getOpeningDate([station[0][0][0], station[0][0][1]]));
			output.append(note);
		} else {
			for (let [code, stage] of station[0]) {
				code = code.toLowerCase();
				let stncodeholder = document.createElement("div");
				stncodeholder.className = "stn-code-holder";
				let stncode = document.createElement("div");
				stncode.className = (code === "rts") ? "stn-code rts" : ("stn-code " + code.slice(0, 2).toLowerCase());
				stncode.append((code === "rts") ? "RTS" : (code.slice(0, 2).toUpperCase()));

				if (code !== "rts") { 
					stncode.append(" ");
					stncode.append(code.slice(2).toUpperCase());
				}
				stncodeholder.append(stncode);
				let text = document.createElement("em");

				if (partOpen([code, stage])) {
					text.append(" operational");
					} else {
					text.append(" opening ");
					text.append(getOpeningDate([code, stage]));
					text.append(` (${stage})`);
				}
				output.append(stncodeholder);
				output.append(text);
				output.append(document.createElement("br"));
			}
		}
		output.append(document.createElement("br"));
		if (futureChange) {
			let stncodeholder = document.createElement("div");
			stncodeholder.className = "stn-code-holder";
			for (code of newcodes) {
				code = code.toLowerCase();
				let stncode = document.createElement("div");
				stncode.className = (code === "rts") ? "stn-code rts" : ("stn-code " + code.slice(0, 2).toLowerCase());
				stncode.append((code === "rts") ? "RTS" : (code.slice(0, 2).toUpperCase()));
				stncode.append(" ");
				if (code !== "rts") stncode.append(code.slice(2));
				stncodeholder.append(stncode);
			}
			let notetext = document.createElement("em");
			notetext.append("Future ");
			notetext.append(stncodeholder);
			notetext.append(" with ");
			let newerStage = station[0].find(i => i[2])[3];
			notetext.append(newerStage);
			notetext.append(" opening ");
			let newerStageDate = stages[newerStage].date;
			notetext.append(newerStageDate);
			output.append(notetext);
			output.append(document.createElement("br"));
		}
		let link = document.createElement("a");
		link.href = toLTG(stationName);
		link.target = "_blank";
		link.append("Read more on Land Transport Guru");
		output.append(link);
	}

	const btn = document.querySelector("#go2");
	btn.addEventListener("click", (e) => stnNameSearch);
	const input = document.querySelector("#stnname");
	input.addEventListener("change", function(e) {
		e.currentTarget.blur();
		stnNameSearch();
	});
}
