const decoder={r:"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",vkId:0,getRealLink:function(a){var b=String.fromCharCode;if(~a.indexOf("audio_api_unavailable")){var c=a.split("?extra=")[1].split("#"),d=""===c[1]?"":this.a(c[1]);if(c=this.a(c[0]),"string"!=typeof d||!c)return a;for(var f,g,h=(d=d?d.split(b(9)):[]).length;h--;){if(f=(g=d[h].split(b(11))).splice(0,1,c)[0],!this.decodeUrl[f])return a;c=this.decodeUrl[f].apply(null,g)}if(c&&"http"===c.substr(0,4))return c}return a},a:function(b){if(!b||1==b.length%4)return!1;for(var c,d,f=0,g=0,h="";d=b.charAt(g++);)d=this.r.indexOf(d),~d&&(c=f%4?64*c+d:d,f++%4)&&(h+=String.fromCharCode(255&c>>(6&-2*f)));return h},s:function(b,c){var d=b.length,f=[];if(d){var g=d;for(c=Math.abs(c);g--;)f[g]=0|(c+=c*(g+d)/c)%d}return f},decodeUrl:{v:function(a){return a.split("").reverse().join("")},r:function(b,c){b=b.split("");for(var d,e=r+r,f=b.length;f--;)d=e.indexOf(b[f]),~d&&(b[f]=e.substr(d-c,1));return b.join("")},s:function(a,b){var c=a.length;if(c){var d=function(a,b){var c=a.length,d=[];if(c){var f=c;for(b=Math.abs(b);f--;)b=(c*(f+1)^b+f)%c,d[f]=b}return d}(a,b),e=0;for(a=a.split("");++e<c;)a[e]=a.splice(d[c-1-e],1,a[e])[0];a=a.join("")}return a},x:function(a,b){var c=[];return b=b.charCodeAt(0),each(a.split(""),function(a,d){c.push(String.fromCharCode(d.charCodeAt(0)^b))}),c.join("")},i:function(a,b){return decoder.decodeUrl.s(a,b^decoder.vkId)}}};

  
function decode_url(t) {
    let c = {v:(t)=> { return t.split('').reverse().join('')},r: (t, e) => {t = t.split('');for (let i, o = _ + _, a = t.length; a--; ) ~(i = o.indexOf(t[a])) && (t[a] = o.substr(i - e, 1));return t.join('')},
         s: (t,e)=> { let i = t.length;if (i) { let o = function(t, e) {let i = t.length,o = [];if (i) {let a = i;for (e = Math.abs(e); a--; ) e = (i * (a + 1) ^ e + a) % i,o[a] = e }return o}(t, e), a = 0;for (t = t.split(''); ++a < i; ) t[a] = t.splice(o[i - 1 - a], 1, t[a]) [0];t = t.join('')}return t},
         i:(t, e)=> {return c.s(t, e ^ vk.id)},x: (t, e)=> {let i = [];return e = e.charCodeAt(0),each(t.split(''), (t, o) => {i.push(String.fromCharCode(o.charCodeAt(0) ^ e))}),i.join('')}
    },_ = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=',h=(t)=>{ if (!t || t.length % 4 == 1) return !1;for (var e, i, o = 0, a = 0, s = ''; i = t.charAt(a++); ) ~(i = _.indexOf(i)) && (e = o % 4 ? 64 * e + i : i, o++ % 4) && (s += String.fromCharCode(255 & e >> ( - 2 * o & 6)));return s};
    if ((!window.wbopen || !~(window.open + '').indexOf('wbopen')) && ~t.indexOf('audio_api_unavailable')) { 
    let e = t.split('?extra=')[1].split('#'),i=''===e[1]?'':h(e[1]);
    if (e = h(e[0]), 'string' != typeof i || !e) return t;for (var o, a, s = (i = i ? i.split(String.fromCharCode(9))  : []).length; s--; ) {if (o = (a = i[s].split(String.fromCharCode(11))).splice(0, 1, e) [0], !c[o]) return t; e = c[o].apply(null, a)}if (e && 'http' === e.substr(0, 4)) return e}return t
}

function getAudiosArray() {
    var elements = document.getElementsByClassName("audio_row");
    var arr = [];
    var i = 0;
    return Array.prototype.forEach.call(elements, function (el) {
        if (!el.classList.contains('dowloaded')) {
            renderDownloadButton(el.getAttribute('data-audio'));
        }
    });
}

function renderDownloadButton(audioData) {
    var el;
    var audioFullId;
    audioData = JSON.parse(audioData);
    audioFullId = audioData[15]['content_id'];
    var secretArr = audioData[13].split('/');
    el = document.getElementsByClassName('_audio_row_' + audioFullId)[0];
    if (!el.classList.contains('dowloaded')) {
        el.className += ' dowloaded';
        var element = el.getElementsByClassName('audio_row_content');
	element[0].length += 32;
        var a = document.createElement('a');
        a.setAttribute('onclick', 'getAudioFile("' + audioFullId + "_" + secretArr[2] + "_" + secretArr[5] + '", "' + audioData + '")');
        a.title = 'Download';
        a.setAttribute('class', 'vkDownloadButton');
        element[0].insertBefore(a, element[0].firstChild);
    }
}

function download_file(url, name, type) {
	url = decoder.getRealLink(url);   

	fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
	.then(response => response.json().then(function(result){
		url = decode_url(result['status']['url']).replace("/index.m3u8",".mp3").replace(/\/\w{11}\//,'/')
		if(String(url).indexOf("psv4") != -1) {
			console.log("No files for this track are present.")
		}
		else {
	        var xhr = new XMLHttpRequest();
	        xhr.open("GET", url, true);
	        xhr.responseType = "blob";
	        xhr.onload = function () {
	            download(xhr.response, name + ".mp3", type);
	        };
	        xhr.send();
    	}
	}))
}

function getAudioFile(audioID, data) {
    ajax.post('al_audio.php', {
        act: 'reload_audio',
        ids: audioID
    }, {
        onDone: function (data) {
        	data = data[0];
		    var name = data[4] + " - " + data[3];
		    download_file(data[2], name, "audio/mp3");
        }
    });

    return false;

}
