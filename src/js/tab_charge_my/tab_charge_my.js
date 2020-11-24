// import $ from 'jquery';
import 'weui.js';
import tpl from 'raw!./tab_charge_my.html';

export default {
    url: '/tab_charge_my',
    className: 'tab_charge_my',
    render: function () {
        document.getElementById("info_header").style.display = "none";
        document.getElementById("mapcontainer").style.display = "none";
        return tpl;
    },
    bind: function () {

    }
};
