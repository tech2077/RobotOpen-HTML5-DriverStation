/**
 * robotlink.js - robotopen ds websocket link
 */

var wsUri = "ws://10.0.0.22:8000";
var output;  
function init() { 
	output = document.getElementById("output");
	testWebSocket();
}
function testWebSocket() { 
	websocket = new WebSocket(wsUri, "ro1");
	websocket.binaryType = "arraybuffer";
	websocket.onopen = function(evt) { 
		onOpen(evt) 
	}; 
	websocket.onclose = function(evt) { 
		onClose(evt) 
	}; 
	websocket.onmessage = function(evt) { 
		onMessage(evt) 
	}; 
	websocket.onerror = function(evt) { 
		onError(evt) 
	}; 
}  
	
function onOpen(evt) { 
	writeToScreen("CONNECTED"); 
	
	var int = self.setInterval(function(){doSend("h")},100);
}  
function onClose(evt) { 
	writeToScreen("DISCONNECTED"); 
}  
function onMessage(evt) { 
	if (evt.data instanceof ArrayBuffer) {
		var bytearray = new Uint8Array(evt.data);

		var myString = "";

		for (var i = 0; i < bytearray.length; i++) {
			myString += bytearray[i].toString() + "::";
		}

		writeToScreen('<span style="color: blue;">GOT ARRAY BUFFER FRAME ' + myString + '</span>');
	}
	else {
		writeToScreen('<span style="color: blue;">GOT TEXT FRAME: ' + evt.data+'</span>');
	}
	//websocket.close();
}  
function onError(evt) { 
	writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data); 
}  
function doSend(message) { 
	writeToScreen("SENT: " + message); 

	/*
		var bytearray = new Uint8Array(canvaspixellen);

	    for (var i=0;i<canvaspixellen;++i) {
	        bytearray[i] = canvaspixelarray[i];
	    }

    	websocket.send(bytearray.buffer);
	*/

	websocket.send(message); 
}  
function writeToScreen(message) { 
	var pre = document.createElement("p"); 
	pre.style.wordWrap = "break-word"; 
	pre.innerHTML = message; output.appendChild(pre); 
}  

window.addEventListener("load", init, false);