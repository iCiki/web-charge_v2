import tpl from 'raw!./login.html';
import * as httputils from '../httputils';
import * as wxs from '../apis/wx_funs'


export default {
    url: '/login',
    className: 'login',
    render: function () {
        document.getElementById("mapcontainer").style.display = "none";
        document.getElementById("info_header").style.display = "none";
        return tpl;
    },
    bind: function () {
        // wxs.scancode();
        $("#sendmsg").on('click', function () {
            var phone = isMobileNumber($("#phone").val());
            if(!phone){
               $.weui.topTips("请输入正确的手机号！");
               return;
            }
            //获取验证码短信接口
            httputils.httpGet(
                '/api/wx/user/verifyCode/',
                $("#phone").val(),
                "",
                function (data) {
                console.log("login.js verifyCode success data = "+JSON.stringify(data));
            },
                function (data) {
                    console.log("login.js verifyCode failed data = "+JSON.stringify(data));
                }, null);
        });

        $("#login_bt").on('click', function () {
            if(!isMobileNumber($("#phone").val())){
                $.weui.topTips("请输入正确手机号！");
                return;
            }
            if(!checkVerifyCode($("#verify_code").val())){
                $.weui.topTips("请输入正确4位验证码！", "forbidden");
                return;
            }
            // $.weui.loading("登录中...");
            // setTimeout(function () {
            //     $.weui.hideLoading();
            // }, 3000);

            var bodyData = {
                "appKey": "jinshi",
                "data": {
                    "code": "",   //TODO ???
                    "mobile": $("#phone").val(),
                    "mobileVerfiCode": $("#verify_code").val(),
                    "wxOpenId": ""
                },
                "version": ""
            };
            //登录操作
            $.weui.loading("登录中。。。");
            httputils.httpPost(
                "/api/wx/user/login",
                "","",
                function (data) {
                    $.weui.hideLoading();
                    $.weui.alert("success"+JSON.stringify(data));
                },
                function (data) {
                    $.weui.hideLoading();
                    $.weui.alert(data.toString());
                },
                bodyData
            );
        });
    }
};

function checkVerifyCode(verifyCode) {
    return verifyCode.length === 4;
}

function isMobileNumber(phone) {
    var flag = false;
    var message = "";
    var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;
    if (phone == '') {
        // console.log("手机号码不能为空");
        message = "手机号码不能为空！";
    } else if (phone.length != 11) {
        //console.log("请输入11位手机号码！");
        message = "请输入11位手机号码！";
    } else if (!myreg.test(phone)) {
        //console.log("请输入有效的手机号码！");
        message = "请输入有效的手机号码！";
    } else {
        flag = true;
    }
    if (message != "") {
        // alert(message);
    }
    return flag;
}

var loading = null;
var second = 60;
function sendmessage(name) {
    console.log("...sendmessage clicked...");
    $(name).attr("disabled", true);
    var color = $(name).css('background-color');
    $(name).attr("style", "background-color : #c1c1c1");
    function update(num) {
        if (num == second) {
            $(name).attr("style", "background-color : "+color);
            $(name).text("获取验证码");
            $(name).attr("disabled", false);
        }
        else {
            var printnr = second - num;
            $(name).text(printnr + "秒后重新获取");
            $(name).attr("disabled", true);
        }
    }
    function uupdate(i) {
        return function () {
            update(i);
        }
    }
    for (var i = 1; i <= second; i++) {
        setTimeout(uupdate(i), i * 1000);
    }
}
