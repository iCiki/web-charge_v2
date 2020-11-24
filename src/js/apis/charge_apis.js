import * as http from '../httputils';

//获取充电收费标准
/**
 * {
	"code": 0,
	"data": [
		{
			"chargePowerType": "",
			"ctime": "",
			"deleteFlag": 0,
			"freeTime": 0,
			"id": 0,
			"pricePreHour": 0,
			"utime": ""
		}
	],
	"msg": ""
}
 */
function getChargeTypeFees() {

    http.httpGet(
        "/api/wx/fee/list",
        "","",
        function (data) {

        }, function (data) {

        },
        ""
    );
}
