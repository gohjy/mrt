const input = document.querySelector("#stncode");
const btn = document.querySelector("#go");

class ValueError extends Error { get name() { return "ValueError"; } };

const lines = {
	standardFormatOrder: [
		"ns", // North-South Line
		"ew", // East-West Line
		"cg", // Changi Airport branch line, will be deprecated when TELe (and CRLe) opens
		"ne", // North-East Line
		"cc", // Circle Line
		"ce", // Circle Line Extension, will be deprecated when CCL6 opens
		"dt", // Downtown Line
  	"de", // Downtown Line 2 Extension, will be supported when DTL2e opens with NS6
		"te", // Thomson-East Coast Line
		"js", // Jurong Region Line (South Branch)
		"jw", // Jurong Region Line (West Branch)
		"je", // Jurong Region Line (East Branch)
		"cr", // Cross Island Line
		"cp"  // Cross Island Line Punggol Extension
	]
};

const stnList = [
	[
		[
			["NS10", "NSL Woodlands Extension"]
		],
		"Admiralty"
	],
	[
		[
			["EW9", "EWL2a1"]
		],
		"Aljunied"
	],
	[
		[
			["NS16", "NSL1-1"],
			["CR11", "CRL1"]
		],
		"Ang Mo Kio"
	],
	[
		[
			["CR2", "CRL1"]
		],
		"Aviation Park"
	],
	[
		[
			["JS7", "JRL1"]
		],
		"Bahar Junction"
	],
	[
		[
			["CC12", "CCL3"]
		],
		"Bartley"
	],
	[
		[
			["CE1", "CCLe", "CC34", "CCL6"],
			["DT14", "DTL1"]
		],
		"Bayfront"
	],
	[
		[
			["TE29", "TEL4"]
		],
		"Bayshore"
	],
	[
		[
			["DT5", "DTL2"]
		],
		"Beauty World"
	],
	[
		[
			["EW5", "EWL2a1"]
		],
		"Bedok"
	],
	[
		[
			["DT29", "DTL3"]
		],
		"Bedok North"
	],
	[
		[
			["DT30", "DTL3"]
		],
		"Bedok Reservoir"
	],
	[
		[
			["TE30", "TEL5"]
		],
		"Bedok South"
	],
	[
		[
			["DT21", "DTL3"]
		],
		"Bencoolen"
	],
	[
		[
			["DT23", "DTL3"]
		],
		"Bendemeer"
	],
	[
		[
			["NS17", "NSL1-1"],
			["CC15", "CCL3"]
		],
		"Bishan"
	],
	[
		[
			["NE9", "NEL"]
		],
		"Boon Keng"
	],
	[
		[
			["EW27", "EWL2b2"],
			["JS8", "JRL1"]
		],
		"Boon Lay"
	],
	[
		[
			["CC19", "CCL4"],
			["DT9", "DTL2"]
		],
		"Botanic Gardens"
	],
	[
		[
			["NS18", "NSL1-1"]
		],
		"Braddell"
	],
	[
		[
			["CC2", "CCL1"]
		],
		"Bras Basah"
	],
	[
		[
			["NS3A", "NSL Brickland Infill Station"]
		],
		"Brickland"
	],
	[
		[
			["TE7", "TEL2"],
			["CR13", "CRL1"]
		],
		"Bright Hill"
	],
	[
		[
			["NE15", "NEL"]
		],
		"Buangkok"
	],
	[
		[
			["EW12", "EWL2a1"],
			["DT14", "DTL1"]
		],
		"Bugis"
	],
	[
		[
			["NS2", "NSL2b2"]
		],
		"Bukit Batok"
	],
	[
		[
			["JE3", "JRL2"]
		],
		"Bukit Batok West"
	],
	[
		[
			["CC18", "CCL Bukit Brown Shell Station"]
		],
		"Bukit Brown"
	],
	[
		[
			["NS3", "NSL2b2"]
		],
		"Bukit Gombak"
	],
	[
		[
			["DT1", "DTL2"],
			["BP6", "BPLRT"]
		],
		"Bukit Panjang"
	],
	[
		[
			["EW21", "EWL1a"],
			["CC22", "CCL4"]
		],
		"Buona Vista"
	],
	[
		[
			["TE9", "TEL2"],
			["CC17", "CCL4"]
		],
		"Caldecott"
	],
	[
		[
			["NS12", "NSL Canberra Infill Station"]
		],
		"Canberra"
	],
	[
		[
			["CC31", "CCL6"]
		],
		"Cantonment"
	],
	[
		[
			["DT2", "DTL2"]
		],
		"Cashew"
	]
];
const stations = [
	/*
 		Format:
	[
 		[
	 		["xx1", "stage3"],
			["yy1", "stage4"]
		],
		"Capitalized Name"
	]
 ...
 	notes:
	one-north station is all lowercase
	hyphens !== spaces
 */

	// East-West Line
	[
		[
			["EW1", "EWL2a2"],
			["CR5", "CRL1"],
			["CP1", "CPe"]
		],
		"Pasir Ris"
	],
	[
		[
			["EW2", "EWL2a2"],
			["DT32", "DTL3"]
		],
		"Tampines"
	],
	[
		[
			["EW3", "EWL2a2"]
		],
		"Simei"
	],
	[
		[
			["EW4", "EWL2a1"],
			["CG", "EWL Changi Airport Extension", "TE35", "TELe"]
		],
		"Tanah Merah"
	],
	[
		[
			["CG1", "EWL Changi Airport Extension", "TE34", "TELe"],
			["DT35", "DTL3"]
		],
		"Expo"
	],
	[
		[
			["CG2", "EWL Changi Airport Extension", "TE33", "TELe"]
		],
		"Changi Airport"
	],
	[
		[
			["EW5", "EWL2a1"]
		],
		"Bedok"
	],
	[
		[
			["EW6", "EWL2a1"]
		],
		"Kembangan"
	],
	[
		[
			["EW7", "EWL2a1"]
		],
		"Eunos"
	],
	[
		[
			["EW8", "EWL2a1"],
			["CC9", "CCL2"]
		],
		"Paya Lebar"
	],
	[
		[
			["EW9", "EWL2a1"]
		],
		"Aljunied"
	],
	[
		[
			["EW10", "EWL2a1"]
		],
		"Kallang"
	],
	[
		[
			["EW11", "EWL2a1"]
		],
		"Lavender"
	],
	[
		[
			["EW12", "EWL2a1"],
			["DT14", "DTL1"]
		],
		"Bugis"
	],

	[
		[
			["NS24", "NSL2a"],
			["NE6", "NEL"],
			["CC1", "CCL1"]
		],
		"Dhoby Ghaut"
	]
	,
	// North-East Line
	[
		[
			["NE1", "NEL"],
			["CC29", "CCL5"]
		],
		"HarbourFront"
	],
	[
		[
			["NE5", "NEL"]
		],
		"Clarke Quay"
	],
	[
		[
			["NE8", "NEL"]
		],
		"Farrer Park"
	],
	[
		[
			["NE9", "NEL"]
		],
		"Boon Keng"
	],
	[
		[
			["NE10", "NEL"]
		],
		"Potong Pasir"
	],
	[
		[
			["NE11", "NEL"]
		],
		"Woodleigh"
	],
	[
		[
			["NE13", "NEL"]
		],
		"Kovan"
	],
	[
		[
			["NE18", "NELe"]
		],
		"Punggol Coast"
	],
	// Circle Line
	[
		[
			["CC2", "CCL1"]
		],
		"Bras Basah"
	],
	[
		[
			["CC3", "CCL1"]
		],
		"Esplanade"
	],
	[
		[
			["CC4", "CCL1"],
			["DT15", "DTL1"]
		],
		"Promenade"
	],
	[
		[
			["CC5", "CCL1"]
		],
		"Nicoll Highway"
	],
	[
		[
			["CC6", "CCL1"]
		],
		"Stadium"
	],
	[
		[
			["CC7", "CCL2"]
		],
		"Mountbatten"
	],
	[
		[
			["CC8", "CCL2"]
		],
		"Dakota"
	],
	[
		[
			["CE1", "CCLe", "CC34", "CCL6"],
			["DT14", "DTL1"]
		],
		"Bayfront"
	],
	
	// Thomson-East Coast Line
	[
		[
			["TE1", "TEL1"],
			["RTS", "RTS Link"]
		],
		"Woodlands North"
	],
	[
		[
			["TE2", "TEL1"],
			["NS9", "NSL Woodlands Extension"]
		],
		"Woodlands"
	],
	[
		[
			["TE3", "TEL1"]
		],
		"Woodlands South"
	],
	[
		[
			["TE4", "TEL2"]
		],
		"Springleaf"
	],
	[
		[
			["TE4A", "TEL Tagore Station"]
		],
		"Tagore"
	],
	[
		[
			["TE5", "TEL2"]
		],
		"Mayflower"
	],
	[
		[
			["TE6", "TEL2"]
		],
		"Springleaf"
	],
	[
		[
			["TE7", "TEL2"],
			["CR13", "CRL1"]
		],
		"Bright Hill"
	],
	[
		[
			["TE8", "TEL2"]
		],
		"Upper Thomson"
	],
	[
		[
			["TE9", "TEL2"],
			["CC17", "CCL4"]
		],
		"Caldecott"
	],
	[
		[
			["TE10", "TEL3"]
		],
		"Mount Pleasant"
	],
	[
		[
			["NS27", "NSL2a"],
			["TE20", "TEL3"],
			["CE2", "CCLe", "CC33", "CCL6"]
		],
		"Marina Bay"
	],
	[
		[
			["TE21", "TEL3"]
		],
		"Marina South"
	],
	[
		[
			["TE22", "TEL3"]
		],
		"Gardens by the Bay"
	],
	[
		[
			["TE22A", "TEL4"]
		],
		"Founders' Memorial"
	],
	[
		[
			["TE23", "TEL4"]
		],
		"Tanjong Rhu"
	],
	[
		[
			["TE24", "TEL4"]
		],
		"Katong Park"
	],
	[
		[
			["TE25", "TEL4"]
		],
		"Tanjong Katong"
	],
	[
		[
			["TE26", "TEL4"]
		],
		"Marine Parade"
	],
	[
		[
			["TE27", "TEL4"]
		],
		"Marine Terrace"
	],
	[
		[
			["TE28", "TEL4"]
		],
		"Siglap"
	],
	[
		[
			["TE29", "TEL4"]
		],
		"Bayshore"
	],
	[
		[
			["TE30", "TEL5"]
		],
		"Bedok South"
	],
	[
		[
			["TE31", "TEL5"],
			["DT37", "DTL3e"]
		],
		"Sungei Bedok"
	],
	[
		[
			["TE32", "TELe"],
			["CR1", "CRLe"]
		],
		"Changi Airport Terminal 5"
	]
];

const stages = {
	// East-West Line
	"EWL1": {open: true, date: "12 Dec 1987", except: {}},
	"EWL1a": {open: true, date: "12 Mar 1988", except: {}},
	"EWL2a1": {open: true, date: "4 Nov 1989", except: {}},
	"EWL2a2": {open: true, date: "16 Dec 1989", except: {}},
	"EWL2b1": {open: true, date: "5 Nov 1988", except: {}},
	"EWL2b2": {open: true, date: "6 Jul 1990", except: {}},
	"EWL Changi Airport Extension": {open: true, date: "10 Jan 2001", except: {
		"CG2": {open: true, date: "8 Feb 2002"}
	}},
	"EWL Dover Infill Station": {open: true, date: "18 Oct 2001", except: {}},
	"EWL Boon Lay Extension": {open: true, date: "28 Feb 2009", except: {}},
	"EWL Tuas West Extension": {open: true, date: "18 Jun 2017", except: {}},

	// North-South Line
	"NSL1-1": {open: true, date: "7 Nov 1987", except: {}},
	"NSL1-2": {open: true, date: "12 Dec 1987", except: {}},
	"NSL2a": {open: true, date: "4 Nov 1989", except: {}},
	"NSL2b1": {open: true, date: "20 Dec 1988", except: {}},
	"NSL2b2": {open: true, date: "10 Mar 1990", except: {}},
	"NSL Woodlands Extension": {open: true, date: "10 Feb 1996", except: {}},
	"NSL Marina South Extension": {open: true, date: "23 Nov 2014", except: {}},
	"NSL Canberra Infill Station": {open: true, date: "2 Nov 2019", except: {}},
	"NSL Brickland Infill Station": {open: false, date: "2034", except: {}},
	"NSL Sungei Kadut Infill Station": {open: false, date: "mid-2030s", except: {}},

	// North-East Line
	"NEL": {open: true, date: "20 Jun 2003", except: {
		"NE11": {open: true, date: "20 Jun 2011", except: {}},
		"NE15": {open: true, date: "15 Jan 2006", except: {}}
	}},
	"NELe": {open: false, date: "2024", except: {}},

	// Circle Line
	"CCL1": {open: true, date: "17 Apr 2010", except: {}},
	"CCL2": {open: true, date: "17 Apr 2010", except: {}},
	"CCL3": {open: true, date: "28 May 2009", except: {}},
	"CCL4": {open: true, date: "8 Oct 2011", except: {}},
	"CCL5": {open: true, date: "8 Oct 2011", except: {}},
	"CCLe": {open: true, date: "14 Jan 2012", except: {}},
	"CCL6": {open: false, date: "2026", except: {}},
	"CCL Bukit Brown Shell Station": {open: false, date: "TBA", except: {}},

	// Downtown Line
	"DTL1": {open: true, date: "22 Dec 2013", except: {}},
	"DTL2": {open: true, date: "27 Dec 2015", except: {}},
	"DTL2e": {open: false, date: "mid-2030s", except: {}},
	"DTL3": {open: true, date: "21 Oct 2017", except: {}},
	"DTL3e": {open: false, date: "2026", except: {}},
	"DTL Hume Station": {open: false, date: "2025", except: {}},

	// Thomson-East Coast Line
	"TEL1": {open: true, date: "31 Jan 2020", except: {}},
	"TEL2": {open: true, date: "28 Aug 2021", except: {}},
	"TEL3": {open: true, date: "13 Nov 2022", except: {
		"TE10": {open: false, date: "TBA", except: {}},
		"TE21": {open: false, date: "TBA", except: {}}
	}},
	"TEL4": {open: true, date: "23 Jun 2024", except: {
		"TE22A": {open: false, date: "2028", except: {}}
	}},
	"TEL5": {open: false, date: "2026", except: {}},
	"TELe": {open: false, date: "by 2040", except: {}},
	"TEL Tagore Station": {open: false, date: "TBA", except: {}},

	// Jurong Region Line
	"JRL1": {open: false, date: "2027", except: {}},
	"JRL2": {open: false, date: "2028", except: {}},
	"JRL3": {open: false, date: "2029", except: {}},
	
	// Cross Island Line
	"CRL1": {open: false, date: "2030", except: {}},
	"CPe": {open: false, date: "2032", except: {}},
	"CRL2": {open: false, date: "2032", except: {}},
	"CRL3": {open: false, date: "TBA", except: {}},
	"CRLe": {open: false, date: "by 2040", except: {}},
	// RTS Link
	"RTS Link": {open: false, date: "2026", except: {}},

	// LRT
	"BPLRT": {open: true, date: "6 Nov 1999", except: {
		"BP14": {open: false, date: "with BPLRT, permanantly closed 13 Jan 2019 as part of BPLRT renewal works", except: {}}
	}},
}

function getStation(stCode) {
	let station = stnList.find(i =>  i[0].some(j => j[0].toLowerCase() === stCode.toLowerCase())) ?? null;
	station = station ?? (stations.find(i =>  i[0].some(j => j[0].toLowerCase() === stCode.toLowerCase())) ?? null); 
	return station;
}

function getStationName(stName) {

	let station = stnList.find(i =>  i[1].toLowerCase() === stName.toLowerCase()) ?? null;
	station = station ?? (stations.find(i =>  i[1].toLowerCase() === stName.toLowerCase()) ?? null);
	return station;
}


function format(input) {
	if (typeof input !== "string") {
		throw new TypeError("Input must be a string");
	}
	input = input.trim().toLowerCase();
	if (["rts", "ptc", "stc"].some(i => i === input)) return input;
	if 		(!lines.standardFormatOrder.includes(input.slice(0, 2))) throw new ValueError("Bad input");
	if (!input.slice(2).match(/^([1-9]\d*[a-z]?)?$/)) throw new ValueError("Bad input");
	return input;
}

function formatname(input) {
	if (typeof input !== "string") {
		throw new TypeError("Input must be a string");
	}
	input = input.trim().toLowerCase();
	return input
}

function toLTG(stnName) {
	return `https://landtransportguru.net/${
		stnName
			.toLowerCase()
			.split(" ")
			.join("-")
	}-station/`;
}