function getVkId() {
	var url = window.location.href;
	var reg = /[0-9]{9}/;
	return reg.exec(url)[0];
}

const decoder = {
    r: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
    vkId: getVkId(),
    getRealLink: function(a) {
        var b = String.fromCharCode;
        if (~a.indexOf("audio_api_unavailable")) {
            var c = a.split("?extra=")[1].split("#"),
                d = "" === c[1] ? "" : this.a(c[1]);
            if (c = this.a(c[0]), "string" != typeof d || !c) return a;
            for (var f, g, h = (d = d ? d.split(b(9)) : [])
                    .length; h--;) {
                if (f = (g = d[h].split(b(11)))
                    .splice(0, 1, c)[0], !this.decodeUrl[f]) return a;
                c = this.decodeUrl[f].apply(null, g)
            }
            if (c && "http" === c.substr(0, 4)) return c
        }
        return a
    },
    a: function(b) {
        if (!b || 1 == b.length % 4) return !1;
        for (var c, d, f = 0, g = 0, h = ""; d = b.charAt(g++);) d = this.r.indexOf(d), ~d && (c = f % 4 ? 64 * c + d : d, f++ % 4) && (h += String.fromCharCode(255 & c >> (6 & -2 * f)));
        return h
    },
    s: function(b, c) {
        var d = b.length,
            f = [];
        if (d) {
            var g = d;
            for (c = Math.abs(c); g--;) f[g] = 0 | (c += c * (g + d) / c) % d
        }
        return f
    },
    decodeUrl: {
        v: function(a) {
            return a.split("")
                .reverse()
                .join("")
        },
        r: function(b, c) {
            b = b.split("");
            for (var d, e = r + r, f = b.length; f--;) d = e.indexOf(b[f]), ~d && (b[f] = e.substr(d - c, 1));
            return b.join("")
        },
        s: function(a, b) {
            var c = a.length;
            if (c) {
                var d = function(a, b) {
                        var c = a.length,
                            d = [];
                        if (c) {
                            var f = c;
                            for (b = Math.abs(b); f--;) b = (c * (f + 1) ^ b + f) % c, d[f] = b
                        }
                        return d
                    }(a, b),
                    e = 0;
                for (a = a.split(""); ++e < c;) a[e] = a.splice(d[c - 1 - e], 1, a[e])[0];
                a = a.join("")
            }
            return a
        },
        x: function(a, b) {
            var c = [];
            return b = b.charCodeAt(0), each(a.split(""), function(a, d) {
                c.push(String.fromCharCode(d.charCodeAt(0) ^ b))
            }), c.join("")
        },
        i: function(a, b) {
            return decoder.decodeUrl.s(a, b ^ decoder.vkId)
        }
    }
};

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
		url = result['status']['url'].replace("/index.m3u8",".mp3").replace(/\/\w{11}\//,'/')
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