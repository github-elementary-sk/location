var app = {
	// Application Constructor
	initialize : function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents : function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady : function() {
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent : function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};

app.initialize();

var watchID = null;
var accStack = [];
var startTime = null;
var lastTimestamp = null;

function startWatch() {
	var receivedElement = document.getElementById('event_received');
	var watchingElement = document.getElementById('event_watching');
	receivedElement.setAttribute('style', 'display:none;');
	watchingElement.setAttribute('style', 'display:block;');
	document.getElementById("result_pane").innerHTML = "";
	startTime = null;
	var options = {frequency : 100};
	watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
};

function stopWatch() {
	if (watchID) {
		var watchingElement = document.getElementById('event_watching');
		var receivedElement = document.getElementById('event_received');
		watchingElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
		navigator.accelerometer.clearWatch(watchID);
		watchID = null;
	}
};

function onSuccess(acceleration) {
	if (startTime === null) {
		startTime = acceleration.timestamp;
		lastTimestamp = startTime;
	}
	var acc = {
		x : acceleration.x,
		y : acceleration.y,
		z : acceleration.z,
		t : (acceleration.timestamp - startTime)/1000
	};
	if (acceleration.timestamp != lastTimestamp) {
		lastTimestamp = acceleration.timestamp;
		printAccValue(acc);
	}
//	accStack.push(acc);
//	if (accStack.length == 20) {
//		try {
//			var accStackClone = (JSON.parse(JSON.stringify(accStack)));
//			processGainedData(accStackClone);
//			accStack = [];
//			stopWatch();
//		} catch (e) {
//			document.getElementById("result_pane").innerHTML += e + "<br>";
//			stopWatch();
//		}
//	}
};

function onError() {
	alert('onError!');
};

//function processGainedData(accStack) {
//	while (accStack.length > 0) {
//		printAccValue(accStack.pop());
//	}
//};

function printAccValue(acc) {
	try {
		document.getElementById("result_pane").innerHTML += acc.t + " : " + acc.x + " : " + acc.y + " : " + acc.z + "<br>";
	} catch (e) {
		document.getElementById("result_pane").innerHTML += e + "<br>";
	}
};

//function readAccStack() {
//	var xmlhttp = new XMLHttpRequest();
//	xmlhttp.onreadystatechange = function() {
//		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
//	        var accStack = JSON.parse(xmlhttp.responseText);
//		}
//	};
//	xmlhttp.open("GET", "acc_data.txt", true);
//	xmlhttp.send();
//}