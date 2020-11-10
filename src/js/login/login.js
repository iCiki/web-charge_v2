// import 'weui';
import FastClick from 'fastclick';
import weui from '../../src/weui';
import tpl from "raw!./login.html";
import $ from "jquery";

FastClick.attach(document.body);

export default {
    url: '/login',
    className: 'login',
    render: function () {
        return tpl;
    },
    bind: function () {

    }
};

// /* dialog */
// document.querySelector('#testToast11').addEventListener('click', function () {
//
//     var loading = weui.loading('loading');
//     setTimeout(function () {
//         loading.hide();
//         // self.location = "main.html";
//         window.location.href='main.html'
//     }, 3000);
// });

// /* send verify code */
// var sendmsg = document.querySelector('#sendmsg');
// sendmsg.addEventListener('click', function () {
//
//     // var loading = weui.loading('loading');
//     // setTimeout(function () {
//     //     loading.hide();
//     // }, 3000);
//     sendmessage('#sendmsg');
// });
// var second = 60;
// function sendmessage(name) {
//     console.log("...sendmessage clicked...");
//     $(name).attr("disabled", true);
//     var color = $(name).css('background-color');
//     $(name).attr("style", "background-color : #c1c1c1");
//     function update(num) {
//         if (num == second) {
//             $(name).attr("style", "background-color : "+color);
//             $(name).text("获取验证码");
//             $(name).attr("disabled", false);
//         }
//         else {
//             var printnr = second - num;
//             $(name).text(printnr + "秒后获取");
//             $(name).attr("disabled", true);
//         }
//     }
//     function uupdate(i) {
//         return function () {
//             update(i);
//         }
//     }
//     for (var i = 1; i <= second; i++) {
//         setTimeout(uupdate(i), i * 1000);
//     }
// }
//
//
//
//
//
//
