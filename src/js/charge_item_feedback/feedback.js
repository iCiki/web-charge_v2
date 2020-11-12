import 'weui.js'

import tpl from 'raw!./feedback.html';



export default {
    url: '/feedback',
    className: 'feedabck',
    render: function () {
        // $("#tab_bottom").ui.style.display ="none";
        return tpl;
    },
    bind: function () {

        $("#submit_bt").on('click', function () {
            console.log("submit_bt clicked...");
            var loading = $.weui.loading('loading');
            setTimeout(function () {
                loading.hide();
            }, 3000);
        });
    }
};

