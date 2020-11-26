import Router from 'router';
import 'vconsole';
import attachFastClick from 'fastclick';
import './app.less';
import Home from './home/home';
import Register from './register/register';
import Profile from './profile/profile';
import Setting from './setting/setting';
import Swiper from './swiper/swiper';
import Check from './check/check';
import Uploader from './uploader/uploader';
import List from './list/list';
import entry from './entry/entry';
import login from './login/login';
import tab_charge_my from './tab_charge_my/tab_charge_my';
import feedback from "./charge_item_feedback/feedback";
import map from "./map/map";
import start from "./start/start";

attachFastClick.attach(document.body);

const router = new Router();
router
    .push(Home)
    .push(Register)
    .push(Profile)
    .push(Swiper)
    .push(Setting)
    .push(Check)
    .push(Uploader)
    .push(List)
    .push(entry)
    .push(login)
    .push(tab_charge_my)
    .push(feedback)
    .push(map)
    .push(start)
    .setDefault('/')
    .init();
var vc = new vConsole();

if (NODE_ENV === 'production') {
    /*$.getJSON('https://weui.io/api/sign?url=' + encodeURIComponent(location.href.split('#')[0])).success((res) => {
        wx.config({
            debug: false,
            appId: res.appid,
            timestamp: res.timestamp,
            nonceStr: res.nonceStr,
            signature: res.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone'
            ]
        });

        const option = {
            title: 'Golden Charge',
            desc: '未来已来，及时续航'
            // link: 'https://weui.io/example',
            // imgUrl: 'https://mmrb.github.io/avatar/bear.jpg'
        };
        wx.onMenuShareAppMessage(option);
        wx.onMenuShareTimeline(option);
        wx.onMenuShareQQ(option);
    });*/
}
