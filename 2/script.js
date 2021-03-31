var result = window.prompt();
console.log(result + ": " + typeof result);
console.log("prompt: " + "ok -> string, cancel -> null object");

function wypisz() {	
	document.getElementById("result").innerHTML  = "type is always string. " +
	document.forms[0].elements[0].value + ": " +
	typeof document.forms[0].elements[0].value + ", " +
	document.forms[0].elements[1].value + ": " +
	typeof document.forms[0].elements[1].value;
}