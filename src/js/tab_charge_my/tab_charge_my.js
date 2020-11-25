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
        $("#my_my_orders").on('click', function () {
            $.weui.topTips("My orders will be Accessible soon!");
        });
        $("#my_my_wallets").on('click', function () {
            $.weui.topTips("My wallets will be Accessible soon!");
        });
        $("#my_contact_service").on('click', function () {
            $.weui.topTips("Contact service will be Accessible soon!");
        });
        $("#my_personal_settings").on('click', function () {
            $.weui.topTips("Personal settings will be Accessible soon!");
        });
        // $("#").on('click', function () {
        //     $.weui.topTips("It will be Accessible soon!");
        // });
        // $("#").on('click', function () {
        //
        // });
    }
};

// function getQueryString(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if(r != null){
//         return decodeURI(r[2]);
//     }
//     return null;
// }

function onclick(id) {
    switch (id) {
    case "personal_settings":
        window.location.href = "#/feedback";
        break;
    case "contact_service":
        $.weui.topTips("Accessible soon!");
        break;
    default:
        $.weui.topTips("It will be Accessible soon!");
    }
}
