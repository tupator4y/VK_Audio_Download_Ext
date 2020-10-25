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
        var a = document.createElement('a');
        a.setAttribute('onclick', 'getAudioFile("' + audioFullId + "_" + secretArr[2] + "_" + secretArr[5] + '", "' + audioData + '")');
        a.title = 'Download';
        a.setAttribute('class', 'vkDownloadButton');
        element[0].insertBefore(a, element[0].firstChild);
    }
}

function download_file(url, name, type) {
	url = decode_url(url);   
	url = url.replace("/index.m3u8",".mp3").replace(/\/\w{11}\//,'/');

	console.log(url);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        download(xhr.response, name + ".mp3", type);
    };
    xhr.send();
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