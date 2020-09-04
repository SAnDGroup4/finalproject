var request = require('request');
// request({
//     url: 'https://www.google.com.tw/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8',
//     method: "POST",
//     json: true,
//     headers: {
//         "content-type": "text/javascript",
//     },
//     body: 
// }, function(err,httpResponse,body){
// 	console.log(body);
// })
// curl "https://www.google.com.tw/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8" -H "origin: https://www.google.com.tw" -H "accept-encoding: gzip, deflate" -H "accept-language: zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4" -H "user-agent: Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Mobile Safari/537.36" -H "content-type: application/json" -H "accept: */*" -H "referer: https://www.google.com.tw/?gfe_rd=cr&ei=zx-QVfHvHJLs8QXa84CIAQ" -H "authority: www.google.com.tw" -H "cookie: PREF=ID=1111111111111111:U=85aaf7fe2fc56a48:FF=0:LD=zh-TW:TM=1433254149:LM=1434807527:S=liC4m3dcnDQEmQhx; NID=68=DGlQ_m9Jk6dZ4oVOi7C5_zHwZm5NVDe9MlyJEeGm0OSWC86est0QLKwsvCzqN6a2HVbpOkCtMnrTeKdNOV1Io3VM-NvUMIHeASGFXixm-bqILJ_jG0GcseVwxXrWKsAHIOL8Z10FUPlPSUizpiZGKIf0fK_r2CUvaDbCW-jXjQbyhGUyEkqj9CKQjynWjA" -H "x-client-data: CIm2yQEIorbJAQiptskBCMG2yQEI74jKAQjRlMoBCP2VygE=" --data-binary "{""device"":""Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Mobile Safari/537.36 ApiKey/1.711"",""options"":""enable_pre_space"",""requests"":[{""writing_guide"":{""writing_area_width"":1363,""writing_area_height"":800},""ink"":[[[273.43798828125,302.7340087890625,316.406005859375,332.031005859375,367.18701171875,380.8590087890625,414.06201171875,439.4530029296875,457.031005859375,466.7969970703125,482.4219970703125,496.093994140625,503.906005859375,509.7659912109375,515.625,527.343994140625,533.2030029296875,546.875,554.68798828125,560.5469970703125,566.406005859375,570.31298828125,580.0780029296875,585.93798828125,589.843994140625,593.75,595.7030029296875,597.656005859375,597.656005859375,599.6090087890625,601.56298828125,605.468994140625,607.4219970703125,611.3280029296875,621.093994140625,630.8590087890625,634.7659912109375,636.718994140625,636.718994140625,638.6719970703125,640.625,642.5780029296875,644.531005859375,646.4840087890625,648.43701171875,652.343994140625,654.2969970703125,656.25,658.2030029296875,660.156005859375,662.1090087890625,664.06201171875,666.0159912109375,667.968994140625,669.9219970703125,671.875,673.8280029296875,675.781005859375,677.7340087890625,679.68701171875,681.6409912109375,685.5469970703125,691.406005859375,695.31201171875,699.218994140625,701.1719970703125,703.125,705.0780029296875],[437.5,431.6409912109375,427.7340087890625,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,431.6409912109375,431.6409912109375,431.6409912109375],[0,631,647,663,679,691,707,723,739,755,775,791,803,819,835,851,863,875,891,907,923,939,955,971,987,1011,1027,1156,1172,1188,1204,1220,1228,1244,1260,1280,1292,1300,1316,1332,1364,1442,1475,1494,1522,1542,1570,1619,1635,1667,1700,1732,1748,1780,1796,1828,1864,1893,2018,2050,2066,2086,2098,2114,2130,2146,2162,2244]]],""pre_context"":""何〇"",""language"":""zh_TW""}]}" --compressed
// var curl = require('curlrequest');
// var url = "https://www.google.com.tw/inputtools/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8"
// var options = {
// 	url: url,
// 	encoding: 'utf8',
// 	headers: {
// 		 origin: 'https://www.google.com.tw',
// 		 accept: '*/*',
// 		 'accept-encoding': "gzip, deflate",
// 		 "accept-language": "zh-TW,zh;q=0.8,en-US;q=0.6,en;q=0.4",
// 		 "user-agent": "Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Mobile Safari/537.36",
// 		 "content-type": "application/json",
// 		 "referer": "https://www.google.com.tw/?gfe_rd=cr&ei=zx-QVfHvHJLs8QXa84CIAQ",
// 		 "authority": "www.google.com.tw",
// 		 "cookie": "PREF=ID=1111111111111111:U=85aaf7fe2fc56a48:FF=0:LD=zh-TW:TM=1433254149:LM=1434807527:S=liC4m3dcnDQEmQhx; NID=68=DGlQ_m9Jk6dZ4oVOi7C5_zHwZm5NVDe9MlyJEeGm0OSWC86est0QLKwsvCzqN6a2HVbpOkCtMnrTeKdNOV1Io3VM-NvUMIHeASGFXixm-bqILJ_jG0GcseVwxXrWKsAHIOL8Z10FUPlPSUizpiZGKIf0fK_r2CUvaDbCW-jXjQbyhGUyEkqj9CKQjynWjA",
// 		 "x-client-data": "CIm2yQEIorbJAQiptskBCMG2yQEI74jKAQjRlMoBCP2VygE="

// 	},
// 	data:{"device":"Mozilla/5.0 (Linux; Android 4.3; Nexus 10 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2307.2 Mobile Safari/537.36 ApiKey/1.711","options":"enable_pre_space","requests":[{"writing_guide":{"writing_area_width":1363,"writing_area_height":800},"ink":[[[273.43798828125,302.7340087890625,316.406005859375,332.031005859375,367.18701171875,380.8590087890625,414.06201171875,439.4530029296875,457.031005859375,466.7969970703125,482.4219970703125,496.093994140625,503.906005859375,509.7659912109375,515.625,527.343994140625,533.2030029296875,546.875,554.68798828125,560.5469970703125,566.406005859375,570.31298828125,580.0780029296875,585.93798828125,589.843994140625,593.75,595.7030029296875,597.656005859375,597.656005859375,599.6090087890625,601.56298828125,605.468994140625,607.4219970703125,611.3280029296875,621.093994140625,630.8590087890625,634.7659912109375,636.718994140625,636.718994140625,638.6719970703125,640.625,642.5780029296875,644.531005859375,646.4840087890625,648.43701171875,652.343994140625,654.2969970703125,656.25,658.2030029296875,660.156005859375,662.1090087890625,664.06201171875,666.0159912109375,667.968994140625,669.9219970703125,671.875,673.8280029296875,675.781005859375,677.7340087890625,679.68701171875,681.6409912109375,685.5469970703125,691.406005859375,695.31201171875,699.218994140625,701.1719970703125,703.125,705.0780029296875],[437.5,431.6409912109375,427.7340087890625,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,431.6409912109375,431.6409912109375,431.6409912109375],[0,631,647,663,679,691,707,723,739,755,775,791,803,819,835,851,863,875,891,907,923,939,955,971,987,1011,1027,1156,1172,1188,1204,1220,1228,1244,1260,1280,1292,1300,1316,1332,1364,1442,1475,1494,1522,1542,1570,1619,1635,1667,1700,1732,1748,1780,1796,1828,1864,1893,2018,2050,2066,2086,2098,2114,2130,2146,2162,2244]]],"pre_context":"何〇","language":"zh_TW"}]}
// }
// curl.request(options, function(err, res){
// 	console.log(err);
// 	console.log(res);
// })

// request(options, function(a,b,c){
// 	console.log(a);
// 	console.log(c);
// })

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    // var info = JSON.parse(body);
    console.log(body);
  }
}


var options = {
	 "url": "https://www.google.com/inputtools/request?ime=handwriting",
	 "postData": {
	   "device":"Chrome/19.0.1084.46 Safari/536.5",
	   "options":"enable_pre_space",
	   "writing_guide":{
	     "writing_area_width":1920,
	     "writing_area_height":617},
	    "ink":[[[273.43798828125,302.7340087890625,316.406005859375,332.031005859375,367.18701171875,380.8590087890625,414.06201171875,439.4530029296875,457.031005859375,466.7969970703125,482.4219970703125,496.093994140625,503.906005859375,509.7659912109375,515.625,527.343994140625,533.2030029296875,546.875,554.68798828125,560.5469970703125,566.406005859375,570.31298828125,580.0780029296875,585.93798828125,589.843994140625,593.75,595.7030029296875,597.656005859375,597.656005859375,599.6090087890625,601.56298828125,605.468994140625,607.4219970703125,611.3280029296875,621.093994140625,630.8590087890625,634.7659912109375,636.718994140625,636.718994140625,638.6719970703125,640.625,642.5780029296875,644.531005859375,646.4840087890625,648.43701171875,652.343994140625,654.2969970703125,656.25,658.2030029296875,660.156005859375,662.1090087890625,664.06201171875,666.0159912109375,667.968994140625,669.9219970703125,671.875,673.8280029296875,675.781005859375,677.7340087890625,679.68701171875,681.6409912109375,685.5469970703125,691.406005859375,695.31201171875,699.218994140625,701.1719970703125,703.125,705.0780029296875],[437.5,431.6409912109375,427.7340087890625,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,423.8280029296875,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,425.781005859375,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,427.7340087890625,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,429.68701171875,431.6409912109375,431.6409912109375,431.6409912109375],[0,631,647,663,679,691,707,723,739,755,775,791,803,819,835,851,863,875,891,907,923,939,955,971,987,1011,1027,1156,1172,1188,1204,1220,1228,1244,1260,1280,1292,1300,1316,1332,1364,1442,1475,1494,1522,1542,1570,1619,1635,1667,1700,1732,1748,1780,1796,1828,1864,1893,2018,2050,2066,2086,2098,2114,2130,2146,2162,2244]]],
	     "language":"en"} 
}

request.post(options, callback)