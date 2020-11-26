
export function httpGet(
    apiUrl, //接口url
    urlPath, //接口路径
    urlParams, //请求URL参数
    successCallback, //请求成功回调
    failedCallback,   //请求接口失败回调
    body
) {
    $.ajax(
        {
            //  /api/wx/user/verifyCode
            url:'http://dev.wx.goldentime-iot.com'+apiUrl+urlPath+urlParams,
            type:'GET',
            dateType:'json',
            headers:{'Content-Type':'application/json;charset=utf8','Accept-Language':'zh','user-access-token':'111'},
            data:JSON.stringify(body),
            success:function(data){
                // console.log(JSON.stringify(data)+"");
                console.log(data);
                // sendmessage("#sendmsg");
                if(data.code == 200) {
                    successCallback(data);
                } else if(data.code == 401){
                    //token expired
                } else {
                    failedCallback(data);
                }
            },
            error:function(data){
                // console.log("error");
                // console.log(JSON.stringify(data)+"");
                failedCallback(data);
            }
        }
    );
}

export function httpPost(
    apiUrl, //接口url
    urlPath, //接口路径
    urlParams, //请求URL参数
    successCallback, //请求成功回调
    failedCallback,   //请求接口失败回调
    bodyData
) {

    $.ajax(
        {
        //  /api/wx/user/verifyCode
        url:'http://dev.wx.goldentime-iot.com'+apiUrl+urlPath+urlParams,
        type:'POST',
        dataType:'json',
        headers:{'Content-Type':'application/json;charset=utf8','Accept-Language':'zh','user-access-token':'111'},
        data:JSON.stringify(bodyData),
        success:function(data){
            // console.log(JSON.stringify(data)+"");
            console.log("success httppost response = "+JSON.stringify(data));
            successCallback(data);
        },
        error:function(data){
            // console.log("error");
            console.log("error httppost response = "+JSON.stringify(data));
            failedCallback(data);
        }
    });
}


export function obj2string(o){
    var r=[];
    if(typeof o=="string"){
        return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";
    }
    if(typeof o=="object"){
        if(!o.sort){
            for(var i in o){
                r.push(i+":"+obj2string(o[i]));
            }
            if(!!document.all&&!/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(o.toString)){
                r.push("toString:"+o.toString.toString());
            }
            r="{"+r.join()+"}";
        }else{
            for(var i=0;i<o.length;i++){
                r.push(obj2string(o[i]))
            }
            r="["+r.join()+"]";
        }
        return r;
    }
    return o.toString();
}
