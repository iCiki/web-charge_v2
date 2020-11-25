import tpl from 'raw!./home.html';

export default {
    url: '/',
    className: 'home',
    render: function (){
        document.getElementById("mapcontainer").style.display = "block";
        document.getElementById("info_header").style.display = "block";
        getUrlArgument();
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

function getUrlArgument() {
    console.log("getUrlArgument....");
    // var url = location.search; //获取url中"?“符后的字串
    // if (url.indexOf("?") != -1) {
    //     var str = url.substr(1);
    //     var strs = str.split("&");
    //     console.log("str = "+str+", strs = "+strs);
    //     var code = decodeURIComponent(strs[0].replace("code=",""));//获取url中的id
    //     var state= decodeURIComponent(strs[1].replace("state=",""));//获取url中的name
    //     console.log("finally code = "+code+", state = "+state);
    // } else {
    //     console.log("no argument!!!");
    // }
    console.log("code = "+getQueryString("code"));
    console.log("state = "+getQueryString("state"));
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null){
        return decodeURI(r[2]);
    }
    return null;
}

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
    // alert(getQueryString(filter));
}

window.onerror = handleError
function handleError(msg,url,l)
{
    var txt="There was an error on this page.\n\n"
    // txt+="Error: " + msg + "\n"
    txt+="Error: " + msg + "\n"
    txt+="URL: " + url + "\n"
    txt+="Line: " + l + "\n\n"
    txt+="Click OK to continue.\n\n"
    // alert(msg);
    // console.log(""getQueryString("code")
    getExceptionArgument("code", msg);
    return false;
}

// $.ajax(
//     {
//         //微信授权认证
//         url:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf6f697e4f44611f9&redirect_uri=http://dev.wx.goldentime-iot.com/api/wx/login&role_type=1&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect',
//         type:'GET',
//         dateType:'json',
//         headers:{'Content-Type':'application/json;charset=utf8','Accept-Language':'zh','user-access-token':'111'},
//         // data:JSON.stringify(org),
//         success:function(data){
//             // console.log(JSON.stringify(data)+"");
//             console.log(data);
//             // sendmessage("#sendmsg");
//             successCallback(data);
//         },
//         error:function(data){
//             // console.log("error");
//             // console.log(JSON.stringify(data)+"");
//             failedCallback(data);
//         }
//     }
// );
