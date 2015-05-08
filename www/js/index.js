var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
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

function startWatch(p) {
	var options = { frequency: 2000 };  // Update every 2 seconds
	watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	var watchingElement = p.parentElement.querySelector('.watching');
	p.setAttribute('style', 'display:none;');
	watchingElement.setAttribute('style', 'display:block;');
};

function stopWatch(p) {
    if (watchID) {
        navigator.accelerometer.clearWatch(watchID);
        watchID = null;
        var receivedElement = p.parentElement.querySelector('.received');
        p.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    }
};

function onSuccess(acceleration) {
    var resultPane = document.getElementById('resultPane');
    resultPane.innerHTML = 'Acceleration X: ' + acceleration.x + "&lt;br />";
    resultPane.innerHTML += 'Acceleration Y: ' + acceleration.y + "&lt;br />";
    resultPane.innerHTML += 'Acceleration Z: ' + acceleration.z + "&lt;br />";
    resultPane.innerHTML += 'Timestamp: ' + acceleration.timestamp + "&lt;br />";
};

function onError() {
	alert('onError!');
};
