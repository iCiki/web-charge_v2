import tpl from 'raw!./home.html';
import * as http from '../httputils';
const config = require('./config.json'),
    accessTokenJson = require('./access_token.json'),
    util = require('util'),
    userInfo = require('./user_info.json');

export default {
    url: '/',
    className: 'home',
    render: function (){
        document.getElementById("mapcontainer").style.display = "block";
        document.getElementById("info_header").style.display = "block";
        webAuthAndGetCode();
        return tpl;
    },
    bind: function () {

        $("#main_avatar").on('click', function () {
            switchToTabMy();
        });
        $("#main_name").on('click', function () {
            switchToTabMy();
        });
        $("#main_icon_service").on('click', function () {
            $.weui.topTips("Service arrive soon!");
        });
        $("#scan_for_charging").on('click', function () {
            window.location.href = "#/tab_charge_my";

        });
    }
};
//跳转到个人中心页面
function switchToTabMy() {
    window.location.href = "#/tab_charge_my";
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null){
        var tmp = decodeURI(r[2]);
        console.log("tmp = "+tmp);
        return tmp;
    }
    return null;
}

//通过异常捕获来获取url重定向过来的参数
function getExceptionArgument(filter, msg){
    var firs = msg.split("?");
    if(firs.length != 2){
        return null;
    }
    console.log("after ? = "+firs[1]);
    // alert(firs[1]);
    var twos = firs[1].split(" ");
    if(twos.length < 2){
        return null;
    }
    var vars = twos[0].split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == filter){
            return pair[1];
        }
    }
    return null;
}

window.onerror = handleError
function handleError(msg,url,l)
{
    console.log("handleError msg = "+msg);
    var code = getExceptionArgument("code", msg);
    var state = getExceptionArgument("state", msg);
    console.log("wx web authorized response code = "+code);
    console.log("wx web authorized response state = "+state);
    if(!code){
        getAccessToken();
    }
    return false;
}

function webAuthAndGetCode() {
    console.log("enter webAuthAndGetCode...")
    $.ajax(
        {
            //微信网页授权并获取code
            url: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf6f697e4f44611f9&redirect_uri=http://dev.wx.goldentime-iot.com/&role_type=1&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect',
            type: 'GET',
            dataType: 'text',
            /*headers: {
                'Content-Type': 'application/json;charset=utf8',
                'Accept-Language': 'zh',
                'user-access-token': '111'
            },*/
            // headers:{'Content-Type':'application/json;charset=utf8','Accept-Language':'zh','user-access-token':'111'},
            // data:JSON.stringify(org),
            success: function (data) {
                console.log("请求网页授权成功");
                console.log(data);
                // successCallback(data);
            },
            error: function (data) {
                console.log("微信网页授权请求失败结果：");
                console.log(data);
            }
        }
    );
}

 function getAccessToken(code){

     if(accessTokenJson.access_token === "" || accessTokenJson.expires_time < currentTime) {
         $.ajax(
             {
                 //微信网页授权并获取code
                 url: ' https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + config.appID + '&secret=' + config.appScrect + '&code=' + code + '&grant_type=authorization_code',
                 type: 'GET',
                 dataType: 'json',
                 /*headers: {
                     'Content-Type': 'application/json;charset=utf8',
                     'Accept-Language': 'zh',
                     'user-access-token': '111'
                 },*/
                 // data:JSON.stringify(org),
                 success: function (data) {
                     var result = JSON.parse(data);
                     console.log("get access token result = "+result);
                     if(data.indexOf("errcode") < 0){
                         accessTokenJson.access_token = result.access_token;
                         accessTokenJson.expires_time = new Date().getTime() + (parseInt(result.expires_in) - 200) * 1000;
                         accessTokenJson.openid = result.openid;
                         accessTokenJson.scope  = result.scope;

                         //更新本地存储的
                         fs.writeFile('./access_token.json',JSON.stringify(accessTokenJson));
                         //将获取后的 access_token 返回
                         resolve(accessTokenJson.access_token);
                         getUserInfo(accessTokenJson.access_token, accessTokenJson.openid);
                     } else {
                         //将错误返回
                         resolve(result);
                         console.log("get access token failed. result = "+result);
                     }
                 },
                 error: function (data) {
                     console.log(JSON.stringify(data) + "");
                 }
             }
         );
     } else {
         return accessTokenJson.access_token;
     }
}

function getUserInfo(
    accessToken,
    openId
) {
    $.ajax(
        {
            //微信网页授权并获取code
            url: 'https://api.weixin.qq.com/sns/userinfo?access_token="+accessToken+"&openid="+openId+"&lang=zh_CN',
            type: 'GET',
            dataType: 'json',
            /*headers: {
                'Content-Type': 'application/json;charset=utf8',
                'Accept-Language': 'zh',
                'user-access-token': '111'
            },*/
            // data:JSON.stringify(org),
            success: function (data) {
                console.log(JSON.stringify(data)+"");
                // successCallback(data);
                userInfo.nickname   = data.nickname;
                userInfo.openid     = data.openid;
                userInfo.city       = data.city;
                userInfo.country    = data.country;
                userInfo.headimgurl = data.headimgurl;
                userInfo.province   = data.province;
                userInfo.sex        = data.sex;
                userInfo.unionid    = data.unionid;
            },
            error: function (data) {
                console.log(JSON.stringify(data)+"");
            }
        }
    );

}


