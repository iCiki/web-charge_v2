


export function scancode() {
        let url = location.href;
        getjssdk(url)
            .then(res => {
                if (res.result == 1 && res.value) {
                    let w = res.value;
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: w.appId, // 必填，公众号的唯一标识
                        timestamp: w.timestamp, // 必填，生成签名的时间戳
                        nonceStr: w.nonceStr, // 必填，生成签名的随机串
                        signature: w.signature, // 必填，签名
                        jsApiList: ["scanQRCode"] // 必填，需要使用的JS接口列表
                    });
                    wx.scanQRCode({
                        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                        scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                        success: function(res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            // alert("扫码识别到的codes："+result);
                            window.location.href = result;
                        }
                    });
                }
            })
            .catch(err => {});
    }
