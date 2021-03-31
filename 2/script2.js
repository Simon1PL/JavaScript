"use strict";

var expect = chai.expect;

describe('cyfry(), litery() and suma() functions', function() {
	beforeEach(function() {
		sumaLiczb = 0;
	});
	it('Returns 6 0 123 for 123', function() {
		expect(showResult("123")).to.equal("   " + 6 + "   " + 0 + "   " + 123 + "\n");
	});
	it('Returns 0 3 0 for abc', function() {
		expect(showResult("abc")).to.equal("   " + 0 + "   " + 3 + "   " + 0 + "\n");
	});
	it('Returns 3 2 0 for ab12', function() {
		expect(showResult("ab12")).to.equal("   " + 3 + "   " + 2 + "   " + 0 + "\n");
	});
	it('Returns 3 2 12 for 12ab', function() {
		expect(showResult("12ab")).to.equal("   " + 3 + "   " + 2 + "   " + 12 + "\n");
	});
	it('Returns 0 0 0 for empty', function() {
		expect(showResult("")).to.equal("   " + 0 + "   " + 0 + "   " + 0 + "\n");
	});
	// dziala przed wyswietleniem wyników... :
	// after(()=>{
	// 	while ((napis = window.prompt(text)) !== null) {
	// 		text += showResult(napis);
	// 	} 
	// });
});

var sumaLiczb = 0;
var napis;
var text = "";
setTimeout(()=>{
	while ((napis = window.prompt(text)) !== null) {
		text += showResult(napis);
	} 
}, 100);

function cyfry(napis) {
	var result = 0;
	for (var i = 0; i < napis.length; i++) {
		if (!isNaN(Number(napis[i]))) {
			result += Number(napis[i]);
		}
	}
	return result;
}

function litery(napis) {
	var result = 0;
	for (var i = 0; i < napis.length; i++) {
		if (/^\p{L}$/gu.test(napis[i])) {
			result += 1;
		}
	}
	return result;
}

function suma(napis) {
	sumaLiczb += parseInt(napis) ? parseInt(napis) : 0;
	return sumaLiczb;
}

function showResult(napis) {
	return "   " + cyfry(napis) + "   " + litery(napis) + "   " + suma(napis) + "\n";
}
