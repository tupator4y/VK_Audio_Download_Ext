{
	"name": "VK_Audio_Get",
	"version": "1.1",
	"description": "Downloads music from VK.com",
	"permissions": [ "<all_urls>", "*://*/*", "tabs", "activeTab", "management" ],
	"icons": {
		"16": "images/sketched-down-arrow16.png",
		"32": "images/sketched-down-arrow32.png",
		"48": "images/sketched-down-arrow48.png",
		"128": "images/sketched-down-arrow128.png"
	},
	"manifest_version": 2,
	"content_scripts": [
	  {
	  	"css": ["css/button_class.css"],
	    "matches": ["*://vk.com/*", "*://*.vk.com/*", "*://*.vkuseraudio.net/*"],
	    "js": ["jquery-3.5.1.min.js", "download.min.js", "background.js"]
	  }
	],
	"web_accessible_resources": [
    	"/main.js",
    	"/jquery-3.5.1.min.js",
    	"/download.min.js"
  	]
}
