import $ from 'jquery';
import 'weui.js';
import tpl from 'raw!./entry.html';

export default {
    url: '/entry',
    className: 'entry',
    render: function () {
        return tpl;
    },
    bind: function () {
        $('#entryForm').form();
        $('#sendmsg').on('click', function () {
            console.log("sendmsg clicked");
            var second = 60;
            console.log("...sendmessage clicked...");
            $('#sendmsg').attr("disabled", true);
            var color = $(name).css('background-color');
            $('#sendmsg').attr("style", "background-color : #c1c1c1");
            function update(num) {
                if (num == second) {
                    $('#sendmsg').attr("style", "background-color : "+color);
                    $('#sendmsg').text("获取验证码");
                    $('#sendmsg').attr("disabled", false);
                }
                else {
                    var printnr = second - num;
                    $('#sendmsg').text(printnr + "秒后获取");
                    $('#sendmsg').attr("disabled", true);
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
        });
        $(this).on('click', '.js_btn', function () {
            $('#entryForm').validate(function (err) {
                if (!err) {
                    $.weui.loading('数据提交中...');
                    // 提交数据
                    const data = $('#entryForm').serialize();
                    $.post('/api/v1/user', data).success((res) => {
                        console.log(res);
                    }).error((err) => {
                        console.log(err);
                    }).always(() => {
                        setTimeout(() => {
                            $.weui.hideLoading();
                            $.weui.toast('注册成功');
                        }, 800);
                    });
                }
            });
        });
    }
};