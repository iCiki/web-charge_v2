import tpl from 'raw!./home.html';

export default {
    url: '/',
    className: 'home',
    render: function (){
        return tpl;
    }
};

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
