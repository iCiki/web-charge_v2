import tpl from 'raw!./start.html';
import * as http from '../httputils';

export default {
    url: '/start',
    className: 'start',
    render: function (){
        return tpl;
    },
    bind: function () {

    }
};


//获取附近5公里内设备信息
/**
 * {
	"code": 0,
	"data": {
		"current": 0,
		"pages": 0,
		"records": [
			{
				"deviceName": "",
				"deviceNo": "",
				"deviceSn": "",
				"deviceState": 0,
				"latitude": "",
				"longitude": "",
				"portNums": 0,
				"trace": 0
			}
		],
		"searchCount": true,
		"size": 0,
		"total": 0
	},
	"msg": ""
}
 */
function getDevices5MilesNearby() {
    var body = {
        "appKey": "jinshi",
        "data": {
            "deviceState": 0,
            "lat": "",
            "lon": "",
            "page": 0,
            "pageSize": 0
        },
        "version": "v1"
    };
    http.httpGet(
        "/api/wx/ChargingPileDevice/list",
        "","",
        function (data) {

        },
        function (data) {

        },
        body
    );
}
