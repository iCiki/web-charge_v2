
export function httpGet(
    apiUrl, //接口url
    urlPath, //接口路径
    urlParams, //请求URL参数
    successCallback, //请求成功回调
    failedCallback   //请求接口失败回调
) {
    $.ajax(
        {
            //  /api/wx/user/verifyCode
            url:'http://dev.wx.goldentime-iot.com'+apiUrl+urlPath+urlParams,
            type:'GET',
            dateType:'json',
            headers:{'Content-Type':'application/json;charset=utf8','Accept-Language':'zh','user-access-token':'111'},
            // data:JSON.stringify(org),
            success:function(data){
                // console.log(JSON.stringify(data)+"");
                console.log(data);
                // sendmessage("#sendmsg");
                successCallback(data);
            },
            error:function(data){
                // console.log("error");
                // console.log(JSON.stringify(data)+"");
                failedCallback(data);
            }
        }
    );
}
