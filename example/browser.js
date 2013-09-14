var Observ = require("observ")
var renderObserv = require("./render-observ")
var applyObserv = require("./apply-observ")
var JSONGlobals = require("json-globals/get")

var ObservableArray = require("./observable-array.js")
var template = require("./template")

var state = JSONGlobals("model")
var model = window.model = Object.keys(state).reduce(function (acc, key) {
	var value = state[key]

	acc[key] = Array.isArray(value) ?
		ObservableArray(value) : Observ(value)
	return acc
}, {})
var mainElem = document.getElementById("main")

if (mainElem) {
	console.log("APPLY")
	applyObserv(mainElem.firstChild, template(model))
} else {
	console.log("RENDER")
	var elem = renderObserv(template(model))
	document.body.appendChild(elem)
}