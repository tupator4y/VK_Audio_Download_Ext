var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.src = chrome.runtime.getURL('/jquery-3.5.1.min.js');
document.head.appendChild(script);

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.src = chrome.runtime.getURL('/download.min.js');
document.head.appendChild(script);

var script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.src = chrome.runtime.getURL('/main.js');
document.head.appendChild(script);

document.body.setAttribute("onLoad", " setInterval(function(){ return getAudiosArray();},700);");