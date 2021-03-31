"use strict";

var expect = chai.expect;

let carsSet = new Set();
let cars = [];
sessionStorage.setItem('cars', JSON.stringify([]));

describe('test function', function() {
	beforeEach(function() {
		carsSet = new Set();
		cars = [];
		sessionStorage.setItem('cars', JSON.stringify([]));
	});
	after(function() {
		carsSet = new Set();
		cars = [];
		sessionStorage.setItem('cars', JSON.stringify([]));
	});

	it('Should add to ssession storage ', function() {
		addCar({}, true);
		expect(carsSet.size).to.equal(0);
		expect(cars.length).to.equal(1);
		expect(JSON.parse(sessionStorage.getItem("cars")).length).to.equal(1);
	});
	it('Should add to set ', function() {
		addCar({}, false);
		expect(carsSet.size).to.equal(1);
		expect(cars.length).to.equal(1);
		expect(JSON.parse(sessionStorage.getItem("cars")).length).to.equal(0);
	});
});

function dodaj() {
	let checkbox = document.forms[0].elements[1].checked;
	let carInfo = document.forms[0].elements[0].value;
	let car = {};
		car = carParamsToObject(carInfo);
		addCar(car, checkbox);
}
function addCar(car, addToSession = false) {
	cars.push(car);
	if (addToSession) {
		let oldValue = JSON.parse(sessionStorage.getItem("cars"));
		oldValue.push(car);
		sessionStorage.setItem('cars', JSON.stringify(oldValue));
	}
	else {
		carsSet.add(car);
	}
}

function wypisz() {
	let carInfo = carParamsToObject(document.forms[0].elements[0].value);
	console.log(carInfo);
	let result = "ARRAY: <br />";
	result += addIfContainInfo(cars, carInfo, result);
	result += "SESSION STORAGE: <br />";
	result += addIfContainInfo(JSON.parse(sessionStorage.getItem("cars")), carInfo, result);
	result += "SET: <br />";
	result += addIfContainInfo(carsSet, carInfo, result);
	document.getElementById("result").innerHTML = result;
}

function addIfContainInfo(collection, carInfo) {
	let result = "";
	collection.forEach(car => {
		let add = true;
		for (const [key, value] of Object.entries(carInfo)) {
			if (!car.key===value) {
				add = false;
				break;
			}
		}
		if (add) {
			result += JSON.stringify(car).replaceAll("\"", "").replace("{", "").replace("}", "").replaceAll(",", ", ") + "<br />"
		}
	});
	return result;
}

function carParamsToObject(string) {
	let carParametersJson = string.split(",").map(param => {
		param = param.split("=");
		param = param.map(n => "\"" + n.trim() + "\"");
		param = param.join(":");
		return param;
	}).join(",");
	carParametersJson = "{" + carParametersJson + "}";
	try {
		let car = JSON.parse(carParametersJson);
		return car;
	}
	catch (e) {
		alert("Niepoprawne dane!!\nwynikowy json:\n" + carParametersJson)
	}
}

function fill() {
	document.forms[0].elements[0].value = "nazwa=auto1, marka=volvo, pojemność silnika=2l";
}