/* jshint esversion: 6 */

if(typeof global !== "undefined" && typeof require !== "undefined") { // to accomodate difference between node and the browser
	const fs = require('fs');
	const Anime = require('../js/anime').Anime;

	class AnimeManager {
		constructor() {
			this.records = [];
		}
		
		readFile() {
			var xhr = new XMLHttpRequest();
			xhr.onreadystatechange = function () {
				if(xhr.readyState == 4 && xhr.status === 200) {
					this.records = parseArray(xhr.responseText); // Here we call function with parameter "lines*"                   
					document.getElementById("animeList").innerHTML = generateTable(this.records);
				}
			};
			xhr.open("GET", "assets/anime.csv", true);
			xhr.send();
			return;
		}

		/*// Reads records from anime.csv file and store each record as an instance of the anime class
		// Each instance will be stored in the records attribute of the animeManager object
		readFile() {
			let raw_data = fs.readFileSync("assets/anime.csv") + '';
			let raw_records_row = raw_data.split("\n");

			for(let i = 1; i < raw_records_row.length; i++) {
				let rec = raw_records_row[i] + '';
				let comp = rec.split(",");

				if(comp.length > 5) {
					let p = new Anime(comp[0], comp[1], comp[2], comp[3], comp[4], comp[5], comp[6]);
					this.records.push(p);
				} // end if
			} // end for
		} // end readFile

		// Uses the generateTable method and save the code generated to the file "table.html"
		writeHTML() {
			let htmlStr = this.generateTable();
			console.log(htmlStr);
			fs.writeFileSync("table.html", htmlStr);
		}*/
	}

	function parseArray(lines) {
		var raw_records_row = lines.split('\n');
		var records = []; 

		for(let i = 1; i < raw_records_row.length; i++) {
			let rec = raw_records_row[i];
			let comp = CSVtoArray(rec);

			let p = new Anime(comp[0], comp[1], comp[2], comp[3], comp[4], comp[5], comp[6]);
			records.push(p);
		}
		return records;
	}

	// Return array of string values, or NULL if CSV string not well formed.
	function CSVtoArray(text) {
	    var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
	    var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
	    // Return NULL if input string is not well formed CSV string.
	    if (!re_valid.test(text)) return null;
	    var a = [];                     // Initialize array to receive values.
	    text.replace(re_value, // "Walk" the string using replace with callback.
	        function(m0, m1, m2, m3) {
	            // Remove backslash from \' in single quoted values.
	            if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
	            // Remove backslash from \" in double quoted values.
	            else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
	            else if (m3 !== undefined) a.push(m3);
	            return ''; // Return empty string.
	        });
	    // Handle special case of empty last value.
	    if (/,\s*$/.test(text)) a.push('');
	    return a;
	}

	// used the toHTMLRow method of each instance to create the table HTML string
	function generateTable(records) {
		let htmlStr = "<table>";
		htmlStr += "<thead><tr><th>ID</th><th>Name</th>";
		htmlStr += "<th>Genre</th><th>Type</th><th>Episodes</th>";
		htmlStr += "<th>Rating</th><th>Members</th>";
		htmlStr += "</tr></thead></tbody>";

		records.forEach(rec => {
			htmlStr += rec.toHTMLRow();
		});
		htmlStr += "</tbody></table>";
		return htmlStr;
	} // end generateTable

	module.exports = {
		AnimeManager: AnimeManager
	};
}