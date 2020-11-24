import 'weui.js';
import tpl from 'raw!./map.html';

export default {
    url: '/map',
    className: 'map',
    render: function () {
        return tpl;
    },
    startRendering() {
        // window.onload = loadScript;
    }

};

function initMap() {
    var map = new TMap.Map("container", {
        pitch: 45,
        zoom: 22,
        center: new TMap.LatLng(39.984104, 116.307503)
    });
}
function loadScript() {
    //创建script标签，并设置src属性添加到body中
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://map.qq.com/api/gljs?v=1.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&callback=initMap";
    document.body.appendChild(script);
}
